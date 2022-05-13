import { NextFunction, Request, Response } from "express";
import { CreateProductRequestDTO } from "./CreateProduct.dto";
import { CreateProductUseCase } from "./CreateProduct.useCase";

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  public async execute(req: Request, res: Response): Promise<Response> {
    const { name, price, inventoryAvailability }: CreateProductRequestDTO =
      req.body;

    const result = await this.createProductUseCase.execute({
      name,
      price,
      inventoryAvailability
    });

    return res.status(201).json({
      result
    });
  }

  public validate(req: Request, res: Response, next: NextFunction) {
    const { name, price, inventoryAvailability }: CreateProductRequestDTO =
      req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: '"name" is a required parameter'
      });
    }
    if (!price) {
      return res.status(400).json({
        message: '"name" is a required parameter'
      });
    }
    if (!inventoryAvailability) {
      return res.status(400).json({
        message: '"inventoryAvailability" is a required parameter'
      });
    }

    next();
  }
}
