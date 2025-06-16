import { hash, compare } from "bcrypt";

export const hashPassword = async (pass: string): Promise<string | null> => {
  return await hash(pass, 10);
};

export const comparePassword = async (
  pass: string,
  storedPass: string
): Promise<boolean> => {
  return await compare(pass, storedPass);
};
