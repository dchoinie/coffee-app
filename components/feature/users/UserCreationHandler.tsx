"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function UserCreationHandler() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const createUser = async () => {
      if (!isLoaded || !userId) return;

      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to create user");
        }

        // Refresh the page to ensure all components have the latest user data
        router.refresh();
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    createUser();
  }, [isLoaded, userId, router]);

  return null;
}
