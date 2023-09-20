import { Record } from '../model/mGallery'

export interface iRecipePage {
  current: number;
  size: number;
  quertOption: {
    parseDetail: boolean;
    parseProcedure: boolean;
  }
}

export interface iData {
  contacts: Record[];
  contact: Record;
  transformIdx: number;
  position: string;
  duration: number;
  show: boolean;
  overlay: boolean;
  dataList: [];
  page: number;
  pageSize: number;
}
