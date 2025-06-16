import { Request, Response } from "express";
import { RequestWithData, ServerResponse } from "../../types";
import { StoreModel } from "../../utils/factoryPattern";

class StoresController {
  static create = async (
    req: RequestWithData,
    res: Response<ServerResponse>
  ) => {
    try {
      const ownerId = req.user!.id;
      const { name, maxProducts } = req.validatedData;

      const storeId = await StoreModel.getModel().create(
        name,
        ownerId,
        maxProducts
      );

      if(!storeId){
        res.status(400).json({
          success:false,
          message:'Error trying to create the store.',
          data: 'StoreName is aleady used' 
        });
        return;
      }

      res
        .status(200)
        .json({
          success: true,
          message: "Store created succesfully",
          data: storeId,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
}

export default StoresController;