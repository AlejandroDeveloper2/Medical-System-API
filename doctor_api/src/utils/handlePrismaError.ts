import { Prisma } from "@prisma/client";

import { AppError } from ".";

export const handlePrismaError = (
  error: unknown,
  defaultMessage: string,
  customMessage: string = ""
) => {
  /** Errors from Prisma */
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new AppError(400, customMessage);
      case "P2025":
        throw new AppError(404, customMessage);
      default:
        throw new AppError(500, defaultMessage);
    }
  }

  /** Custom Errors */
  if (error instanceof AppError) {
    throw new AppError(error.code, error.message);
  }
  /** Unexpected and Unknown error */
  throw new AppError(500, defaultMessage);
};
