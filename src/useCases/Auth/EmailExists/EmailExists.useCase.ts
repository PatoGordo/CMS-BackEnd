import { IAuthRepository } from "@/repositories/interfaces/IAuthRepository";
import { EmailExistsDTO } from "./EmailExists.dto";

export class EmailExistsUseCase {
  constructor(private repository: IAuthRepository) {}

  async execute({ email }: EmailExistsDTO): Promise<boolean> {
    try {
      const res = await this.repository.isEmailAlreadyUsed({ email });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
