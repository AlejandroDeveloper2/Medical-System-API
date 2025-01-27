import { Doctor } from "@interfaces/index";

export function hasAllProperties(obj: any): obj is Doctor {
  const expectedKeys = [
    "name",
    "lastName",
    "email",
    "phone",
    "specialty",
    "address",
  ];
  const objKeys = Object.keys(obj);
  return expectedKeys.every((key) => objKeys.includes(key));
}
