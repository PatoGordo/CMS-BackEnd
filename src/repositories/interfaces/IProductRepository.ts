import { Product } from "@/entities/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  save({
    name,
    price,
    inventoryAvailability
  }: Omit<Product, "id">): Promise<Product>;
}
