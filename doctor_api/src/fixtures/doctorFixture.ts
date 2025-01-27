import moment from "moment";

import { DoctorExtended } from "@interfaces/index";

export const doctorFixture: DoctorExtended = {
  name: "Diego",
  lastName: "Diaz",
  email: "diego20@gmail.com",
  phone: "+57 3104993199",
  specialty: "Médico general",
  address: "Cra 10B #29-05",
  id: 1,
  createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
};
