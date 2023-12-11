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
  location: string;
  serial: string;
  rating: string;
  lastTestDate: Date | undefined;
};

type Store = {
  aiTagData: TagExtraction | null;
};

export const useAIStore = create<Store>((set) => ({
  aiTagData: null,
}));

export const setExtraction = (data: TagExtraction) =>
  useAIStore.setState({ aiTagData: data });
