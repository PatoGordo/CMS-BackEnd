import { ICMSRepository } from "@/repositories/interfaces/ICMSRepository";
import { ValidateAPIKeyDTO } from "./ValidateAPIKey.dto";

export class ValidateAPIKeyUseCase {
  constructor(private repository: ICMSRepository) {}

  async execute({ id, api_key }: ValidateAPIKeyDTO): Promise<boolean> {
    try {
      const res = await this.repository.validateAPIKey({
        id,
        api_key
      });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
