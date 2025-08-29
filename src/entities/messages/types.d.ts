import { ProductId } from "../products/types";

type MessageId = string;

type Message = {
    id: MessageId;
    productId: ProductId;
    author: string;
    content: string;
    date:string;
}

interface MessageModel {
    create: (message: Omit<Message, 'date' | 'id'>) => Promise<string | null>;
    getAllByProductId: (productId:ProductId)=> Promise<Message[] | null>
}   