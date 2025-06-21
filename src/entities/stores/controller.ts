import { Request, Response } from "express";
import { RequestWithData, ServerResponse } from "../../types";
import { StoreModel } from "../../utils/factoryPattern";

class StoresController {
  static create = async (
    req: RequestWithData,
    res: Response<ServerResponse>
  ) => {
    try {
      const userId = req.user!.id;
      const { name, maxProducts } = req.validatedData;

      const storeId = await StoreModel.getModel().create(
        name,
        userId,
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

  static getStoresByUserId = async ( req: RequestWithData,
    res: Response<ServerResponse>) => {
    try{
      console.log('llego una peticin')
      const userId = req.user!.id;
      console.log('userId',userId)
      const stores = await StoreModel.getModel().getStoresByUserId(userId);

      res.status(200).json({
        success:true,
        message:"Stores obtained",
        data:stores
      })

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}

export default StoresController;