import { fakeDB } from "@/databases/fake-db";
import { IUser, User } from "@/entities/User";
import { IAuthRepository } from "@/repositories/interfaces/IAuthRepository";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class FakeDBAuthRepository implements IAuthRepository {
  async signUp(user: IUser): Promise<IUser> {
    let hashedPassword = await hash(user.password, 11);

    let newUser = new User({
      ...user,
      password: hashedPassword
    });

    fakeDB.users.push(newUser);

    return newUser;
  }

  async signIn({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: IUser }> {
    const user = fakeDB.users.find((usr) => usr.email === email);

    if (!user) {
      throw new Error("Email or password is wrong");
    }

    const passwordIsSame = await compare(password, user?.password);

    if (!passwordIsSame) {
      throw new Error("Email or password is wrong");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("A unknown error has occured, try again!");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });

    return {
      token,
      user
    };
  }
  async userExists({ id }: { id: string }): Promise<boolean> {
    const user = fakeDB.users.find((usr) => usr.id === id);

    if (user) {
      return true;
    } else {
      return false;
    }
  }
  async isEmailAlreadyUsed({ email }: { email: string }): Promise<boolean> {
    const user = fakeDB.users.find((usr) => usr.email === email);

    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
