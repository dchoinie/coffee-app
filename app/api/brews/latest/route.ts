import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { brews, equipment, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First get the user from our database using the Clerk userId
    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkUserId),
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Get the latest brew for the user
    const latestBrew = await db.query.brews.findFirst({
      where: eq(brews.userId, user.id),
      orderBy: [desc(brews.date)],
    });

    if (!latestBrew) {
      return new NextResponse("No brews found", { status: 404 });
    }

    // Get equipment associated with the brew
    const brewEquipment = await db.query.equipment.findMany({
      where: eq(equipment.userId, user.id),
    });

    // Combine brew and equipment data
    const response = {
      ...latestBrew,
      equipment: brewEquipment,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[BREWS_LATEST_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
