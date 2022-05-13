import { Product } from "@/entities/Product";
import { IProductRepository } from "@/repositories/interfaces/IProductRepository";
import { DefaultError } from "@/types/error";
import { CreateProductRequestDTO } from "./CreateProduct.dto";

export class CreateProductUseCase {
  constructor(private productsRepository: IProductRepository) {}

  async execute({
    name,
    price,
    inventoryAvailability
  }: CreateProductRequestDTO): Promise<Product> {
    try {
      const result = await this.productsRepository.save({
        name,
        price,
        inventoryAvailability
      });

      return result;
    } catch (err) {
      throw new Error((err as DefaultError).message || "Unexpected error.");
    }
  }
}
