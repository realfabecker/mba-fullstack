import { api } from "@/lib/axios.ts";

export interface GetMonthOrdersCanceled {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api.get("/metrics/month-canceled-orders-amount");
  return response.data as GetMonthOrdersCanceled;
}
