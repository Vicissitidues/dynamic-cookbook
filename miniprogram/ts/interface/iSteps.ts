import { RecipeProcedure } from "../model/mGallery";

export interface iData {
  steps: RecipeProcedure[]
  scrollLeft: number,
  titleOffset: number,
  currentStep: number,
  timerIdentify: number,
}