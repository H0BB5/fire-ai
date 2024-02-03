import { create } from "zustand";

enum EQUIPMENT {
  Extinguisher = "Extinguisher",
  Hose = "Hose",
  System = "System",
}

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
