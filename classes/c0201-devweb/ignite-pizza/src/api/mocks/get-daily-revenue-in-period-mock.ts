import { http, HttpResponse } from "msw";
import { GetDailyRevenueInPeriodResponse } from "@/api/get-daily-revenue-in-period.ts";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json<GetDailyRevenueInPeriodResponse>([
    { date: "01/01/2024", receipt: 100 },
    { date: "02/01/2024", receipt: 200 },
    { date: "03/01/2024", receipt: 300 },
    { date: "04/01/2024", receipt: 200 },
    { date: "05/01/2024", receipt: 100 },
    { date: "06/01/2024", receipt: 140 },
    { date: "07/01/2024", receipt: 400 },
  ]);
});
