import { NextFunction, Request, Response } from "express";

import { Doctor, DoctorExtended } from "@interfaces/index";

import { handleHttp } from "@utils/index";
import DoctorsService from "@services/doctors.service";

const {
  createNewDoctor,
  getSingleDoctorProfile,
  getAllDoctors,
  modifyDoctorProfile,
  removeDoctorProfile,
} = new DoctorsService();

class DoctorsController {
  constructor() {}

  public postDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const doctor: Doctor = req.body;
      const addedDoctor: DoctorExtended = await createNewDoctor(doctor);
      handleHttp<DoctorExtended>(
        res,
        { data: addedDoctor, message: "¡Médico agregado correctamente!" },
        201
      );
    } catch (e: unknown) {
      next(e);
    }
  };

  public getDoctor = async (
    { params }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const doctorId: number = parseInt(params.doctorId);

      const doctorProfile: DoctorExtended = await getSingleDoctorProfile(
        doctorId
      );

      handleHttp<DoctorExtended>(
        res,
        {
          data: doctorProfile,
          message: "¡Perfil del médico obtenido correctamente!",
        },
        200
      );
    } catch (e: unknown) {
      next(e);
    }
  };

  public getDoctors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const doctors: DoctorExtended[] = await getAllDoctors();

      handleHttp<DoctorExtended[]>(
        res,
        {
          data: doctors,
          message: "¡Listado de médicos obtenido correctamente!",
        },
        200
      );
    } catch (e: unknown) {
      next(e);
    }
  };

  public updateDoctor = async (
    { params, body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const doctorId: number = parseInt(params.doctorId);
      const updatedDoctorData: Doctor = body;

      const updatedDoctor: DoctorExtended = await modifyDoctorProfile(
        doctorId,
        updatedDoctorData
      );

      handleHttp<DoctorExtended>(
        res,
        {
          data: updatedDoctor,
          message: "¡Perfil del médico actualizado correctamente!",
        },
        200
      );
    } catch (e: unknown) {
      next(e);
    }
  };

  public deleteDoctor = async (
    { params }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const doctorId: number = parseInt(params.doctorId);

      const deletedDoctor: DoctorExtended = await removeDoctorProfile(doctorId);

      handleHttp<DoctorExtended>(
        res,
        {
          data: deletedDoctor,
          message: "¡Perfil del médico eliminado correctamente!",
        },
        200
      );
    } catch (e: unknown) {
      next(e);
    }
  };
}

export default DoctorsController;
