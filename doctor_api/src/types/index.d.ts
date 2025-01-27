import { Request } from "express";

interface ServerResponse<T> {
  data: T;
  message: string;
}

interface ErrorResponse extends ServerResponse<null> {
  super();
}

interface Doctor {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  address: string;
}

interface DoctorExtended extends Doctor {
  id: number;
  createdAt: string;
}

interface RequestExtended extends Request {
  user?: JwtPayload | string;
}

export type {
  ServerResponse,
  ErrorResponse,
  Doctor,
  DoctorExtended,
  RequestExtended,
};
