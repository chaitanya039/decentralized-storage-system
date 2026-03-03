import { v4 as uuid } from "uuid";

export const generateCID = () => {
  return "CID-" + uuid();
};