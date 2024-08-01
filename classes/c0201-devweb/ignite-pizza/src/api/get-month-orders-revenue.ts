import { api } from "@/lib/axios.ts";

export interface GetMonthRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await api.get("/metrics/month-receipt");
  return response.data as GetMonthRevenueResponse;
}
