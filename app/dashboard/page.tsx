import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { beans, brews } from "@/lib/db/schema";
import { eq, and, gte, desc, gt } from "drizzle-orm";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Coffee, Bean } from "lucide-react";
import Link from "next/link";

type Brew = typeof brews.$inferSelect & {
  bean: typeof beans.$inferSelect;
};

type Bean = typeof beans.$inferSelect;

async function getTodaysBrews(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (await db.query.brews.findMany({
    where: and(eq(brews.userId, userId), gte(brews.date, today)),
    with: {
      bean: true,
    },
    orderBy: [desc(brews.date)],
  })) as Brew[];
}

async function getActiveBeans(userId: string) {
  return (await db.query.beans.findMany({
    where: and(eq(beans.userId, userId), gt(beans.currentWeight, "0")),
    orderBy: [desc(beans.roastDate)],
  })) as Bean[];
}

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const [todaysBrews, activeBeans] = await Promise.all([
    getTodaysBrews(user.id),
    getActiveBeans(user.id),
  ]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Quick Add Buttons */}
      <div className="flex gap-4">
        <Link href="/brews/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <Coffee className="h-4 w-4" />
            Log Brew
          </Button>
        </Link>
        <Link href="/beans/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <Bean className="h-4 w-4" />
            Add Bean
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today&apos;s Brew Log */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Today&apos;s Brews</h2>
          {todaysBrews.length === 0 ? (
            <p className="text-muted-foreground">No brews logged today</p>
          ) : (
            <div className="space-y-4">
              {todaysBrews.map((brew: Brew) => (
                <div key={brew.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{brew.bean.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {brew.method} • {brew.dose}g in, {brew.yield}g out
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(brew.date, "h:mm a")}
                    </div>
                  </div>
                  {brew.notes && <p className="text-sm mt-2">{brew.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Active Bean Panel */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Active Beans</h2>
          {activeBeans.length === 0 ? (
            <p className="text-muted-foreground">No active beans</p>
          ) : (
            <div className="space-y-4">
              {activeBeans.map((bean: Bean) => {
                const age = Math.floor(
                  (new Date().getTime() - new Date(bean.roastDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                );

                return (
                  <div key={bean.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{bean.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {bean.roaster} • {bean.origin}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {bean.currentWeight}g left
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Roast Age: {age} days</p>
                      <p>Starting Weight: {bean.startingWeight}g</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
