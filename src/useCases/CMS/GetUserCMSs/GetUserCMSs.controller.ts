import { Request, Response } from "express";
import { GetUserCMSsUseCase } from "./GetUserCMSs.useCase";

export class GetUserCMSsController {
  constructor(private useCase: GetUserCMSsUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { uid } = req;

      if (!uid) {
        throw new Error("This isn't a valid user!");
      }

      const result = (await this.useCase.execute({ uid })) || [];

      return res.status(200).json({
        result
      });
    } catch (err) {
      return res.status(400).json({
        message: (err as Error).message
      });
    }
  }
}
