import { UserId } from "../users/types";

type StoreId = string;

type Store = {
  id: StoreId;
  name: string;
  ownerId: string;
  createdAt: string;
  statusActive: boolean;
  maxProducts: number;
  currentProducts: number;
};

interface StoreModel {
  /**
   * Creates a new store with the specified name and owner.
   * @param storeName - The name of the store to be created.
   * @param ownerId - The unique identifier of the store owner.
   * @param maxProducts - (Optional) Maximum number of products allowed in the store.
   * @returns A promise that resolves to the unique store identifier (`StoreId`).
   */
  create: (
    storeName: string,
    ownerId: string,
    maxProducts?: number
  ) => Promise<StoreId>;

  /**
   * Checks if a store exists given its unique identifier.
   * @param storeId - The unique identifier of the store.
   * @returns A promise that resolves to `true` if the store exists, otherwise `false`.
   */
  checkIfStoreExists: (storeId: StoreId) => Promise<boolean>;

  /**
   * Retrieves all stores associated with a specific user ID.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to an array of stores owned by the user.
   */
  getStoresByUserId: (userId: UserId) => Promise<Store[]>;

  getStoreByStoreName : (storeName:string)  => Promise<Store | null>;
  /**
   * Changes the status of a store.
   * @param storeName - The name of the store whose status will be updated.
   * @returns A promise that resolves to `true` if the status change was successful, otherwise `false`.
   */
  changeStoreStatus: (userId: UserId, storeName: string) => Promise<boolean>;

  /**
   * Updates the maximum allowed number of products in a store.
   * @param storeName - The name of the store to be updated.
   * @param newMaxProducts - The new maximum number of products.
   * @returns A promise that resolves to `true` if the update was successful, otherwise `false`.
   */
  changeMaxProducts: (
    userId: UserId,
    storeName: string,
    newMaxProducts: number
  ) => Promise<boolean>;

  /**
   * Updates the current number of products in a store.
   * @param storeName - The name of the store to be updated.
   * @param newCurrentProducts - The new count of current products in the store.
   * @returns A promise that resolves to `true` if the update was successful, otherwise `false`.
   */
  changeCurrentProducts: (
    userId: UserId,
    storeName: string,
    newCurrentProducts: number
  ) => Promise<boolean>;

  /**
   * Deletes a store by its name.
   * @param storeName - The name of the store to be deleted.
   * @returns A promise that resolves to `true` if the deletion was successful, otherwise `false`.
   */
  delete: (userId: UserId, storeName: string) => Promise<boolean>;
  storeIsMine: (userId: UserId, storeName: string) => Promise<Store | null>;
}
