import { v4 } from "uuid";

export class Product {
  id: string;
  name: string;
  price: number;
  inventoryAvailability: number;

  constructor({ name, price, inventoryAvailability }: Omit<Product, "id">) {
    this.id = v4();
    this.name = name;
    this.price = price;
    this.inventoryAvailability = inventoryAvailability;
  }
}
