import { api } from "@/lib/axios.ts";

export interface ApproveOrderParams {
  orderId: string;
}

export async function approveOrder(props: ApproveOrderParams) {
  const response = await api.patch(`/orders/${props.orderId}/approve`);
  return response.data;
}
