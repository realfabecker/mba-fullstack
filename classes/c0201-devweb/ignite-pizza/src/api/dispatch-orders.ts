import { api } from "@/lib/axios.ts";

export interface DispatchOrders {
  orderId: string;
}

export async function dispatchOrder(props: DispatchOrders) {
  const response = await api.patch(`/orders/${props.orderId}/dispatch`);
  return response.data;
}
