import { http, HttpResponse } from "msw";
import { DispatchOrders } from "@/api/dispatch-orders.ts";

export const dispatchOrderMock = http.patch<DispatchOrders>(
  "/orders/:orderId/dispatch",
  ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  },
);
