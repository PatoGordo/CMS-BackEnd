import { validateString } from "@/utils/validateString";
import { Request, Response } from "express";
import { SignInUseCase } from "./SignInUseCase";

export class SignInController {
  constructor(private useCase: SignInUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      await validateString([email, password], ["email", "password"]);

      const response = await this.useCase.execute({ email, password });

      return res.status(200).json({
        message: "Signined successfully",
        result: response
      });
    } catch (err) {
      return res.status(400).json({
        message: (err as Error).message
      });
    }
  }
}
