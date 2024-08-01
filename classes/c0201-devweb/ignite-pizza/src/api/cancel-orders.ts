import { api } from "@/lib/axios.ts";

export interface CancelOrderParams {
  orderId: string;
}

export async function cancelOrder(props: CancelOrderParams) {
  const response = await api.patch(`/orders/${props.orderId}/cancel`);
  return response.data;
}
