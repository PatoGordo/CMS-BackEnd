import { MongoDBCMSRepository } from "@/repositories/implementations/mongo/MongoDBCMSRepository";
import { CreateCMSUseCase } from "./CreateCMS/CreateCMS.useCase";
import { GetCMSDataUseCase } from "./getCMSData/getCMSData.useCase";
import { GetCMSStructureUseCase } from "./getCMSStructure/getCMSStructure.useCase";
import { InsertCMSDataUseCase } from "./InsertCMSData/InsertCMSData.useCase";
import { ValidateDataToStructureUseCase } from "./validateDataToStructure/validateDataToStructure.useCase";

const repository = new MongoDBCMSRepository();

export const createCMSUseCase = new CreateCMSUseCase(repository);
export const getCMSDataUseCase = new GetCMSDataUseCase(repository);
export const getCMSStructureUseCase = new GetCMSStructureUseCase(repository);
export const insertCMSDataUseCase = new InsertCMSDataUseCase(repository);
export const validateDataToStructureUseCase =
  new ValidateDataToStructureUseCase(repository);
