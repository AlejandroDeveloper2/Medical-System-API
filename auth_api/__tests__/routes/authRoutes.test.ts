import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../../src/app";
import { userFixture } from "@fixtures/userFixture";

const generateTestToken = () => {
  return jwt.sign({ id: "alejo98@gmail.com" }, "jwt_secret_medical_system", {
    expiresIn: "48h",
  });
};

describe("Auth Endpoints", () => {
  describe("Create user account endpoint", () => {
    it("should create a new a user account", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: userFixture.name,
        lastName: userFixture.lastName,
        email: userFixture.email,
        userName: userFixture.userName,
        password: userFixture.password,
      });
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("email", userFixture.email);
    });

    it("should return 400 for a taken email or username", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: userFixture.name,
        lastName: userFixture.lastName,
        email: userFixture.email,
        userName: userFixture.userName,
        password: userFixture.password,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "¡Ya existe un usuario con ese nombre de usuario o/y email!"
      );
    });
  });

  describe("Login user endpoint", () => {
    it("should login a user that is already registered", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: userFixture.email,
        password: userFixture.password,
      });
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("sessionToken");
    });

    it("should return 404 If the user is not registered", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "noregistereduser@gmail.com",
        password: userFixture.password,
      });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty(
        "message",
        "¡No existe un usuario con esas credenciales!"
      );
    });

    it("should return 403 If the user enters a wrong password", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: userFixture.email,
        password: "wrongPassword",
      });
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty(
        "message",
        "¡La contraseña ingresada es incorrecta!"
      );
    });
  });

  describe("Verify token endpoint", () => {
    const token: string = generateTestToken();
    it("should return a decoded token, if the token is valid", async () => {
      const response = await request(app)
        .post("/api/auth/verify")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("id");
    });

    it("should return 401 when the token is not provied", async () => {
      const response = await request(app).post("/api/auth/verify");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "¡Token no proveeido!");
    });

    it("should return 403 when the token is invalid", async () => {
      const invalidToken: string = "invalid_token";
      const response = await request(app)
        .post("/api/auth/verify")
        .set("Authorization", `Bearer ${invalidToken}`);
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message", "¡Token invalido!");
    });
  });
});
