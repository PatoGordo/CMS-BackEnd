import { CreateProductUseCase } from "./CreateProduct.useCase";
import { ProductRepository } from "@/repositories/implementations/ProductRepository";

const testRepository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(testRepository);

test("CreateProduct UseCase tests", async () => {
  const result = await createProductUseCase.execute({
    name: "Test Product",
    price: 3000,
    inventoryAvailability: 5
  });

  expect(result.name).toEqual("Test Product");
  expect(result.price).toEqual(3000);
  expect(result.inventoryAvailability).toEqual(5);
  // 36 -> uuid length
  expect(result.id.length).toEqual(36);
});
