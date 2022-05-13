import { Router } from "express";

import { createProductController } from "@/useCases/CreateProduct";
import { findAllProductsController } from "@/useCases/FindAllProducts";

const productRoutes = Router();

productRoutes.get("/get/all", (req, res) => {
  return findAllProductsController.execute(req, res);
});

productRoutes.post("/set", (req, res, next) => {
  createProductController.validate(req, res, next);
  return createProductController.execute(req, res);
});

export { productRoutes };
