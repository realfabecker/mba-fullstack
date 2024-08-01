import { http, HttpResponse } from "msw";

import { GetMonthRevenueResponse } from "@/api/get-month-orders-revenue.ts";

export const getMonthRevenueOrdersAmountMock = http.get(
  "/metrics/month-receipt",
  () => {
    return HttpResponse.json<GetMonthRevenueResponse>({
      diffFromLastMonth: 10,
      receipt: 20000,
    });
  },
);
