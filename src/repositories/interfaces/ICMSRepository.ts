import { ICMS } from "@/entities/CMS";

export interface ICMSRepository {
  createCMS(cms: ICMS): Promise<ICMS>;
  getCMSStructure({ id }: { id: string }): Promise<object>;
  getCMSData({ id }: { id: string }): Promise<Array<unknown>>;
  insertCMSData({ id, data }: { id: string; data: any }): Promise<any>;
  validateDataToStructure({
    id,
    data
  }: {
    id: string;
    data: any;
  }): Promise<any>;
}
