import jwt, { JwtPayload } from "jsonwebtoken";

import { User, UserAuth, UserExtended, UserSession } from "@interfaces/index";
import prisma from "@config/PrismaClient";

import {
  AppError,
  Bcrypt,
  handlePrismaError,
  hasAllProperties,
  JwtToken,
} from "@utils/index";

class AuthService {
  constructor() {}

  public createUserAccount = async (userData: User): Promise<UserExtended> => {
    try {
      if (!hasAllProperties(userData))
        throw new AppError(
          400,
          "¡Faltan datos del usuario que son obligatorios!"
        );

      const bcrypt = new Bcrypt(userData.password, 8);

      const user: UserExtended | null = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (user)
        throw new AppError(
          400,
          "¡Ya existe un usuario con ese nombre de usuario o/y email!"
        );

      const encryptedPassword: string = await bcrypt.encryptPassword();

      const newUser: UserExtended = await prisma.user.create({
        data: {
          ...userData,
          password: encryptedPassword,
        },
      });
      return newUser;
    } catch (e: unknown) {
      console.log(e);
      return handlePrismaError(
        e,
        "¡Ha ocurrido un error al intentar crear la cuenta!"
      );
    }
  };

  public loginUser = async (
    userCredentials: UserAuth
  ): Promise<UserSession> => {
    const bcrypt = new Bcrypt(userCredentials.password, 8);
    const jwt = new JwtToken(userCredentials.email);

    try {
      const user: User | null = await prisma.user.findUnique({
        where: { email: userCredentials.email },
      });

      if (!user)
        throw new AppError(404, "¡No existe un usuario con esas credenciales!");

      const encryptedPassword: string = user.password;
      const isPasswordCorrect: boolean = await bcrypt.verifyEncryptedPass(
        encryptedPassword
      );

      if (!isPasswordCorrect)
        throw new AppError(403, "¡La contraseña ingresada es incorrecta!");

      const sessionToken: string = jwt.generateSessionToken();

      return {
        sessionToken,
      };
    } catch (e: unknown) {
      return handlePrismaError(
        e,
        "¡Ha ocurrido un error al intentar iniciar sesión!"
      );
    }
  };

  public verifyAuthToken = (token: string | undefined): JwtPayload => {
    try {
      if (!token) throw new AppError(401, "¡Token no proveeido!");
      const decoded = jwt.verify(
        token,
        <string>process.env.JWT_SECRET
      ) as JwtPayload;
      return decoded;
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError)
        throw new AppError(403, "¡El token ha expirado!");
      else if (error instanceof jwt.JsonWebTokenError)
        throw new AppError(403, "¡Token invalido!");
      else
        return handlePrismaError(
          error,
          "¡Ha ocurrido un error al intentar validar el token!"
        );
    }
  };
}

export default AuthService;
