import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getUserFeatures } from "@/lib/stripe";
import { FEATURE_IDS } from "@/lib/config";

type FeatureFlags = {
  // Core Features
  UNLIMITED_BEANS: boolean;
  UNLIMITED_BREWS: boolean;
  MANUAL_LOGGING: boolean;
  BASIC_DASHBOARD: boolean;
  PUBLIC_RECIPES: boolean;

  // Pro Features
  VISUAL_ANALYTICS: boolean;
  DEVICE_INTEGRATIONS: boolean;
  BEAN_AGE_TRACKING: boolean;
  DIAL_IN_TIMELINE: boolean;
  EXPORT_LOGS: boolean;
  PRIVATE_RECIPES: boolean;
  BREW_GROUPS: boolean;
  EARLY_ACCESS: boolean;
  WHITE_LABEL: boolean;
};

type UserFeature = {
  featureId: string;
  isEnabled: boolean;
  featureType: "core" | "pro";
};

const defaultFeatures: FeatureFlags = {
  // Core Features (always enabled)
  UNLIMITED_BEANS: true,
  UNLIMITED_BREWS: true,
  MANUAL_LOGGING: true,
  BASIC_DASHBOARD: true,
  PUBLIC_RECIPES: true,

  // Pro Features (disabled by default)
  VISUAL_ANALYTICS: false,
  DEVICE_INTEGRATIONS: false,
  BEAN_AGE_TRACKING: false,
  DIAL_IN_TIMELINE: false,
  EXPORT_LOGS: false,
  PRIVATE_RECIPES: false,
  BREW_GROUPS: false,
  EARLY_ACCESS: false,
  WHITE_LABEL: false,
};

export function useFeatures() {
  const { user } = useUser();
  const [features, setFeatures] = useState<FeatureFlags>(defaultFeatures);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeatures() {
      if (!user) {
        setFeatures(defaultFeatures);
        setIsLoading(false);
        return;
      }

      try {
        const userFeatures = await getUserFeatures(user.id);
        const featureMap = userFeatures.reduce(
          (acc: FeatureFlags, feature: UserFeature) => {
            // Find the feature key by matching the featureId
            const featureKey = Object.entries(FEATURE_IDS).find(
              ([, value]) => value.id === feature.featureId
            )?.[0] as keyof FeatureFlags;

            if (featureKey) {
              acc[featureKey] = feature.isEnabled;
            }
            return acc;
          },
          { ...defaultFeatures }
        );

        setFeatures(featureMap);
      } catch (error) {
        console.error("Error loading features:", error);
        setFeatures(defaultFeatures);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeatures();
  }, [user]);

  return {
    features,
    isLoading,
    isPro: features.VISUAL_ANALYTICS === true, // Using visual analytics as the main pro indicator
    canAccessHistory: (date: Date) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return features.VISUAL_ANALYTICS || date >= thirtyDaysAgo;
    },
  };
}
