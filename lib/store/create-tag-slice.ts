import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

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
  [["zustand/devtools", never]],
  [],
  FrontTagSlice
> = (set) => ({
  frontTagSrc: "",
  enlarge: false,
  uploaded: false,
  uploading: false,
  textExtracted: false,
  extracting: false,
  setFrontTagSrc: (tag: string) => {
    set({ frontTagSrc: tag }, false, "Set Front Tag Src");
  },
  setUploading: (uploading: boolean) => {
    set({ uploading }, false, "Set Uploading");
  },
  setUploadingDone: (done: boolean) => {
    set({ uploaded: done }, false, "Set Uploading Done");
  },
  setExtractingData: (extracting: boolean) => {
    set({ uploading: extracting }, false, "Set Extracting Data");
  },
});

const createBackTagSlice: StateCreator<
  BackTagState & BackTagActions,
  [["zustand/devtools", never]],
  [],
  BackTagSlice
> = (set) => ({
  backTagSrc: "",
  enlarge: false,
  uploaded: false,
  uploading: false,
  setBackTagSrc: (tag: string) => {
    set({ backTagSrc: tag }, false, "Set Back Tag Src");
  },
  setUploading: (uploading: boolean) => {
    set({ uploading }, false, "Set Uploading");
  },
  setUploadingDone: (done: boolean) => {
    set({ uploaded: done }, false, "Set Uploading Done");
  },
});

const createTagDataSlice: StateCreator<
  TagState & TagDataActions,
  [["zustand/devtools", never]],
  [],
  TagDataSlice
> = (set) => ({
  data: null,
  sendDate: new Date(),
  setTagData: (data: ExtractedData) => {
    set({ data }, false, "Tag Data Set");
  },
  setSendDate: (date: string | Date) => {
    set({ sendDate: date }, false, "Notification Date Set");
  },
});

export const useTagDataStore = create<TagState & TagDataActions>()(
  devtools(
    (...a) => ({
      ...createTagDataSlice(...a),
    }),
    { enabled: true, name: "Create Tag Store" }
  )
);

export const setTagData = (data: ExtractedData) => {
  useTagDataStore.setState({ data }, false, "Set Tag Data");
};

export const setTagSendDate = (date: Date) => {
  useTagDataStore.setState({ sendDate: date }, false, "Set Tag Send Date");
};

const createMultiSlice: StateCreator<
  StepStates & StepActions,
  [["zustand/devtools", never]],
  [],
  MultiSlice
> = (set) => ({
  stage: StageName.FrontTag,
  stepName: StepNames.FrontTag,
  totalSteps: 6,
  currentStep: 0,
  reset: () => {
    set({ currentStep: 1 }, false, "Reset Form");
  },
  stepTo: (step: number) => {
    set({ currentStep: step }, false, "Step To");
  },
  increment: () => {
    set(
      (state) => ({ currentStep: state.currentStep + 1 }),
      false,
      "Increment Step"
    );
  },
  decrement: () => {
    set((state) => ({ currentStep: state.currentStep - 1 })),
      false,
      "Decrement Step";
  },
  setStage: (stage: StageName) => {
    set({ stage: stage }, false, "Set Stage");
  },
  updateStep: (stepName: StepNames) => {
    set({ stepName: stepName }, false, "Update Step");
  },
});

export const useFrontTagStore = create<FrontTagSlice>()(
  devtools(
    (...a) => ({
      ...createFrontTagSlice(...a),
    }),
    { enabled: true, name: "Front Tag Store" }
  )
);

export const setExtractingFrontTag = (isExtracting: boolean) =>
  useFrontTagStore.setState({ extracting: isExtracting });

export const useBackTagStore = create<BackTagSlice>()(
  devtools(
    (...a) => ({
      ...createBackTagSlice(...a),
    }),
    { enabled: true, name: "Back Tag Store" }
  )
);

export const useMultiStepStore = create<FrontTagSlice & MultiSlice>()(
  devtools(
    (...a) => ({
      ...createFrontTagSlice(...a),
      ...createMultiSlice(...a),
    }),
    { enabled: true, name: "Multi Step Store" }
  )
);
