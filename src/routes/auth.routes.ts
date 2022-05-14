import { signInController, signUpController } from "@/useCases/Auth";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/sign-up", async (req, res) => {
  await signUpController.execute(req, res);
});

authRoutes.post("/sign-in", async (req, res) => {
  return await signInController.execute(req, res);
});

export { authRoutes };
