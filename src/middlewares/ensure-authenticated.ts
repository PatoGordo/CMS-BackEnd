import { DefaultError } from "@/types/error";
import { userExistsUseCase } from "@/useCases/Auth";
import { Request, Response, NextFunction } from "express";
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

  const token = headerTOKEN?.split("Bearer")[1].trim();

  if (!token || token.trim() === "") {
    return res.status(400).json({
      message: '"token" é um parametro obrigatorio na requisição'
    });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("A unknown error has occured, try again!");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = data as TokenPayload;

    const result = await userExistsUseCase.execute({ id });

    if (result === false) {
      return res.status(400).json({
        message: "Esse não é um usuário valido!"
      });
    }

    req.uid = id;

    next();
  } catch (err) {
    if ((err as Error).message === "invalid token") {
      return res.status(440).json({
        message: "Sua sessão expirou, faça login novamente e tente de novo!"
      });
    }

    return res.status(400).json({
      message: (err as DefaultError).message
    });
  }
}
