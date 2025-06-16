import { Request } from "express";
import { User } from "./entities/users/types";

export type ServerResponse = {
    success: boolean;
    message: string;
    data?:any;
};

interface RequestWithData extends Request {
    user?: Omit<User, 'password' | 'verifiedUser'>;
    validatedData?: any;
}
