import { ProductRepository } from "@/repositories/implementations/ProductRepository";
import { CreateProductController } from "./CreateProduct.controller";
import { CreateProductUseCase } from "./CreateProduct.useCase";

const productRepository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);

const createProductController = new CreateProductController(
  createProductUseCase
);

export { createProductUseCase, createProductController };
