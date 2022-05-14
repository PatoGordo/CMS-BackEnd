import { IUser } from "@/entities/User";
import { IAuthRepository } from "@/repositories/interfaces/IAuthRepository";
import { SignUpDTO } from "./SignUp.dto";

export class SignUpUseCase {
  constructor(private repository: IAuthRepository) {}

  async execute(user: SignUpDTO): Promise<IUser> {
    try {
      const newUser = this.repository.signUp(user);

      return newUser;
    } catch (err) {
      throw err;
    }
  }
}
