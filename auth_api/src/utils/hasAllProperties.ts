import { User } from "@interfaces/index";

export function hasAllProperties(obj: any): obj is User {
  const expectedKeys = ["name", "lastName", "email", "userName", "password"];
  const objKeys = Object.keys(obj);
  return expectedKeys.every((key) => objKeys.includes(key));
}
