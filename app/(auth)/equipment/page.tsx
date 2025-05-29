"use client";

import { EQUIPMENT_TYPES } from "@/data/equipment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import EquipmentForm from "@/components/feature/equipment/EquipmentForm";
import { useEquipmentStore } from "@/lib/store/equipmentStore";
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function EquipmentPage() {
  const [isAddingEquipment, setIsAddingEquipment] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<string | null>(
    null
  );
  const { equipment, isLoading, error, fetchEquipment, deleteEquipment } =
    useEquipmentStore();

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  const equipmentByType = EQUIPMENT_TYPES.map((type) => ({
    ...type,
    items: equipment.filter((e) => e.type === type.name),
  }));

  const handleDelete = async () => {
    if (!equipmentToDelete) return;
    try {
      await deleteEquipment(equipmentToDelete);
      setEquipmentToDelete(null);
    } catch (error) {
      console.error("Failed to delete equipment:", error);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Equipment</h1>
        <Button onClick={() => setIsAddingEquipment(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      {isAddingEquipment && (
        <EquipmentForm onClose={() => setIsAddingEquipment(false)} />
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EQUIPMENT_TYPES.map((type) => (
            <Card key={type.name}>
              <CardHeader>
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentByType.map((type) => (
            <Card key={type.name}>
              <CardHeader>
                <CardTitle>{type.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {type.items.length === 0 ? (
                  <p className="text-muted-foreground">
                    No {type.name.toLowerCase()} added yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {type.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">
                            {item.brand} {item.model}
                          </p>
                          {item.purchaseDate && (
                            <p className="text-sm text-muted-foreground">
                              Purchased:{" "}
                              {new Date(item.purchaseDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEquipmentToDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog
        open={!!equipmentToDelete}
        onOpenChange={(open) => !open && setEquipmentToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Equipment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this equipment? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
