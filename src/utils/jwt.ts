import jwt from "jsonwebtoken";
import { envs } from "./envVariables";
import { User } from "../entities/users/types";

const createToken = ({ name, lastname, id, email }: Omit<User, 'password' | 'verifiedUser'>) => {
  try {
    return jwt.sign(
      {
        name,
        lastname,
        id,
        email,
      },
      envs.TOKEN_SECRET_KEY,
      {
        expiresIn: envs.TOKEN_EXPIRATION_TIME,
      }
    );
  } catch (error) {
    throw Error("Error creating the token");
  }
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, envs.TOKEN_SECRET_KEY);
  } catch (error) {
    return null;
  }
};

export { createToken, verifyToken };
