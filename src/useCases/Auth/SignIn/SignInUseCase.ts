import { IUser } from "@/entities/User";
import { IAuthRepository } from "@/repositories/interfaces/IAuthRepository";
import { SignInDTO } from "./SignIn.dto";

export class SignInUseCase {
  constructor(private repository: IAuthRepository) {}

  async execute({
    email,
    password
  }: SignInDTO): Promise<{ token: string; user: IUser }> {
    try {
      const res = this.repository.signIn({ email, password });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
