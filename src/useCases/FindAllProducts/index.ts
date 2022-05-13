import { ProductRepository } from "@/repositories/implementations/ProductRepository";
import { FindAllProductsController } from "./FindAllProducts.controller";
import { FindAllProductsUseCase } from "./FindAllProducts.useCase";

const productRepository = new ProductRepository();
const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

const findAllProductsController = new FindAllProductsController(
  findAllProductsUseCase
);

export { findAllProductsUseCase, findAllProductsController };
