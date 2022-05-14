import { ICMSRepository } from "@/repositories/interfaces/ICMSRepository";
import { GetCMSDataDTO } from "./getCMSData.dto";

export class GetCMSDataUseCase {
  constructor(private repository: ICMSRepository) {}

  async execute({ id }: GetCMSDataDTO): Promise<any[]> {
    try {
      const res = await this.repository.getCMSData({ id });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
