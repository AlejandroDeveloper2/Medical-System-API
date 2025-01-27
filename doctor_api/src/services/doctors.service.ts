import moment from "moment";

import { Doctor, DoctorExtended } from "@interfaces/.";

import prisma from "@config/PrismaClient";

import { AppError, handlePrismaError, hasAllProperties } from "@utils/.";

class DoctorsService {
  constructor() {}

  public createNewDoctor = async (
    newDoctorData: Doctor
  ): Promise<DoctorExtended> => {
    const { name, lastName, email, phone, specialty, address } = newDoctorData;
    try {
      if (!hasAllProperties(newDoctorData))
        throw new AppError(
          400,
          "¡Faltan datos del médico que son obligatorios!"
        );

      const newDoctor: DoctorExtended = await prisma.doctor.create({
        data: {
          name,
          lastName,
          email,
          phone,
          specialty,
          address,
          createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        },
      });
      return newDoctor;
    } catch (e: unknown) {
      return handlePrismaError(
        e,
        "¡Hubo un error al agregar al médico a la base de datos!",
        "¡Ya existe un medico con ese correo o teléfono en la base de datos!"
      );
    }
  };

  public getSingleDoctorProfile = async (
    doctorId: number
  ): Promise<DoctorExtended> => {
    try {
      const doctor: DoctorExtended | null = await prisma.doctor.findUnique({
        where: { id: doctorId },
      });
      if (!doctor)
        throw new AppError(
          404,
          "¡Médico no fue encontrado, verifique si el Id es el correcto!"
        );
      return doctor;
    } catch (e: unknown) {
      return handlePrismaError(
        e,
        "¡Hubo un error al obtener el perfil del médico!"
      );
    }
  };

  public getAllDoctors = async (): Promise<DoctorExtended[]> => {
    try {
      const doctors: DoctorExtended[] = await prisma.doctor.findMany();
      return doctors;
    } catch (e: unknown) {
      return handlePrismaError(
        e,
        "¡Hubo un error al obtener el listado de médicos!"
      );
    }
  };

  public modifyDoctorProfile = async (
    doctorId: number,
    updateDoctorData: Doctor
  ): Promise<DoctorExtended> => {
    try {
      if (!hasAllProperties(updateDoctorData))
        throw new AppError(
          400,
          "¡Faltan datos del médico que son obligatorios!"
        );

      const userExists = await prisma.doctor.findUnique({
        where: { id: doctorId },
      });

      if (!userExists) {
        throw new AppError(
          404,
          "¡Médico no fue encontrado, verifique si el Id es el correcto!"
        );
      }

      const updatedDoctor: DoctorExtended = await prisma.doctor.update({
        where: { id: doctorId },
        data: updateDoctorData,
      });

      return updatedDoctor;
    } catch (e: unknown) {
      return handlePrismaError(
        e,
        "Ha ocurrido un error al actualizar el perfil del médico!",
        "¡El email o teléfono del médico ya esta en uso!"
      );
    }
  };

  public removeDoctorProfile = async (
    doctorId: number
  ): Promise<DoctorExtended> => {
    try {
      const deletedDoctor: DoctorExtended = await prisma.doctor.delete({
        where: { id: doctorId },
      });

      return deletedDoctor;
    } catch (e: unknown) {
      return handlePrismaError(
        e,
        "¡Ha ocurrido un error al eliminar el perfil del médico!",
        "¡Médico no fue encontrado, verifique si el Id es el correcto!"
      );
    }
  };
}

export default DoctorsService;
