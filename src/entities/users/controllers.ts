import { Request, Response } from "express";
import { RequestWithData, ServerResponse } from "../../types";
import { UserModel } from "../../utils/factoryPattern";
import { createVerificationCode } from "../../utils/createVerificationCode";
import { sendVerificationCodeToEmail } from "../../services/resend";
import { comparePassword } from "../../utils/bcrypt";
import { createToken } from "../../utils/jwt";
import { envs } from "../../utils/envVariables";

class UserController {
  static signup = async (
    req: RequestWithData,
    res: Response<ServerResponse>
  ) => {
    try {
      const validatedData = req.validatedData;
      const user = await UserModel.getModel().signup(validatedData);
      if (typeof user !== "string") {
        res.status(400).json({
          success: false,
          message: user.error,
        });
        return;
      }

      const code = createVerificationCode();
      const result = await UserModel.getModel().updateUser({
        userId: user,
        newValues: { verificationUserCode: code },
      });
      if (!result) {
        res.status(500).json({
          success: false,
          message: "Error trying to edit user",
        });
      }

      await sendVerificationCodeToEmail({ to: validatedData.email, code });

      res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: { id: user },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  static verifiyEmail = async (req: Request, res: Response<ServerResponse>) => {
    try {
      const { verificationCode } = req.params;

      const result = await UserModel.getModel().verifyAccount(verificationCode);
      if (typeof result !== "string") {
        res.status(400).json({
          success: false,
          message: result.error,
        });
        return;
      }

      res.status(200).json({ success: true, message: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  static login = async (
    req: RequestWithData,
    res: Response<ServerResponse>
  ) => {
    try {
      const validatedData = req.validatedData;
      const user = await UserModel.getModel().getByEmail(validatedData.email);

      if (!user) {
        res.status(400).json({
          success: false,
          message: "Credenciales inválidas.",
        });
        return;
      }

      const samePass = await comparePassword(
        validatedData.password,
        user.password
      );

      if (!samePass) {
        res
          .status(400)
          .json({ success: false, message: "Credenciales inválidas." });
        return;
      }

      if(!user.verifiedUser){
        res.status(400).json({success:false, message:"Email no verificado. Ingresa a tu email para hacerlo."});
        return;
      }

      const { id, email, name, lastname } = user;

      const token = await createToken({id, email, name, lastname});

      res
        .cookie(envs.TOKEN_NAME, token, {httpOnly:true, sameSite:'strict', maxAge:15 * 24 * 60 * 60 * 1000, secure:true})
        .status(200)
        .json({
          success: true,
          message: "Logged in correctly",
          data: { id, email, name, lastname },
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
}

export default UserController;
