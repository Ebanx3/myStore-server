import { envs } from "../utils/envVariables";

import { DBRenderModel as DBRenderProducts } from "../entities/products/model.db";
import { MemoryModel as MemoryProducts } from "../entities/products/model.memory";
import { ProductModel } from "../entities/products/types";

import { StoreModel } from "../entities/stores/types";
import { DBRenderModel as DBRenderStore } from "../entities/stores/model.db";
import { MemoryModel as MemoryStore } from "../entities/stores/model.memory";

import { UserModel } from "../entities/users/types";
import { MemoryModel as MemoryUser } from "../entities/users/model.memory";
import { DBRenderModel as DBRenderUser } from "../entities/users/model.db";

class ProductsModelsFactory {
  static getModel = (): ProductModel => {
    if (!envs.DB_URL) return MemoryProducts.getInstance();
    return DBRenderProducts.getInstance();
  };
}

class StoreModelsFactory {
  static getModel = (): StoreModel => {
    if (!envs.DB_URL) return MemoryStore.getInstance();
    return DBRenderStore.getInstance();
  };
}

class UserModelFactory {
  static getModel = (): UserModel => {
    if (!envs.DB_URL) return MemoryUser.getInstance();
    return DBRenderUser.getInstance();
  };
}

export {
  ProductsModelsFactory as ProductsModel,
  StoreModelsFactory as StoreModel,
  UserModelFactory as UserModel,
};
