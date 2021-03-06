import { validateString } from "@/utils/validateString";
import { Request, Response } from "express";
import { ValidateAPIKeyUseCase } from "../ValidateAPIKey/ValidateAPIKey.useCase";
import { ValidateDataToStructureUseCase } from "../ValidateDataToStructure/ValidateDataToStructure.useCase";
import { InsertCMSDataUseCase } from "./InsertCMSData.useCase";

export class InsertCMSDataController {
  constructor(
    private insertCMSDataUseCase: InsertCMSDataUseCase,
    private validateAPIKeyUseCase: ValidateAPIKeyUseCase,
    private validateDataToStructureUseCase: ValidateDataToStructureUseCase
  ) {}

  async execute(req: Request, res: Response): Promise<Response> {
    const { id, data } = req.body;
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

      await this.validateDataToStructureUseCase.execute({
        data,
        id
      });

      const result = await this.insertCMSDataUseCase.execute({ id, data });

      return res.status(201).json({
        message: "Data inserted to the CMS",
        result
      });
    } catch (err) {
      return res.status(400).json({
        message: (err as Error).message
      });
    }
  }
}
