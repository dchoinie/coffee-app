"use client";

import { EQUIPMENT_TYPES, EquipmentType } from "@/data/equipment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEquipmentStore } from "@/lib/store/equipmentStore";

interface EquipmentFormProps {
  onClose: () => void;
}

export default function EquipmentForm({ onClose }: EquipmentFormProps) {
  const [selectedType, setSelectedType] = useState<EquipmentType | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const addEquipment = useEquipmentStore((state) => state.addEquipment);

  const handleTypeChange = (typeName: string) => {
    const type = EQUIPMENT_TYPES.find((t) => t.name === typeName);
    setSelectedType(type || null);
    setSelectedBrand(null);
    setSelectedModel(null);
  };

  const handleBrandChange = (brandName: string) => {
    setSelectedBrand(brandName);
    setSelectedModel(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !selectedBrand || !selectedModel) return;

    try {
      await addEquipment({
        type: selectedType.name,
        brand: selectedBrand,
        model: selectedModel,
      });
      onClose();
    } catch (error) {
      console.error("Failed to add equipment:", error);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Equipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Equipment Type</label>
            <Select onValueChange={handleTypeChange} value={selectedType?.name}>
              <SelectTrigger>
                <SelectValue placeholder="Select equipment type" />
              </SelectTrigger>
              <SelectContent>
                {EQUIPMENT_TYPES.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedType && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Select
                onValueChange={handleBrandChange}
                value={selectedBrand || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {selectedType.brands.map((brand) => (
                    <SelectItem key={brand.name} value={brand.name}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedBrand && selectedType && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <Select
                onValueChange={setSelectedModel}
                value={selectedModel || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {selectedType.brands
                    .find((b) => b.name === selectedBrand)
                    ?.models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedType || !selectedBrand || !selectedModel}
            >
              Add Equipment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
