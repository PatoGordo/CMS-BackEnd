import { CMS, ICMS } from "@/entities/CMS";
import { ICMSRepository } from "@/repositories/interfaces/ICMSRepository";
import { validateDataToStructure } from "@/utils/validateData";
import { v4 } from "uuid";

export class MongoDBCMSRepository implements ICMSRepository {
  async createCMS(cms: ICMS): Promise<ICMS> {
    try {
      let newCMS = new CMS({
        ...cms,
        api_key: v4()
      });

      await newCMS.save();

      return newCMS;
    } catch (err) {
      throw err;
    }
  }

  async getUserCMSs({ uid }: { uid: string }): Promise<(ICMS | undefined)[]> {
    try {
      let userCMSs = await CMS.find({ owner_id: uid });

      return userCMSs;
    } catch (err) {
      throw err;
    }
  }

  async insertCMSData({ id, data }: { id: string; data: any }): Promise<any> {
    try {
      await CMS.findOneAndUpdate(
        { id },
        {
          $push: {
            data
          }
        }
      );

      return data;
    } catch (err) {
      throw err;
    }
  }

  async getCMSData({ id }: { id: string }): Promise<unknown[]> {
    try {
      const DBData = await CMS.findOne({ id });

      return DBData?.data || [];
    } catch (err) {
      throw err;
    }
  }

  async getCMSStructure({ id }: { id: string }): Promise<object> {
    try {
      const DBStructure = await CMS.findOne({ id });

      return DBStructure?.structure || {};
    } catch (err) {
      throw err;
    }
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
    try {
      const cms = await CMS.findOne({ id });

      if (!cms) {
        throw new Error("This CMS does not exists");
      }

      if (cms.api_key === api_key) {
        return true;
      }

      return false;
    } catch (err) {
      throw err;
    }
  }
}
