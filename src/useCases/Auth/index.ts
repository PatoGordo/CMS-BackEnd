import { MongoDBAuthRepository } from "@/repositories/implementations/mongo/MongoDBAuthRepository";
import { EmailExistsUseCase } from "./EmailExists/EmailExists.useCase";
import { SignInController } from "./SignIn/SignIn.controller";
import { SignInUseCase } from "./SignIn/SignInUseCase";
import { SignUpController } from "./SignUp/SignUp.controller";
import { SignUpUseCase } from "./SignUp/SignUp.useCase";
import { UserExistsUseCase } from "./UserExists/UserExists.useCase";

const repository = new MongoDBAuthRepository();

export const signUpUseCase = new SignUpUseCase(repository);
export const signInUseCase = new SignInUseCase(repository);
export const userExistsUseCase = new UserExistsUseCase(repository);
export const emailExistsUseCase = new EmailExistsUseCase(repository);

export const signUpController = new SignUpController(signUpUseCase);
export const signInController = new SignInController(signInUseCase);
