import Stripe from "stripe";
import { STRIPE_CONFIG } from "./config";
import { db } from "./db";
import { subscriptions, userFeatures } from "./db/schema";
import { eq } from "drizzle-orm";
import { FEATURE_IDS } from "./config";

const stripe = new Stripe(STRIPE_CONFIG.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function createStripeCustomer(userId: string, email: string) {
  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });

  return customer;
}

export async function createCheckoutSession(customerId: string) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: STRIPE_CONFIG.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
  });

  return session;
}

export async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
  userId: string
) {
  const isActive = subscription.status === "active";
  const currentPeriodEnd = new Date(subscription.current_period_end * 1000);

  // Update subscription in database
  await db
    .insert(subscriptions)
    .values({
      userId,
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: currentPeriodEnd,
      isActive,
    })
    .onConflictDoUpdate({
      target: [subscriptions.userId],
      set: {
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: currentPeriodEnd,
        isActive,
        updatedAt: new Date(),
      },
    });

  // Update user features based on subscription status
  if (isActive) {
    // Enable all pro features
    await Promise.all(
      Object.values(FEATURE_IDS).map((featureId) =>
        db
          .insert(userFeatures)
          .values({
            userId,
            featureId,
            isEnabled: true,
          })
          .onConflictDoUpdate({
            target: [userFeatures.userId, userFeatures.featureId],
            set: {
              isEnabled: true,
              updatedAt: new Date(),
            },
          })
      )
    );
  } else {
    // Disable all pro features
    await Promise.all(
      Object.values(FEATURE_IDS).map((featureId) =>
        db
          .update(userFeatures)
          .set({
            isEnabled: false,
            updatedAt: new Date(),
          })
          .where(
            eq(userFeatures.userId, userId) &&
              eq(userFeatures.featureId, featureId)
          )
      )
    );
  }
}

export async function getActiveSubscription(userId: string) {
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  return subscription;
}

export async function getUserFeatures(userId: string) {
  const features = await db.query.userFeatures.findMany({
    where: eq(userFeatures.userId, userId),
  });

  return features;
}
