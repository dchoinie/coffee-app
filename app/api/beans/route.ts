import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const beans = await db.query.beans.findMany({
      columns: {
        id: true,
        name: true,
        roaster: true,
        origin: true,
        roastDate: true,
        startingWeight: true,
        currentWeight: true,
      },
      orderBy: (beans, { desc }) => [desc(beans.roastDate)],
    });

    return NextResponse.json(beans);
  } catch (error) {
    console.error("Error fetching beans:", error);
    return NextResponse.json(
      { error: "Failed to fetch beans" },
      { status: 500 }
    );
  }
}
