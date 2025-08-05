import { v4 as uuid } from "uuid";
import { Store, StoreId, StoreModel } from "./types";
import { UserId } from "../users/types";

const stores: Store[] = [];

class MemoryModel implements StoreModel {
  private static instance: MemoryModel;
  private constructor() {}
  public static getInstance() {
    if (MemoryModel.instance === undefined)
      MemoryModel.instance = new MemoryModel();
    return MemoryModel.instance;
  }

  create = async (name: string, ownerId: string, maxProducts: number = 50) => {
    const index = stores.findIndex((store) => store.name === name);
    if (index >= 0) return "StoreName already used";

    const newStore: Store = {
      id: uuid(),
      name,
      ownerId,
      createdAt: new Date().toLocaleDateString(),
      statusActive: false,
      maxProducts,
      currentProducts: 0,
    };

    stores.push(newStore);

    return newStore.id;
  };

  checkIfStoreExists = (storeId: StoreId) => {
    return new Promise<boolean>((resolve) => {
      resolve(stores.some((store) => store.id === storeId));
    });
  };

  getStoresByUserId = (userId: UserId) => {
    return new Promise<Store[]>((resolve) => {
      resolve(stores.filter((store) => store.ownerId === userId));
    });
  };

  getStoreByStoreName = (storeName: string) => {
    return new Promise<Store | null>((resolve) => {
      const index = stores.findIndex((store) => store.name === storeName);
      if (index < 0) resolve(null);

      resolve(stores[index]);
    });
  };

  changeStoreStatus = (userId: UserId, storeName: string) => {
    return new Promise<boolean>((resolve, reject) => {
      const index = stores.findIndex((store) => store.name === storeName);
      if (index < 0) reject(false);

      if (stores[index].ownerId != userId) reject(false);

      stores[index].statusActive = !stores[index].statusActive;
      resolve(true);
    });
  };

  changeMaxProducts = (
    userId: UserId,
    storeName: string,
    newMaxProducts: number
  ) => {
    return new Promise<boolean>((resolve, reject) => {
      const index = stores.findIndex((store) => store.name === storeName);
      if (index < 0) reject(false);

      if (stores[index].ownerId != userId) reject(false);

      stores[index].maxProducts = newMaxProducts;
      resolve(true);
    });
  };

  changeCurrentProducts = (
    userId: UserId,
    storeName: string,
    newCurrentProducts: number
  ) => {
    return new Promise<boolean>((resolve, reject) => {
      const index = stores.findIndex((store) => store.name === storeName);
      if (index < 0) reject(false);

      if (stores[index].ownerId != userId) reject(false);

      stores[index].currentProducts = newCurrentProducts;
      resolve(true);
    });
  };

  delete = (userId: UserId, storeName: string) => {
    return new Promise<boolean>((resolve, reject) => {
      const index = stores.findIndex((store) => store.name === storeName);
      if (index < 0) reject(false);

      if (stores[index].ownerId != userId) reject(false);

      stores.splice(index, 1);
      resolve(true);
    });
  };

  storeIsMine = (userId: UserId, storeName: string) => {
    return new Promise<Store | null>((resolve, reject) => {
      console.log(stores);
      const index = stores.findIndex((store) => store.name === storeName);
      if (index < 0) reject(null);

      if (stores[index].ownerId != userId) reject(null);

      resolve(stores[index]);
    });
  };
}

export { MemoryModel };
