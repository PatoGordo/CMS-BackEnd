import { IAuthRepository } from "@/repositories/interfaces/IAuthRepository";
import { UserExistsDTO } from "./UserExists.dto";

export class UserExistsUseCase {
  constructor(private repository: IAuthRepository) {}

  async execute({ id }: UserExistsDTO): Promise<boolean> {
    try {
      const res = this.repository.userExists({ id });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
