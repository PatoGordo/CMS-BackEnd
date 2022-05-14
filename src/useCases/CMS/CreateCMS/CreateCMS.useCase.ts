import { ICMS } from "@/entities/CMS";
import { ICMSRepository } from "@/repositories/interfaces/ICMSRepository";
import { CreateCMSDTO } from "./CreateCMS.dto";

export class CreateCMSUseCase {
  constructor(private repository: ICMSRepository) {}

  async execute(cms: CreateCMSDTO): Promise<ICMS> {
    try {
      const res = await this.repository.createCMS(cms);

      return res;
    } catch (err) {
      throw err;
    }
  }
}
