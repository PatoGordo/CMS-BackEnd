import { IUser } from "@/entities/User";

export interface IAuthRepository {
  signUp(user: IUser): Promise<IUser>;
  signIn({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: IUser }>;
  userExists({ id }: { id: string }): Promise<boolean>;
  isEmailAlreadyUsed({ email }: { email: string }): Promise<boolean>;
}
