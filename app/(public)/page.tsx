"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.push("/dashboard");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <main className="h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-16 h-full flex justify-center items-center">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo Placeholder */}
          <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center">
            <span className="text-amber-800 text-2xl">☕</span>
          </div>

          <h1 className="text-5xl font-bold text-amber-900">
            Brew Your Perfect Cup
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl">
            Discover the art of coffee brewing with our innovative app. Track
            your brews, explore recipes, and elevate your coffee experience.
          </p>
          <div className="flex gap-4">
            <button className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors">
              Log in
            </button>
            <button className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-full hover:bg-amber-50 transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
