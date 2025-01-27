import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { User, UserAuth, UserExtended, UserSession } from "@interfaces/index";

import AuthService from "@services/auth.service";
import { handleHttp } from "@utils/index";

const { createUserAccount, loginUser, verifyAuthToken } = new AuthService();

class AuthController {
  constructor() {}

  public postUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: User = req.body;
      const newUser: UserExtended = await createUserAccount(userData);

      handleHttp<UserExtended>(
        res,
        { data: newUser, message: "¡Cuenta creada correctamente!" },
        201
      );
    } catch (e: unknown) {
      next(e);
    }
  };

  public postLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userCredentials: UserAuth = req.body;
      const userSession: UserSession = await loginUser(userCredentials);

      handleHttp<UserSession>(
        res,
        { data: userSession, message: "¡Login correcto!" },
        200
      );
    } catch (e: unknown) {
      next(e);
    }
  };

  public postVerifyToken = async (
    { headers }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token: string | undefined = headers.authorization?.split(" ").pop();

      const decodedToken = verifyAuthToken(token);

      handleHttp<JwtPayload>(
        res,
        { data: decodedToken, message: "¡Token valido!" },
        200
      );
    } catch (e: unknown) {
      next(e);
    }
  };
}

export default AuthController;
