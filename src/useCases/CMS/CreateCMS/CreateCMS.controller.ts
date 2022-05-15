import { validateString } from "@/utils/validateString";
import { Request, Response } from "express";
import { CreateCMSUseCase } from "./CreateCMS.useCase";

export class CreateCMSController {
  constructor(private useCase: CreateCMSUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    const { name, structure, authorized_urls } = req.body;

    await validateString(name, "name");

    try {
      const result = await this.useCase.execute({
        name,
        owner_id: req.uid as string,
        structure,
        authorized_urls
      });

      return res.status(201).json({
        message: "CMS Created with success",
        result
      });
    } catch (err) {
      return res.status(400).json({
        message: (err as Error).message
      });
    }
  }
}
