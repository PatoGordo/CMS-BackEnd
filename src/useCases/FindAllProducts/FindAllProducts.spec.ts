import { ProductRepository } from "@/repositories/implementations/ProductRepository";
import { FindAllProductsUseCase } from "./FindAllProducts.useCase";

const testRepository = new ProductRepository();
const findAllProductsUseCase = new FindAllProductsUseCase(testRepository);

test("FindAllProducts UseCase test", async () => {
  const result = await findAllProductsUseCase.execute();

  expect(result).toEqual([]);
});
