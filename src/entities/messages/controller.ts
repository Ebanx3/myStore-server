import { Request, Response } from "express";
import { RequestWithData, ServerResponse } from "../../types";
import { MessageModel } from "../../utils/factoryPattern";

class MessagesController {
  static getAllByProductId = async (
    req: Request,
    res: Response<ServerResponse>
  ) => {
    try {
      const { productId } = req.params;

      const messages = await MessageModel.getModel().getAllByProductId(
        productId
      );

      res.status(200).json({
        success: true,
        message: "products successfully obtained",
        data: messages,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
      return;
    }
  };

  static create = async (
    req: RequestWithData,
    res: Response<ServerResponse>
  ) => {
    try {
      const userName = req.user!.name;
      const userLastname = req.user!.lastname;
      const { productId, content } = req.validatedData;

      const message = await MessageModel.getModel().create({
        productId,
        content,
        author: `${userName} ${userLastname}`,
      });

      res.status(200).json({
        success: true,
        message: "products successfully obtained",
        data: message,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
      return;
    }
  };
}

export default MessagesController;
