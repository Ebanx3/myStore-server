import { v4 as uuid } from "uuid";
import { Message, MessageModel } from "./types";
import { ProductId } from "../products/types";

const messages: Message[] = [];

class MemoryModel implements MessageModel {
  private static instance: MemoryModel;
  private constructor() {}
  public static getInstance() {
    if (MemoryModel.instance === undefined)
      MemoryModel.instance = new MemoryModel();
    return MemoryModel.instance;
  }
  
  create = (message: Omit<Message, "date" | "id">) => {
    return new Promise<string | null>((resolve, _reject) => {
      const newM: Message = {
        ...message,
        id: uuid(),
        date: new Date().toLocaleDateString(),
      };
      messages.push(newM);
      resolve(newM.id);
    });
  };
  getAllByProductId = (productId: ProductId) => {
    return new Promise<Message[] | null>((resolve, _reject) => {
      resolve(messages.filter((message) => message.productId === productId));
    });
  };
}

export { MemoryModel };
