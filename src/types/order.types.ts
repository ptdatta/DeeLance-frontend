import { TaskType } from "./task.type";

// In "@/types/order.types.ts"
export interface OrderType {
  _id: string;
  clientId: string;
  freelancerId: string;
  gigId: string;
  status: string;
  deadline: string;
  initialTransactionHash: string;
  createdAt: string;
  // ... other fields
}

