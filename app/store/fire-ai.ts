import { create } from "zustand";

type Store = {
  extraction: string | null;
};

export const useAIStore = create<Store>((set) => ({
  extraction: null,
}));

export const setExtraction = (extraction: string) =>
  useAIStore.setState({ extraction });
