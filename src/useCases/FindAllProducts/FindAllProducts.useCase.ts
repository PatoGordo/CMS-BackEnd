import { ProductRepository } from "@/repositories/implementations/ProductRepository";

export class FindAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  public async execute() {
    return await this.productRepository.findAll();
  }
}
