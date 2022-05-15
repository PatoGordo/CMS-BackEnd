import { ICMS } from "@/entities/CMS";
import { ICMSRepository } from "@/repositories/interfaces/ICMSRepository";
import { GetUserCMSsDTO } from "./GetUserCMSs.dto";

export class GetUserCMSsUseCase {
  constructor(private repository: ICMSRepository) {}

  async execute({ uid }: GetUserCMSsDTO): Promise<(undefined | ICMS)[]> {
    try {
      const res = await this.repository.getUserCMSs({ uid });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
