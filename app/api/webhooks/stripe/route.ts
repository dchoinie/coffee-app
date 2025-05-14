import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { STRIPE_CONFIG } from "@/lib/config";
import { handleSubscriptionChange } from "@/lib/stripe";

const stripe = new Stripe(STRIPE_CONFIG.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_CONFIG.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata.userId;

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await handleSubscriptionChange(subscription, userId);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}
