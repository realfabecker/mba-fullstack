import { api } from "@/lib/axios.ts";

export interface DeliverOrderParams {
  orderId: string;
}

export async function deliverOrder(props: DeliverOrderParams) {
  const response = await api.patch(`/orders/${props.orderId}/deliver`);
  return response.data;
}
