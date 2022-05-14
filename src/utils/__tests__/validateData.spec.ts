import { validateDataToStructure } from "../validateData";

describe("Validate Data Tests", () => {
  let strucure = {
    email: {
      type: "string",
      name: "email"
    }
  };

  it("Should to be valid", async () => {
    const data = { email: "test@test.com" };

    let res = await validateDataToStructure(strucure, data);

    expect(res).toEqual(data);
  });

  it("Should to be invalid", async () => {
    const data = { email: 1237 };

    let res = validateDataToStructure(strucure, data);

    await expect(res).rejects.toThrow('"email" have erros in the composition.');
  });
});
