import { Router } from "express";

import DoctorsController from "@controllers/doctors.controller";

import authMiddleware from "@middleware/auth.middleware";

const router = Router();

const { postDoctor, getDoctor, getDoctors, updateDoctor, deleteDoctor } =
  new DoctorsController();

router
  .post("/", authMiddleware, postDoctor)
  .get("/:doctorId", authMiddleware, getDoctor)
  .get("/", authMiddleware, getDoctors)
  .put("/:doctorId", authMiddleware, updateDoctor)
  .delete("/:doctorId", authMiddleware, deleteDoctor);

export { router };
