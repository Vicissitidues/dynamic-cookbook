import { Record } from '../model/mGallery'

export interface iRecipePage {
  current: number;
  size: number;
  quertOption: {
    parseDetail: boolean;
    parseProcedure: boolean;
  }
}

interface classifies {
  label: string;
  id: number;
}

export interface iData {
  contacts: Record[];
  contact: Record;
  transformIdx: number;
  duration: number;
  show: boolean;
  overlay: boolean;
  dataList: [];
  page: number;
  pageSize: number;
  container: any;
  showTopMask: boolean;
  classifies: classifies[];
}
