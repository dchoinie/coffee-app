import {
  pgTable,
  text,
  timestamp,
  integer,
  numeric,
  varchar,
  boolean,
  uniqueIndex,
  index,
  serial,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  clerkId: varchar("clerk_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const beans = pgTable("beans", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  roaster: text("roaster").notNull(),
  origin: text("origin").notNull(),
  roastDate: timestamp("roast_date").notNull(),
  startingWeight: integer("starting_weight").notNull(),
  currentWeight: integer("current_weight").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const brews = pgTable("brews", {
  id: serial("id").primaryKey().notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  beanId: integer("bean_id")
    .references(() => beans.id)
    .notNull(),
  method: text("method").notNull(),
  date: timestamp("date").notNull(),
  dose: numeric("dose").notNull(),
  yield: numeric("yield").notNull(),
  grindSize: text("grind_size").notNull(),
  brewTime: integer("brew_time").notNull(),
  preinfusionTime: integer("preinfusion_time"),
  bloomTime: integer("bloom_time"),
  leverPressure: numeric("lever_pressure"),
  temperature: numeric("temperature"),
  notes: text("notes"),
  rating: integer("rating"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey().notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  stripeCustomerId: varchar("stripe_customer_id").notNull(),
  stripeSubscriptionId: varchar("stripe_subscription_id").notNull(),
  stripePriceId: varchar("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userFeatures = pgTable(
  "user_features",
  {
    id: serial("id").primaryKey().notNull(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    featureId: varchar("feature_id").notNull(),
    isEnabled: boolean("is_enabled").default(false).notNull(),
    featureType: varchar("feature_type", { enum: ["core", "pro"] }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userFeatureUnique: uniqueIndex("user_feature_unique").on(
      table.userId,
      table.featureId
    ),
    userIdIdx: index("user_features_user_id_idx").on(table.userId),
  })
);
