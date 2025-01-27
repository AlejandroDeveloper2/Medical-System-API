import { Response, NextFunction } from "express";
import axios from "axios";

import { RequestExtended } from "@interfaces/index";

import { handleAxiosError, handleHttp } from "@utils/index";

const AUTH_SERVICE_URL = `${process.env.AUTH_MICROSERVICE_URL}/verify`;

const authMiddleware = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtByUser = req.headers.authorization || null;
    const token = jwtByUser?.split(" ").pop();

    if (!token) {
      handleHttp(
        res,
        {
          data: null,
          message: "¡Token no proveeido!",
        },
        401
      );
      return;
    }

    const response = await axios.post(
      AUTH_SERVICE_URL,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    req.user = response.data.data.decoded;
    next();
  } catch (e: unknown) {
    handleAxiosError(e, res);
  }
};

export default authMiddleware;
