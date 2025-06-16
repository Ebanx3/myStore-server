import { Request, Response } from "express";
import { RequestWithData, ServerResponse } from "../../types";
import { ProductsModel } from "../../utils/factoryPattern";
import { StoreModel } from "../../utils/factoryPattern";

class ProductsController {
  static getAll = async (req: Request, res: Response<ServerResponse>) => {
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
      const { storeId } = req.params;
      const { name, details, price, stock, statusVisible } = req.validatedData;

      const productId = await ProductsModel.getModel().add({
        name,
        details,
        price,
        stock,
        storeId,
        statusVisible,
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
}

export default ProductsController;
