import { ICMSRepository } from "@/repositories/interfaces/ICMSRepository";
import { ValidateDataToStructureDTO } from "./validateDataToStructure.dto";

export class ValidateDataToStructureUseCase {
  constructor(private repository: ICMSRepository) {}

  async execute({ data, id }: ValidateDataToStructureDTO): Promise<any> {
    try {
      const res = await this.repository.validateDataToStructure({ data, id });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
