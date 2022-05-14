import { ICMSRepository } from "@/repositories/interfaces/ICMSRepository";
import { InsertCMSDataDTO } from "./InsertCMSData.dto";

export class InsertCMSDataUseCase {
  constructor(private repository: ICMSRepository) {}

  async execute({ id, data }: InsertCMSDataDTO): Promise<any> {
    try {
      let res = await this.repository.insertCMSData({ id, data });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
