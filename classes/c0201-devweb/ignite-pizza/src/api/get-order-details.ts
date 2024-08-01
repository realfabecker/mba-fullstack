import { api } from "@/lib/axios.ts";
import { OrderStatus } from "@/components/OrderStatus.tsx";

export interface GetOrderDetailsParams {
  orderId: string;
  open: boolean;
}

export interface GetOrderDetailsResponse {
  id: string;
  createdAt: string;
  status: OrderStatus;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}

export async function getOrderDetails(props: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(
    `/orders/${props.orderId}`,
  );
  return response.data;
}
