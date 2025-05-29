export const DEFAULT_EQUIPMENT_CATEGORIES = [
  "Espresso Machine",
  "Manual Espresso",
  "Manual Grinder",
  "Machine Grinder",
  "Tamper",
  "Portafilter",
  "Scale",
  "WDT",
  "Pressure Gauge",
  "Filter",
  "Kettle",
  "Thermometer",
] as const;

export type EquipmentCategory = (typeof DEFAULT_EQUIPMENT_CATEGORIES)[number];

export const isDefaultCategory = (
  category: string
): category is EquipmentCategory => {
  return DEFAULT_EQUIPMENT_CATEGORIES.includes(category as EquipmentCategory);
};
