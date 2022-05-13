import { Product } from "@/entities/Product";
import { db } from "@/databases/fake-db";
import { IProductRepository } from "../interfaces/IProductRepository";

export class ProductRepository implements IProductRepository {
  constructor(private products: Product[] = db) {}

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async save({
    name,
    price,
    inventoryAvailability
  }: Omit<Product, "id">): Promise<Product> {
    const newProduct = new Product({
      name,
      price,
      inventoryAvailability
    });

    this.products.push(newProduct);

    return newProduct;
  }
}
