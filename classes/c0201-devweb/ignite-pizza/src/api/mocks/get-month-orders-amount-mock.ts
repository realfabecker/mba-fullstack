import { http, HttpResponse } from "msw";
import { GetMonthOrdersAmountResponse } from "@/api/get-month-orders-amount.ts";

export const getMonthOrdersAmountMock = http.get(
  "/metrics/month-orders-amount",
  () => {
    return HttpResponse.json<GetMonthOrdersAmountResponse>(
      {
        amount: 200,
        diffFromLastMonth: 7,
      },
      {
        status: 200,
      },
    );
  },
);
