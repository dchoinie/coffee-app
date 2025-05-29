"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EQUIPMENT_TYPES } from "@/data/equipment";
import { useEquipmentStore } from "@/lib/store/equipmentStore";
import { useEffect } from "react";

export default function EquipmentSummary() {
  const { equipment, isLoading, error, fetchEquipment } = useEquipmentStore();

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  const equipmentByType = EQUIPMENT_TYPES.map((type) => ({
    ...type,
    items: equipment.filter((e) => e.type === type.name),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Equipment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-2">
              {EQUIPMENT_TYPES.map((type) => (
                <div key={type.name} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            equipmentByType.map((type) => (
              <div
                key={type.name}
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type.items.length === 0
                      ? `No ${type.name.toLowerCase()} added yet`
                      : type.items.map((item) => (
                          <span key={item.id} className="block">
                            {item.brand} {item.model}
                          </span>
                        ))}
                  </p>
                </div>
              </div>
            ))
          )}
          <Button asChild className="w-full mt-4">
            <Link href="/equipment">Manage Equipment</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
