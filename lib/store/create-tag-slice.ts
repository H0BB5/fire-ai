import { StateCreator, create } from "zustand";
import {
  FrontTagState,
  FrontTagActions,
  FrontTagSlice,
  ExtractedData,
  BackTagState,
  BackTagActions,
  BackTagSlice,
  MultiSlice,
  StepActions,
  StepStates,
  TagDataActions,
  TagDataSlice,
  TagState,
  StageName,
  StepNames,
} from "./types/state";
import { use } from "react";

const createFrontTagSlice: StateCreator<
  FrontTagState & FrontTagActions,
  [],
  [],
  FrontTagSlice
> = (set) => ({
  frontTagSrc: "",
  enlarge: false,
  uploaded: false,
  uploading: false,
  textExtracted: false,
  extracting: false,
  setFrontTagSrc: (tag: string) => set({ frontTagSrc: tag }),
  setUploading: (uploading: boolean) => set({ uploading }),
  setUploadingDone: (done: boolean) => set({ uploaded: done }),
  setExtractingData: (extracting: boolean) => set({ uploading: extracting }),
});

const createBackTagSlice: StateCreator<
  BackTagState & BackTagActions,
  [],
  [],
  BackTagSlice
> = (set) => ({
  backTagSrc: "",
  enlarge: false,
  uploaded: false,
  uploading: false,
  setBackTagSrc: (tag: string) => set({ backTagSrc: tag }),
  setUploading: (uploading: boolean) => set({ uploading }),
  setUploadingDone: (done: boolean) => set({ uploaded: done }),
});

const createTagDataSlice: StateCreator<
  TagState & TagDataActions,
  [],
  [],
  TagDataSlice
> = (set) => ({
  data: null,
  setTagData: (data: ExtractedData) => set({ data }),
});

const createMultiSlice: StateCreator<
  StepStates & StepActions,
  [],
  [],
  MultiSlice
> = (set) => ({
  stage: StageName.FrontTag,
  stepName: StepNames.FrontTag,
  totalSteps: 6,
  currentStep: 0,
  reset: () => set({ currentStep: 1 }),
  stepTo: (step: number) => set({ currentStep: step }),
  increment: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  decrement: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setStage: (stage: StageName) => set({ stage: stage }),
  updateStep: (stepName: StepNames) => set({ stepName: stepName }),
});

export const useFrontTagStore = create<FrontTagSlice>()((...a) => ({
  ...createFrontTagSlice(...a),
}));

export const setExtractingFrontTag = (isExtracting: boolean) =>
  useFrontTagStore.setState({ extracting: isExtracting });

export const useBackTagStore = create<BackTagSlice>()((...a) => ({
  ...createBackTagSlice(...a),
}));

export const useTagDataStore = create<TagState & TagDataActions>()((...a) => ({
  ...createTagDataSlice(...a),
}));

export const setTagData = (data: ExtractedData) =>
  useTagDataStore.setState({ data });

export const useMultiStepStore = create<FrontTagSlice & MultiSlice>()(
  (...a) => ({
    ...createFrontTagSlice(...a),
    ...createMultiSlice(...a),
  })
);
