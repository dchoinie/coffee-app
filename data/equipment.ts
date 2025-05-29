import { EquipmentCategory } from "./equipment-categories";

export type EquipmentBrand = {
  name: string;
  models: string[];
};

export type EquipmentType = {
  name: EquipmentCategory;
  brands: EquipmentBrand[];
};

export const ESPRESSO_MACHINES: EquipmentType = {
  name: "Espresso Machine",
  brands: [
    {
      name: "Breville",
      models: [
        "Bambino",
        "Bambino Plus",
        "Barista Express",
        "Barista Pro",
        "Barista Touch",
      ],
    },
    {
      name: "De'Longhi",
      models: ["Dedica"],
    },
    {
      name: "Gaggia",
      models: ["Classic Pro"],
    },
    {
      name: "Rancilio",
      models: ["Silvia"],
    },
    {
      name: "Lelit",
      models: ["Bianca"],
    },
    {
      name: "Profitec",
      models: ["Pro 700", "Pro 600"],
    },
    {
      name: "ECM",
      models: ["Synchronika"],
    },
    {
      name: "Rocket Espresso",
      models: ["Appartamento", "Mozzafiato"],
    },
    {
      name: "La Marzocco",
      models: ["Linea Mini", "GS3"],
    },
    {
      name: "Synesso",
      models: [],
    },
    {
      name: "Slayer",
      models: [],
    },
    {
      name: "Victoria Arduino",
      models: [],
    },
    {
      name: "Nuova Simonelli",
      models: [],
    },
  ],
};

export const MANUAL_ESPRESSO: EquipmentType = {
  name: "Manual Espresso",
  brands: [
    {
      name: "Flair",
      models: ["Espresso Pro 2", "Espresso Classic", "Espresso 58"],
    },
    {
      name: "Leverpresso",
      models: [],
    },
    {
      name: "9Barista",
      models: [],
    },
    {
      name: "Cafelat",
      models: ["Robot"],
    },
    {
      name: "Rok",
      models: ["Espresso GC"],
    },
    {
      name: "Strietman",
      models: ["CT2", "CT1"],
    },
  ],
};

export const MANUAL_GRINDERS: EquipmentType = {
  name: "Manual Grinder",
  brands: [
    {
      name: "Hario",
      models: ["Skerton Pro"],
    },
    {
      name: "Timemore",
      models: [
        "Chestnut C2",
        "Chestnut C3",
        "Chestnut X",
        "Chestnut X Lite",
        "Nano",
      ],
    },
    {
      name: "1Zpresso",
      models: ["JX", "JX Pro", "K-Series", "Q2"],
    },
    {
      name: "Kinu",
      models: ["M47 Classic", "M47 Simplicity", "M47 Phoenix"],
    },
    {
      name: "Comandante",
      models: ["C40 MK4"],
    },
    {
      name: "Flair",
      models: ["Royal"],
    },
  ],
};

export const MACHINE_GRINDERS: EquipmentType = {
  name: "Machine Grinder",
  brands: [
    {
      name: "Baratza",
      models: ["Sette 270", "Sette 270Wi", "Encore ESP", "Encore"],
    },
    {
      name: "Eureka",
      models: ["Mignon Specialita", "Mignon Silenzio", "Mignon Oro"],
    },
    {
      name: "Niche",
      models: ["Zero"],
    },
    {
      name: "DF",
      models: ["64", "83"],
    },
    {
      name: "Mazzer",
      models: ["Mini", "Super Jolly"],
    },
    {
      name: "Fellow",
      models: ["Opus", "Ode Gen 2"],
    },
    {
      name: "Breville",
      models: ["Smart Grinder Pro"],
    },
  ],
};

// Additional equipment types for other categories
export const TAMPERS: EquipmentType = {
  name: "Tamper",
  brands: [
    {
      name: "Normcore",
      models: ["V4", "V3"],
    },
    {
      name: "Pullman",
      models: ["Big Step", "Chisel"],
    },
    {
      name: "Force",
      models: ["Tamper"],
    },
  ],
};

export const SCALES: EquipmentType = {
  name: "Scale",
  brands: [
    {
      name: "Acaia",
      models: ["Lunar", "Pearl", "Pyxis"],
    },
    {
      name: "Hario",
      models: ["V60 Drip Scale"],
    },
    {
      name: "Timemore",
      models: ["Black Mirror", "Black Mirror Basic"],
    },
  ],
};

export const KETTLES: EquipmentType = {
  name: "Kettle",
  brands: [
    {
      name: "Fellow",
      models: ["Stagg EKG", "Stagg EKG Pro"],
    },
    {
      name: "Brewista",
      models: ["Smart Pour", "Artisan"],
    },
    {
      name: "Hario",
      models: ["V60 Buono"],
    },
  ],
};

export const EQUIPMENT_TYPES = [
  ESPRESSO_MACHINES,
  MANUAL_ESPRESSO,
  MANUAL_GRINDERS,
  MACHINE_GRINDERS,
  TAMPERS,
  SCALES,
  KETTLES,
];
