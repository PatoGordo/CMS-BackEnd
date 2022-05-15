import { ICMSRepository } from "@/repositories/interfaces/ICMSRepository";
import { GetCMSStructureDTO } from "./GetCMSStructure.dto";

export class GetCMSStructureUseCase {
  constructor(private repository: ICMSRepository) {}

  async execute({ id }: GetCMSStructureDTO): Promise<object> {
    try {
      const res = await this.repository.getCMSStructure({ id });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
