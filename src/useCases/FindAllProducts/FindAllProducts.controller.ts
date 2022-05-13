import { FindAllProductsUseCase } from "./FindAllProducts.useCase";
import { Request, Response } from "express";
import { DefaultError } from "@/types/error";

export class FindAllProductsController {
  private useCase: FindAllProductsUseCase;

  constructor(useCase: FindAllProductsUseCase) {
    this.useCase = useCase;
  }

  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.useCase.execute();

      return res.status(200).json({
        result
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: (err as DefaultError).message
      });
    }
  }
}
