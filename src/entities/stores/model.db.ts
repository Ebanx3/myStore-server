import { UserId } from "../users/types";
import { Store, StoreId, StoreModel } from "./types";

class DBRenderModel implements StoreModel {
  private static instance: DBRenderModel;
  private constructor() {}
  public static getInstance() {
    if (DBRenderModel.instance === undefined)
      DBRenderModel.instance = new DBRenderModel();
    return DBRenderModel.instance;
  }

  create: (
    storeName: string,
    ownerId: string,
    maxProducts?: number
  ) => Promise<string>;
  checkIfStoreExists: (storeId: StoreId) => Promise<boolean>;
  getStoresByUserId: (userId: UserId) => Promise<Store[]>;
  changeCurrentProducts: (
    userId:UserId,
    storeName: string,
    newCurrentProducts: number
  ) => Promise<boolean>;
  changeMaxProducts: (
    userId:UserId,
    storeName: string,
    newMaxProducts: number
  ) => Promise<boolean>;
  changeStoreStatus: (storeName: string) => Promise<boolean>;
  delete: (storeName: string) => Promise<boolean>;
  getStoreByStoreName: (storeName: string) => Promise<Store | null>;
  storeIsMine: (userId: UserId, storeName: string) => Promise<Store | null>;
}

export { DBRenderModel };
