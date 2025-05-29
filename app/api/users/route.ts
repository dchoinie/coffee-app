import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.clerkId, userId),
    });

    if (existingUser) {
      return NextResponse.json(existingUser);
    }

    // Create new user
    const newUser = await db
      .insert(users)
      .values({
        clerkId: userId,
      })
      .returning();

    return NextResponse.json(newUser[0]);
  } catch (error) {
    console.error("[USER_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
