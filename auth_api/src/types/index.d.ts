import { JwtPayload } from "jsonwebtoken";

interface ServerResponse<T> {
  data: T;
  message: string;
}

interface User {
  email: string;
  userName: string;
  name: string;
  lastName: string;
  password: string;
}

interface UserExtended extends User {
  id: number;
}

interface UserAuth {
  email: string;
  password: string;
}

interface UserSession {
  sessionToken: string;
}

export type { ServerResponse, User, UserExtended, UserAuth, UserSession };
