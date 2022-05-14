import { validateString } from "../validateString";

describe("Validate String", () => {
  it("Should to be valid", async () => {
    const isValid = await validateString("test", "test");

    expect(isValid).toBeUndefined();
  });

  it("Should to be failed", async () => {
    const isValid = validateString("", "test");

    await expect(isValid).rejects.toThrow(
      '"test" is a require parameter in the request.'
    );
  });

  it("Should to be all valid", async () => {
    const isValid = await validateString(["test", "pato"], ["test", "pato"]);

    expect(isValid).toBeUndefined();
  });

  it("Should to be one failed", async () => {
    const isValid = validateString(["test", ""], ["test", "pato"]);

    await expect(isValid).rejects.toThrow(
      '"pato" is a require parameter in the request.'
    );
  });
});
