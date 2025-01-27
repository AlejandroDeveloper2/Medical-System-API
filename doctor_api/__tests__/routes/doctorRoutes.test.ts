import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../../src/app";
import { doctorFixture } from "@fixtures/doctorFixture";

const generateTestToken = () => {
  return jwt.sign({ id: "diego20@gmail.com" }, "jwt_secret_medical_system", {
    expiresIn: "48h",
  });
};

describe("Doctor enpoints", () => {
  const token = generateTestToken();

  describe("Create Doctor Endpoint", () => {
    it("should create a new doctor for an authenticated user", async () => {
      const response = await request(app)
        .post("/api/doctors")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: doctorFixture.name,
          lastName: doctorFixture.lastName,
          email: doctorFixture.email,
          phone: doctorFixture.phone,
          specialty: doctorFixture.specialty,
          address: doctorFixture.address,
        });
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("email", doctorFixture.email);
    });

    it("should return 401 for missing token", async () => {
      const response = await request(app).post("/api/doctors").send({
        name: doctorFixture.name,
        lastName: doctorFixture.lastName,
        email: doctorFixture.email,
        phone: doctorFixture.phone,
        specialty: doctorFixture.specialty,
        address: doctorFixture.address,
      });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "¡Token no proveeido!");
    });

    it("should return 403 for invalid token", async () => {
      const response = await request(app)
        .post("/api/doctors")
        .set("Authorization", "Bearer invalid_token")
        .send({
          name: doctorFixture.name,
          lastName: doctorFixture.lastName,
          email: doctorFixture.email,
          phone: doctorFixture.phone,
          specialty: doctorFixture.specialty,
          address: doctorFixture.address,
        });
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message", "¡Token invalido!");
    });
  });

  describe("Get Doctor By Id Endpoint", () => {
    it("should fetch a single doctor by ID for an authenticated user", async () => {
      const response = await request(app)
        .get("/api/doctors/1")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("id", 1);
    });

    it("should return 401 for missing token", async () => {
      const response = await request(app).get("/api/doctors/1");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "¡Token no proveeido!");
    });

    it("should return 403 for invalid token", async () => {
      const response = await request(app)
        .get("/api/doctors/1")
        .set("Authorization", "Bearer invalid_token");

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message", "¡Token invalido!");
    });
  });

  describe("Get All Doctors Endpoint", () => {
    it("should fetch all doctors", async () => {
      const response = await request(app)
        .get("/api/doctors")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return 401 for missing token", async () => {
      const response = await request(app).get("/api/doctors");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "¡Token no proveeido!");
    });

    it("should return 403 for invalid token", async () => {
      const response = await request(app)
        .get("/api/doctors")
        .set("Authorization", "Bearer invalid_token");

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message", "¡Token invalido!");
    });
  });

  describe("Update Doctor Endpoint", () => {
    it("should update a doctor", async () => {
      const response = await request(app)
        .put("/api/doctors/1")
        .send({
          name: doctorFixture.name,
          lastName: doctorFixture.lastName,
          email: doctorFixture.email,
          phone: doctorFixture.phone,
          address: doctorFixture.address,
          specialty: "Neurology",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("specialty", "Neurology");
    });

    it("should return 401 for missing token", async () => {
      const response = await request(app)
        .put("/api/doctors/1")
        .send({ specialty: "Neurology" });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "¡Token no proveeido!");
    });

    it("should return 403 for invalid token", async () => {
      const response = await request(app)
        .put("/api/doctors/1")
        .set("Authorization", "Bearer invalid_token")
        .send({ specialty: "Neurology" });

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message", "¡Token invalido!");
    });
  });

  describe("Delete Doctor Endpoint", () => {
    it("should delete a doctor", async () => {
      const response = await request(app)
        .delete("/api/doctors/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("id");
    });

    it("should return 401 for missing token", async () => {
      const response = await request(app).delete("/api/doctors/1");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "¡Token no proveeido!");
    });

    it("should return 403 for invalid token", async () => {
      const response = await request(app)
        .delete("/api/doctors/1")
        .set("Authorization", "Bearer invalid_token");
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message", "¡Token invalido!");
    });
  });
});
