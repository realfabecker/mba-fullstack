import { setupWorker } from "msw/browser";
import { env } from "@/env.ts";
import { signInMock } from "@/api/mocks/sign-in.mock.ts";
import { registerRestaurantMock } from "@/api/mocks/register-restaurant-mock.ts";
import { getDayOrdersAmountMock } from "@/api/mocks/get-day-orders-amount-mock.ts";
import { getMonthOrdersAmountMock } from "@/api/mocks/get-month-orders-amount-mock.ts";
import { getMonthCanceledOrdersAmountMock } from "@/api/mocks/get-month-canceled-orders-amount-mock.ts";
import { getMonthRevenueOrdersAmountMock } from "@/api/mocks/get-month-revenue-orders-amount-mock.ts";
import { getDailyRevenueInPeriodMock } from "@/api/mocks/get-daily-revenue-in-period-mock.ts";
import { getPopularProductsMock } from "@/api/mocks/get-popular-products-mock.ts";
import { getProfileMock } from "@/api/mocks/get-profile-mock.ts";
import { getManagedRestaurantMock } from "@/api/mocks/get-managed-restaurant-mock.ts";
import { updateProfileMock } from "@/api/mocks/update-profile-mock.ts";
import { getOrdersMock } from "@/api/mocks/get-orders-mock.ts";
import { getOrderDetailsMock } from "@/api/mocks/get-order-details-mocks.ts";
import { approveOrderMock } from "@/api/mocks/approve-order-mock.ts";
import { cancelOrderMock } from "@/api/mocks/cancel-order-mock.ts";
import { deliverOrderMock } from "@/api/mocks/deliver-order-mock.ts";
import { dispatchOrderMock } from "@/api/mocks/dispatch-order-mock.ts";

export const worker = setupWorker(
  ...[
    signInMock,
    registerRestaurantMock,
    getDayOrdersAmountMock,
    getMonthOrdersAmountMock,
    getMonthCanceledOrdersAmountMock,
    getMonthRevenueOrdersAmountMock,
    getDailyRevenueInPeriodMock,
    getPopularProductsMock,
    getProfileMock,
    getManagedRestaurantMock,
    updateProfileMock,
    getOrdersMock,
    getOrderDetailsMock,
    approveOrderMock,
    cancelOrderMock,
    deliverOrderMock,
    dispatchOrderMock,
  ],
);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }
  await worker.start();
}
