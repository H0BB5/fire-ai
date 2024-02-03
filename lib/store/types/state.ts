export enum StepNames {
  FrontTag = "Front Tag",
  Extracting = "Extracting",
  Review = "Review",
  BackTag = "Back Tag",
  Scheduling = "Scheduling",
  Submitting = "Submitting",
}

export enum StageName {
  FrontTag = "Front Tag",
  BackTag = "Back Tag",
  // save
  Expiration = "Expiration",
  Scheduling = "Scheduling",
  // save
}

export interface ExtractedData {
  frontTagSrc: string;
  nameOfTagIssuer: string;
  businessName: string;
  address: string;
  type: string;
  lastTestDate: Date;
}

export interface FrontTagState {
  enlarge: boolean;
  frontTagSrc: string | null;
  uploaded: boolean;
  uploading: boolean;
  extracting: boolean;
}

export interface FrontTagActions {
  setFrontTagSrc: (tag: string) => void;
  setExtractingData: (extracting: boolean) => void;
  setUploadingDone: (done: boolean) => void;
  setUploading: (uploading: boolean) => void;
}

export interface BackTagState {
  backTagSrc: string | null;
  enlarge: boolean;
  uploaded: boolean;
  uploading: boolean;
}

export interface BackTagActions {
  setBackTagSrc: (tag: string) => void;
  setUploadingDone: (done: boolean) => void;
  setUploading: (uploading: boolean) => void;
}

export interface TagState {
  data: ExtractedData | null;
  sendDate: Date | string;
}
export interface TagDataActions {
  setTagData: (data: ExtractedData) => void;
  setSendDate: (date: Date | string) => void;
}

export interface StepStates {
  stage: StageName;
  totalSteps: number;
  stepName: StepNames;
  currentStep: number;
}

export interface StepActions {
  reset: () => void;
  stepTo: (step: number) => void;
  increment: () => void;
  decrement: () => void;
}

export interface MultiSlice {
  stage: StageName;
  stepName: StepNames;
  totalSteps: number;
  currentStep: number;
  reset: () => void;
  increment: () => void;
  decrement: () => void;
  stepTo: (step: number) => void;
  setStage: (stage: StageName) => void;
  updateStep: (stepName: StepNames) => void;
}

export type TagDataSlice = TagState & TagDataActions;
export type FrontTagSlice = FrontTagState & FrontTagActions;
export type BackTagSlice = BackTagState & BackTagActions;
