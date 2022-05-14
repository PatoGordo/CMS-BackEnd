import { validateString } from "@/utils/validateString";
import { Request, Response } from "express";
import { emailExistsUseCase, signInUseCase } from "..";
import { SignUpUseCase } from "./SignUp.useCase";

export class SignUpController {
  constructor(private useCase: SignUpUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    const { email, password, name } = req.body;

    try {
      await validateString(
        [email, password, name],
        ["email", "password", "name"]
      );

      const emailAlreadyUsed = await emailExistsUseCase.execute({ email });

      if (emailAlreadyUsed) {
        throw new Error("This email is already used");
      }

      await this.useCase.execute({
        email,
        password,
        name
      });

      const response = await signInUseCase.execute({ email, password });

      return res.status(200).json({
        message: "User created successfully",
        result: response
      });
    } catch (err) {
      return res.status(400).json({
        message: (err as Error).message
      });
    }
  }
}
