import { http, HttpResponse } from "msw";
import { GetMonthOrdersCanceled } from "@/api/get-month-orders-canceled.ts";

export const getMonthCanceledOrdersAmountMock = http.get(
  "/metrics/month-canceled-orders-amount",
  () => {
    return HttpResponse.json<GetMonthOrdersCanceled>({
      diffFromLastMonth: -5,
      amount: 5,
    });
  },
);
