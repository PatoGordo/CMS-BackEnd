import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { cmsRoutes } from "./cms.routes";

const routes = Router();

routes.use("/auth/", authRoutes);
routes.use("/cms/", cmsRoutes);

routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!"
  });
});

routes.get("/protected", ensureAuthenticated, (req, res) => {
  return res.status(200).json({
    message: "Secret Message"
  });
});

export { routes };
