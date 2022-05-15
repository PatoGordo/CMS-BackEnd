import { validateString } from "@/utils/validateString";
import { Request, Response } from "express";
import { ValidateAPIKeyUseCase } from "../ValidateAPIKey/ValidateAPIKey.useCase";
import { GetCMSStructureUseCase } from "./GetCMSStructure.useCase";

export class GetCMSStructureController {
  constructor(
    private getCMSStructureUseCase: GetCMSStructureUseCase,
    private validateAPIKeyUseCase: ValidateAPIKeyUseCase
  ) {}

  async execute(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const { api_key } = req.params;

    try {
      await validateString([id, api_key], ["id", "api_key"]);

      const isAPIKeyValid = await this.validateAPIKeyUseCase.execute({
        id,
        api_key
      });

      if (!isAPIKeyValid) {
        throw new Error("This is a invalid api_key");
      }

      const result = await this.getCMSStructureUseCase.execute({
        id
      });

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
