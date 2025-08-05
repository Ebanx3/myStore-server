import { StoreId } from "../stores/types";

type ProductId = string;

type Product = {
  id: ProductId;
  name: string;
  details: string;
  price: number;
  picturesUrl: string[];
  stock: number;
  statusVisible: boolean;
  storeId: StoreId;
};

type EditableProductProperties = {
  name?: string;
  details?: string;
  picturesUrl?:string[];
  price?: number;
  stock?: number;
  statusVisible?: boolean;
};

interface ProductModel {
    /**
     * Retrieves all products from a specific store.
     * @param storeId - Unique identifier of the store.
     * @returns A promise that resolves to an array of products.
     */
    getAll: (storeId: StoreId) => Promise<Product[]>;

    /**
     * Finds a product by its unique ID.
     * @param id - Unique identifier of the product.
     * @returns A promise that resolves to the product if found, or `null` if it does not exist.
     */
    getById: (id: ProductId) => Promise<Product | null>;

    /**
     * Adds a new product to the store.
     * @param newProduct - The product details excluding the ID.
     * @returns A promise that resolves to the ID of the newly added product or `null` if the operation fails.
     */
    add: (newProduct: Omit<Product, "id">) => Promise<string | null>;

    /**
     * Updates an existing product with new values.
     * @param id - Unique identifier of the product to be updated.
     * @param newValues - The properties to be updated.
     * @returns A promise that resolves to `true` if the update was successful, or `false` if it failed.
     */
    update: (id: ProductId, newValues: EditableProductProperties) => Promise<boolean>;

    /**
     * Deletes a product by its ID.
     * @param id - Unique identifier of the product to be deleted.
     * @returns A promise that resolves to `true` if the deletion was successful, or `false` otherwise.
     */
    delete: (id: ProductId) => Promise<boolean>;
}

