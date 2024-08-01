import { http, HttpResponse } from "msw";
import { GetPopularProductsResponse } from "@/api/get-popular-products.ts";

export const getPopularProductsMock = http.get(
  "/metrics/popular-products",
  () => {
    return HttpResponse.json<GetPopularProductsResponse>([
      { product: "Pizza 01", amount: 10 },
      { product: "Pizza 02", amount: 5 },
      { product: "Pizza 03", amount: 6 },
      { product: "Pizza 04", amount: 8 },
      { product: "Pizza 05", amount: 12 },
    ]);
  },
);
