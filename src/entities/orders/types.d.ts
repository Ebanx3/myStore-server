import { Product } from "../products/types";
import { StoreId } from "../stores/types";

type OrderId = string;
type OrderStatus = "pending" | "completed" | "cancelled";
type ProductAtOrder = Omit<Product, "stock" | "statusVisible" | "storeId"> & {
  quantity: number;
};

type Order = {
  id: OrderId;
  storeId: StoreId;
  userEmail: string;
  userName: string;
  userLastName: string;
  userDocument: string;
  userAddress: string;
  products: ProductAtOrder[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
};

interface OrderModel {
  create: (
    newOrder: Omit<Order, "id" | "status" | "createdAt">
  ) => Promise<OrderId | null>;
  changeStatus: (orderId: OrderId, newStatus: OrderStatus) => Promise<boolean>;
}
