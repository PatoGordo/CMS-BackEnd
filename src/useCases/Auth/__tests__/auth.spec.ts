import { fakeDB } from "@/databases/fake-db";
import { FakeDBAuthRepository } from "@/repositories/implementations/fake/FakeDBAuthRepository";
import { EmailExistsUseCase } from "../EmailExists/EmailExists.useCase";
import { SignInUseCase } from "../SignIn/SignInUseCase";
import { SignUpUseCase } from "../SignUp/SignUp.useCase";
import { UserExistsUseCase } from "../UserExists/UserExists.useCase";

describe("Auth Tests", () => {
  const repository = new FakeDBAuthRepository();

  it("Sign Up correctly", async () => {
    const signUpUseCase = new SignUpUseCase(repository);

    const newUser = await signUpUseCase.execute({
      email: "test@test.com",
      name: "Test",
      password: "test"
    });

    expect(newUser).toEqual(fakeDB.users[0]);
  });

  it("Sign In correctly", async () => {
    fakeDB.users.push({
      id: "627ef20f841af8bf9713c6d6",
      email: "test@test.com",
      name: "Test",
      password: "$2a$11$GB887dxoyHxo6fZ/PWjSNenNob8UmCoUj7.9MnrANpUBBXk5ckS8m"
    });

    const signInUseCase = new SignInUseCase(repository);

    const user = await signInUseCase.execute({
      email: "test@test.com",
      password: "test"
    });

    expect(user.user).toEqual(fakeDB.users[0]);
  });

  it("Email exists", async () => {
    fakeDB.users.push({
      id: "627ef20f841af8bf9713c6d6",
      email: "test@test.com",
      name: "Test",
      password: "$2a$11$GB887dxoyHxo6fZ/PWjSNenNob8UmCoUj7.9MnrANpUBBXk5ckS8m"
    });

    const emailExistsUseCase = new EmailExistsUseCase(repository);

    const isEmailExists = await emailExistsUseCase.execute({
      email: "test@test.com"
    });

    expect(isEmailExists).toEqual(true);
  });

  it("User exists", async () => {
    fakeDB.users.push({
      id: "627ef20f841af8bf9713c6d6",
      email: "test@test.com",
      name: "Test",
      password: "$2a$11$GB887dxoyHxo6fZ/PWjSNenNob8UmCoUj7.9MnrANpUBBXk5ckS8m"
    });

    const userExistsUseCase = new UserExistsUseCase(repository);

    const userExists = await userExistsUseCase.execute({
      id: "627ef20f841af8bf9713c6d6"
    });

    expect(userExists).toEqual(true);
  });
});
