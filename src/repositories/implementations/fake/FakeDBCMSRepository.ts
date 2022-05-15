import { fakeDB } from "@/databases/fake-db";
import { CMS, ICMS } from "@/entities/CMS";
import { ICMSRepository } from "@/repositories/interfaces/ICMSRepository";
import { validateDataToStructure } from "@/utils/validateData";
import { v4 } from "uuid";

export class FakeDBCMSRepository implements ICMSRepository {
  async createCMS(cms: ICMS): Promise<ICMS> {
    let newCMS = new CMS({
      ...cms,
      api_key: v4()
    });

    fakeDB.cms.push(newCMS);

    return newCMS;
  }

  async insertCMSData({ id, data }: { id: string; data: any }): Promise<any> {
    fakeDB.cms.forEach((_cms) => {
      if (_cms.id === id) {
        _cms.data?.push(data);
      }
    });
  }

  async getCMSData({ id }: { id: string }): Promise<unknown[]> {
    let cmsData = fakeDB.cms.find((_cms) => _cms.id === id)?.data;

    if (!cmsData) {
      throw new Error("This CMS does not exists!");
    }

    return cmsData;
  }

  async getCMSStructure({ id }: { id: string }): Promise<object> {
    let cmsStructure = fakeDB.cms.find((_cms) => _cms.id === id)?.structure;

    if (!cmsStructure) {
      throw new Error("This CMS does not exists!");
    }

    return cmsStructure;
  }

  async validateDataToStructure({
    id,
    data
  }: {
    id: string;
    data: any;
  }): Promise<any> {
    try {
      let structure = await this.getCMSStructure({ id });

      let validData = await validateDataToStructure(structure, data);

      return validData;
    } catch (err) {
      throw err;
    }
  }

  async validateAPIKey({
    id,
    api_key
  }: {
    id: string;
    api_key: string;
  }): Promise<boolean> {
    let cmsAPIKey = fakeDB.cms.find((_cms) => _cms.id === id)?.api_key;

    if (cmsAPIKey === api_key) {
      return true;
    }
    return false;
  }
}
