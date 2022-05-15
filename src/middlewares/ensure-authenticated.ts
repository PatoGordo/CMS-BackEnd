import { DefaultError } from "@/types/error";
import { userExistsUseCase } from "@/useCases/Auth";
import { Request, Response, NextFunction } from "express";
import { validateString } from "@/utils/validateString";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const headerTOKEN = req.headers.authorization;

  if (!headerTOKEN || !headerTOKEN?.split("Bearer")[1]) {
    return res.status(400).json({
      message: "This isn't a valid user!"
    });
  }

  let token = headerTOKEN?.split("Bearer")[1].trim();

  await validateString(token, "token");

  token = token as string;

  if (!process.env.JWT_SECRET) {
    throw new Error("A unknown error has occured, try again!");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = data as TokenPayload;

    const result = await userExistsUseCase.execute({ id });

    if (result === false) {
      return res.status(400).json({
        message: "This isn't a valid user!"
      });
    }

    req.uid = id;

    next();
  } catch (err) {
    if ((err as Error).message === "jwt expired") {
      return res.status(440).json({
        message: "Your session has expired, please login again!"
      });
    }

    return res.status(400).json({
      message: (err as DefaultError).message
    });
  }
}
