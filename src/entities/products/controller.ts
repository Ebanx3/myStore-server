import { Request, Response } from "express";
import { RequestWithData, ServerResponse } from "../../types";
import { ProductsModel } from "../../utils/factoryPattern";
import { StoreModel } from "../../utils/factoryPattern";
import { v2 as cloudinary } from "cloudinary";
import { envs } from "../../utils/envVariables";

class ProductsController {
  static getAllByStoreId = async (req: Request, res: Response<ServerResponse>) => {
    try {
      const { storeId } = req.params;

      const store = await StoreModel.getModel().checkIfStoreExists(storeId);
      if (!store) {
        res
          .status(404)
          .json({
            success: false,
            message: "Does not exists a store with that Id",
          });
        return;
      }

      const products = await ProductsModel.getModel().getAll(storeId);

      res.status(200).json({
        success: true,
        message: "products successfully obtained",
        data: products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
      return;
    }
  };

  static getAllByStoreName = async (req: Request, res: Response<ServerResponse>) => {
    try {
      const { storeName } = req.params;

      const store = await StoreModel.getModel().getStoreByStoreName(storeName.replaceAll('_',' '));
      console.log(storeName)
      console.log(store)

      if(store === null){
        res.status(400).json({success:false, message:'Does not exists a store with that name'});
        return;
      }

      if(!store.statusActive){
        res.status(400).json({success:false, message:'Store is not active'});
        return;
      }

      const products = await ProductsModel.getModel().getAll(store.id);

      res.status(200).json({
        success: true,
        message: "products successfully obtained",
        data: products.filter(product => product.statusVisible),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
      return;
    }
  };

  static getById = async (req: Request, res: Response<ServerResponse>) => {
    try {
      const { productId } = req.params;
      const product = await ProductsModel.getModel().getById(productId);

      if (!product) {
        res.status(400).json({
          success: false,
          message: "There is not a product with that id",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Product successfully obtained",
        data: product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  static add = async (req: RequestWithData, res: Response<ServerResponse>) => {
    try {
      const { name, details, price, stock, statusVisible, picturesUrl, storeId } = req.validatedData;

      const productId = await ProductsModel.getModel().add({
        name,
        details,
        price,
        stock,
        storeId,
        statusVisible,
        picturesUrl
      });

      res.status(200).json({
        success: true,
        message: "Product successfully add to your store",
        data: productId,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  static getCloudinarySignature = async (
    req: RequestWithData,
    res: Response<ServerResponse>
  ) => {
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const folder = 'mystore/products'
      const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder },
        envs.CLOUDINARY_SECRET!,
      );

      res.status(200).json({
        success: true,
        message: "Signature successfully obtained",
        data: { timestamp, signature, folder },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
}

export default ProductsController;
