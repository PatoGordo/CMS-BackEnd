import { ICMS } from "@/entities/CMS";

export interface ICMSRepository {
  createCMS(cms: ICMS): Promise<ICMS>;
  getUserCMSs({ uid }: { uid: string }): Promise<(ICMS | undefined)[]>;
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
  validateAPIKey({
    id,
    api_key
  }: {
    id: string;
    api_key: string;
  }): Promise<boolean>;
}
