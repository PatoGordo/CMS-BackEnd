import { fakeDB } from "@/databases/fake-db";
import { FakeDBCMSRepository } from "@/repositories/implementations/fake/FakeDBCMSRepository";
import { CreateCMSUseCase } from "../CreateCMS/CreateCMS.useCase";
import { GetCMSDataUseCase } from "../GetCMSData/GetCMSData.useCase";
import { GetCMSStructureUseCase } from "../GetCMSStructure/GetCMSStructure.useCase";
import { GetUserCMSsUseCase } from "../GetUserCMSs/GetUserCMSs.useCase";
import { InsertCMSDataUseCase } from "../InsertCMSData/InsertCMSData.useCase";
import { ValidateAPIKeyUseCase } from "../ValidateAPIKey/ValidateAPIKey.useCase";
import { ValidateDataToStructureUseCase } from "../ValidateDataToStructure/ValidateDataToStructure.useCase";

describe("CMS Tests", () => {
  const repository = new FakeDBCMSRepository();

  it("Create a CMS correctly", async () => {
    const createCMSUseCase = new CreateCMSUseCase(repository);

    const res = await createCMSUseCase.execute({
      name: "News Letter",
      structure: {
        email: {
          type: "string",
          name: "email"
        }
      },
      owner_id: "1231231"
    });

    expect(res).toEqual(fakeDB.cms[0]);
  });

  it("Insert data into CMS", async () => {
    fakeDB.cms.push({
      name: "News Letter",
      owner_id: "1231231",
      authorized_urls: [],
      api_key: "12d76d74-f5a4-47a6-9f97-6cb5a6aa8ce7",
      data: [],
      structure: { email: { type: "string", name: "email" } },
      id: "627fb2ffc2cd1ca696312eaa"
    });

    const insertCMSDataUseCase = new InsertCMSDataUseCase(repository);

    const newData = await insertCMSDataUseCase.execute({
      id: "627fb2ffc2cd1ca696312eaa",
      data: { email: "test@test.com" }
    });

    expect(newData).toEqual(fakeDB.cms[0].data![0]);
  });

  it("Get data from a cms", async () => {
    fakeDB.cms = [
      {
        name: "News Letter",
        owner_id: "1231231",
        authorized_urls: [],
        api_key: "12d76d74-f5a4-47a6-9f97-6cb5a6aa8ce7",
        data: [{ email: "test@test.com" }],
        structure: { email: { type: "string", name: "email" } },
        id: "627fb2ffc2cd1ca696312eaa"
      }
    ];

    const getCMSDataUseCase = new GetCMSDataUseCase(repository);

    const data = await getCMSDataUseCase.execute({
      id: "627fb2ffc2cd1ca696312eaa"
    });

    expect(data).toEqual(fakeDB.cms[0].data);
  });

  it("Get the structure of a cms", async () => {
    fakeDB.cms.push({
      name: "News Letter",
      owner_id: "1231231",
      authorized_urls: [],
      api_key: "12d76d74-f5a4-47a6-9f97-6cb5a6aa8ce7",
      data: [],
      structure: { email: { type: "string", name: "email" } },
      id: "627fb2ffc2cd1ca696312eaa"
    });

    const getCMSStructureUseCase = new GetCMSStructureUseCase(repository);

    const structure = await getCMSStructureUseCase.execute({
      id: "627fb2ffc2cd1ca696312eaa"
    });

    expect(structure).toEqual(fakeDB.cms[0].structure);
  });

  it("Validate data to structure as valid", async () => {
    const validateDataToStructureUseCase = new ValidateDataToStructureUseCase(
      repository
    );

    const res = await validateDataToStructureUseCase.execute({
      id: "627fb2ffc2cd1ca696312eaa",
      data: {
        email: "test@test.com"
      }
    });

    expect(res).toEqual({ email: "test@test.com" });
  });

  it("Validate data to structure as invalid", async () => {
    const validateDataToStructureUseCase = new ValidateDataToStructureUseCase(
      repository
    );

    const res = validateDataToStructureUseCase.execute({
      id: "627fb2ffc2cd1ca696312eaa",
      data: {
        email: 2
      }
    });

    expect(res).rejects.toThrow(
      '"email" field doesn\'t follow the structure definitions.'
    );
  });

  it("Api key should to be valid", async () => {
    const id = "627fb2ffc2cd1ca696312eaa";
    const api_key = "12d76d74-f5a4-47a6-9f97-6cb5a6aa8ce7";

    fakeDB.cms.push({
      name: "News Letter",
      owner_id: "1231231",
      authorized_urls: [],
      api_key,
      data: [],
      structure: { email: { type: "string", name: "email" } },
      id
    });

    const validateAPIKeyUseCase = new ValidateAPIKeyUseCase(repository);

    const res = await validateAPIKeyUseCase.execute({
      id,
      api_key
    });

    expect(res).toEqual(true);
  });

  it("Api key should to be invalid", async () => {
    const id = "627fb2ffc2cd1ca696312eaa";

    fakeDB.cms = [
      {
        name: "News Letter",
        owner_id: "1231231",
        authorized_urls: [],
        api_key: "12312312312312312",
        data: [],
        structure: { email: { type: "string", name: "email" } },
        id
      }
    ];

    const validateAPIKeyUseCase = new ValidateAPIKeyUseCase(repository);

    const res = await validateAPIKeyUseCase.execute({
      id,
      api_key: "12d76d74-f5a4-47a6-9f97-6cb5a6aa8ce7"
    });

    expect(res).toEqual(false);
  });

  it("Get User CMSs", async () => {
    fakeDB.cms = [
      {
        name: "News Letter",
        owner_id: "1231231",
        authorized_urls: [],
        api_key: "12312312312312312",
        data: [],
        structure: { email: { type: "string", name: "email" } },
        id: "123123"
      },
      {
        name: "News Letter 2",
        owner_id: "1231231",
        authorized_urls: [],
        api_key: "123123123123aasdasda12312",
        data: [],
        structure: { email: { type: "string", name: "email" } },
        id: "123"
      }
    ];

    const useCase = new GetUserCMSsUseCase(repository);

    const res = await useCase.execute({ uid: "1231231" });

    expect(res.length).toEqual(2);
  });
});
