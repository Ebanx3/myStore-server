import { v4 as uuid } from "uuid";
import {
  EditableProductProperties,
  Product,
  ProductId,
  ProductModel,
} from "./types";
import { StoreId } from "../stores/types";

const products: Product[] = [];

const editableProductProperties: (keyof EditableProductProperties)[] = [
  "name",
  "details",
  "price",
  "stock",
  "statusVisible",
];

class MemoryModel implements ProductModel {
  private static instance: MemoryModel;
  private constructor() {}
  public static getInstance() {
    if (MemoryModel.instance === undefined)
      MemoryModel.instance = new MemoryModel();
    return MemoryModel.instance;
  }

  getAll = async (storeId: StoreId) => {
    return products.filter((product) => product.storeId === storeId);
  };

  getById = async (id: string) => {
    const index = products.findIndex((product) => product.id === id);
    return index < 0 ? null : products[index];
  };

  add = async (newProduct: Omit<Product, "id">) => {
    const newP = { ...newProduct, id: uuid() };
    products.push(newP);
    return newP.id;
  };

  update = async (id: ProductId, newValues: EditableProductProperties) => {
    const index = products.findIndex((product) => product.id === id);
    if (index < 0) return false;

    const filteredValues: Partial<Product> = Object.keys(newValues)
      .filter((key) => key in editableProductProperties)
      .reduce((acc, key) => {
        acc[key] = newValues[key as keyof EditableProductProperties];
        return acc;
      }, {} as EditableProductProperties);

    products[index] = { ...products[index], ...filteredValues };
    return true;
  };

  delete = async (id: ProductId) => {
    const index = products.findIndex((product) => product.id === id);
    if (index < 0) return false;

    products.splice(index, 1);
    return true;
  };
}

export { MemoryModel };
