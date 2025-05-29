"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import Container from "@/components/common/container";
import Inventory from "@/components/feature/dashboard/inventory";
import { FloatingCTA } from "@/components/feature/dashboard/FloatingCTA";
import { NewBrewModal } from "@/components/feature/dashboard/NewBrewModal";
import EquipmentSummary from "@/components/feature/dashboard/EquipmentSummary";
import { useState } from "react";

export default function DashboardPage() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container className="py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.firstName || "Coffee Lover"}!
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Inventory />
            </CardContent>
          </Card>
          <EquipmentSummary />
        </div>
      </Container>
      <FloatingCTA onClick={() => setOpen(true)} />
      <NewBrewModal open={open} onOpenChange={setOpen} beans={[]} />
    </>
  );
}
