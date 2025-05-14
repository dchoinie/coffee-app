export const STRIPE_CONFIG = {
  // You'll need to add these to your .env file
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
  STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID!, // Your Pro plan price ID
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY!,
} as const;

export const FEATURES = {
  FREE: {
    // Core Features
    UNLIMITED_BEANS: true,
    UNLIMITED_BREWS: true,
    MANUAL_LOGGING: true,
    BASIC_DASHBOARD: true,
    PUBLIC_RECIPES: true,

    // Limitations
    HISTORY_LIMIT_DAYS: 30,

    // Pro Features (disabled)
    VISUAL_ANALYTICS: false,
    DEVICE_INTEGRATIONS: false,
    BEAN_AGE_TRACKING: false,
    DIAL_IN_TIMELINE: false,
    EXPORT_LOGS: false,
    PRIVATE_RECIPES: false,
    BREW_GROUPS: false,
    EARLY_ACCESS: false,
    WHITE_LABEL: false,
  },
  PRO: {
    // Core Features
    UNLIMITED_BEANS: true,
    UNLIMITED_BREWS: true,
    MANUAL_LOGGING: true,
    BASIC_DASHBOARD: true,
    PUBLIC_RECIPES: true,

    // Limitations
    HISTORY_LIMIT_DAYS: Infinity,

    // Pro Features
    VISUAL_ANALYTICS: true,
    DEVICE_INTEGRATIONS: true,
    BEAN_AGE_TRACKING: true,
    DIAL_IN_TIMELINE: true,
    EXPORT_LOGS: true,
    PRIVATE_RECIPES: true,
    BREW_GROUPS: true,
    EARLY_ACCESS: true,
    WHITE_LABEL: true,
  },
} as const;

export const FEATURE_IDS = {
  // Core Features
  UNLIMITED_BEANS: { id: "unlimited_beans", type: "core" },
  UNLIMITED_BREWS: { id: "unlimited_brews", type: "core" },
  MANUAL_LOGGING: { id: "manual_logging", type: "core" },
  BASIC_DASHBOARD: { id: "basic_dashboard", type: "core" },
  PUBLIC_RECIPES: { id: "public_recipes", type: "core" },

  // Pro Features
  VISUAL_ANALYTICS: { id: "visual_analytics", type: "pro" },
  DEVICE_INTEGRATIONS: { id: "device_integrations", type: "pro" },
  BEAN_AGE_TRACKING: { id: "bean_age_tracking", type: "pro" },
  DIAL_IN_TIMELINE: { id: "dial_in_timeline", type: "pro" },
  EXPORT_LOGS: { id: "export_logs", type: "pro" },
  PRIVATE_RECIPES: { id: "private_recipes", type: "pro" },
  BREW_GROUPS: { id: "brew_groups", type: "pro" },
  EARLY_ACCESS: { id: "early_access", type: "pro" },
  WHITE_LABEL: { id: "white_label", type: "pro" },
} as const;

export const SUBSCRIPTION_PRICE = {
  MONTHLY: 4.99,
} as const;
