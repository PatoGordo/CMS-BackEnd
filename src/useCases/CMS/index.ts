import { MongoDBCMSRepository } from "@/repositories/implementations/mongo/MongoDBCMSRepository";
import { CreateCMSController } from "./CreateCMS/CreateCMS.controller";
import { CreateCMSUseCase } from "./CreateCMS/CreateCMS.useCase";
import { GetCMSDataController } from "./GetCMSData/GetCMSData.controller";
import { GetCMSDataUseCase } from "./GetCMSData/GetCMSData.useCase";
import { GetCMSStructureController } from "./GetCMSStructure/GetCMSStructure.controller";
import { GetCMSStructureUseCase } from "./GetCMSStructure/GetCMSStructure.useCase";
import { GetUserCMSsController } from "./GetUserCMSs/GetUserCMSs.controller";
import { GetUserCMSsUseCase } from "./GetUserCMSs/GetUserCMSs.useCase";
import { InsertCMSDataController } from "./InsertCMSData/InsertCMSData.controller";
import { InsertCMSDataUseCase } from "./InsertCMSData/InsertCMSData.useCase";
import { ValidateAPIKeyUseCase } from "./ValidateAPIKey/ValidateAPIKey.useCase";
import { ValidateDataToStructureUseCase } from "./ValidateDataToStructure/ValidateDataToStructure.useCase";

const repository = new MongoDBCMSRepository();

export const createCMSUseCase = new CreateCMSUseCase(repository);
export const getUserCMSsUseCase = new GetUserCMSsUseCase(repository);
export const getCMSDataUseCase = new GetCMSDataUseCase(repository);
export const getCMSStructureUseCase = new GetCMSStructureUseCase(repository);
export const insertCMSDataUseCase = new InsertCMSDataUseCase(repository);
export const validateAPIKeyUseCase = new ValidateAPIKeyUseCase(repository);
export const validateDataToStructureUseCase =
  new ValidateDataToStructureUseCase(repository);

export const createCMSController = new CreateCMSController(createCMSUseCase);
export const getUserCMSsController = new GetUserCMSsController(
  getUserCMSsUseCase
);
export const getCMSDataController = new GetCMSDataController(
  getCMSDataUseCase,
  validateAPIKeyUseCase
);
export const getCMSStructureController = new GetCMSStructureController(
  getCMSStructureUseCase,
  validateAPIKeyUseCase
);
export const insertCMSDataController = new InsertCMSDataController(
  insertCMSDataUseCase,
  validateAPIKeyUseCase,
  validateDataToStructureUseCase
);
