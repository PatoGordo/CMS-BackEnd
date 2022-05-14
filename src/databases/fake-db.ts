import { ICMS } from "@/entities/CMS";
import { IUser } from "@/entities/User";

export const fakeDB: { users: IUser[]; cms: ICMS[] } = {
  users: [],
  cms: []
};
