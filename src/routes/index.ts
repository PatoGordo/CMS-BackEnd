import { Router } from "express";
import { productRoutes } from "./product.routes";

const routes = Router();

routes.use("/product", productRoutes);

routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!"
  });
});

export { routes };
