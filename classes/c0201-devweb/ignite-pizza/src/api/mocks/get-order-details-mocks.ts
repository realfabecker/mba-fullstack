import { http, HttpResponse } from "msw";
import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from "@/api/get-order-details.ts";

export const getOrderDetailsMock = http.get<
  any,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  const orderDetails: GetOrderDetailsResponse = {
    id: params.orderId as string,
    customer: {
      name: "Customer-1",
      email: "customer1@mail.com",
      phone: "47 9 1234 5678",
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    totalInCents: 100,
    orderItems: Array.from({ length: 2 }, (_, i) => ({
      id: `order-item-${i}`,
      priceInCents: Math.ceil(Math.random() * 200),
      product: { name: `Product-${i}` },
      quantity: 1,
    })),
  };
  return HttpResponse.json(orderDetails);
});
