import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { equipment } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the user's ID from our database using their Clerk ID
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.clerkId, userId),
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Fetch all equipment for the user
    const userEquipment = await db.query.equipment.findMany({
      where: eq(equipment.userId, user.id),
    });

    return NextResponse.json(userEquipment);
  } catch (error) {
    console.error("[EQUIPMENT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
