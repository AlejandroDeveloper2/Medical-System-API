import { Router } from "express";

import AuthController from "@controllers/auth.controller";

const router = Router();

const { postLogin, postUser, postVerifyToken } = new AuthController();

router
  .post("/login", postLogin)
  .post("/register", postUser)
  .post("/verify", postVerifyToken);

export { router };
