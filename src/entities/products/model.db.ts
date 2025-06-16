import { StoreId } from "../stores/types";
import {
  EditableProductProperties,
  Product,
  ProductId,
  ProductModel,
} from "./types";

class DBRenderModel implements ProductModel {
  private static instance: DBRenderModel;
  private constructor() {}
  public static getInstance() {
    if (DBRenderModel.instance === undefined)
      DBRenderModel.instance = new DBRenderModel();
    return DBRenderModel.instance;
  }

  getAll: (storeId: StoreId) => Promise<Product[]>;
  getById: (id: ProductId) => Promise<Product | null>;
  add: (newProduct: Omit<Product, "id">) => Promise<string | null>;
  update: (
    id: ProductId,
    newValues: EditableProductProperties
  ) => Promise<boolean>;
  delete: (id: ProductId) => Promise<boolean>;
}

export { DBRenderModel };
