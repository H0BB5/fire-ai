import { create } from "zustand";

export enum EQUIPMENT {
  Extinguisher = "Fire Extinguisher",
  Hose = "Fire Hose",
  System = "System",
}

export const equipmentTypes = [
  {
    type: EQUIPMENT.Extinguisher,
  },
  {
    type: EQUIPMENT.Hose,
  },
  {
    type: EQUIPMENT.System,
  },
];

type TagExtraction = {
  nameOfTagIssuer: string;
  businessName: string;
  address: string;
  type: EQUIPMENT;
  lastTestDate: Date | undefined;
};

type TextExtractStore = {
  aiTagData: TagExtraction | null;
  isExtracting: boolean;
};

export const useAIStore = create<TextExtractStore>((set) => ({
  aiTagData: null,
  isExtracting: false,
}));

export const setExtraction = (data: TagExtraction) =>
  useAIStore.setState({ aiTagData: data });

export const setExtractingText = (inProgress: boolean) =>
  useAIStore.setState({ isExtracting: inProgress });
