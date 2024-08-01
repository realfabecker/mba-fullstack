import { api } from "@/lib/axios.ts";

interface GetOrdersQuery {
  pageIndex?: number | null;
  orderId?: string;
  status?: string | null;
  customerName?: string;
}

export interface GetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders(opts: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex: opts.pageIndex,
      orderId: opts.orderId,
      customerName: opts.customerName,
      status: opts.status,
    },
  });
  return response.data;
}
