import { http, HttpResponse } from "msw";
import { CancelOrderParams } from "@/api/cancel-orders.ts";

export const cancelOrderMock = http.patch<CancelOrderParams>(
  "/orders/:orderId/cancel",
  ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  },
);
