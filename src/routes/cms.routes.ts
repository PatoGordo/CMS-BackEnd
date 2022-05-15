import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import {
  createCMSController,
  getCMSDataController,
  getCMSStructureController,
  insertCMSDataController
} from "@/useCases/CMS";
import { Router } from "express";

const cmsRoutes = Router();

cmsRoutes.post("/create", ensureAuthenticated, async (req, res) => {
  await createCMSController.execute(req, res);
});

cmsRoutes.post("/get-data/:api_key", async (req, res) => {
  await getCMSDataController.execute(req, res);
});

cmsRoutes.post("/get-structure/:api_key", async (req, res) => {
  await getCMSStructureController.execute(req, res);
});

cmsRoutes.post("/insert-data/:api_key", async (req, res) => {
  await insertCMSDataController.execute(req, res);
});

export { cmsRoutes };
