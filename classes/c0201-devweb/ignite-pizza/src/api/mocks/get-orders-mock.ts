import { http, HttpResponse } from "msw";
import { GetOrdersResponse } from "@/api/get-orders.ts";

type Orders = GetOrdersResponse["orders"];
type OrderStatus = GetOrdersResponse["orders"][number]["status"];

const statuses: OrderStatus[] = [
  "canceled",
  "delivered",
  "delivering",
  "pending",
  "processing",
];

const orders: Orders = Array.from({ length: 50 }, (_, i) => ({
  orderId: `orderId-${i + 1}`,
  customerName: `Customer ${i + 1}`,
  createdAt: new Date(),
  status: statuses[i % 5],
  total: Math.ceil(Math.random() * 3000),
}));

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  "/orders",
  async ({ request }) => {
    const { searchParams } = new URL(request.url);
    const pageIndex = Number(searchParams.get("pageIndex") || 0);
    const customerName = searchParams.get("customerName");
    const orderId = searchParams.get("orderId");
    const orderStatus = searchParams.get("status");

    let filteredOrders = orders;
    if (customerName) {
      filteredOrders = filteredOrders.filter((o) =>
        o.customerName.includes(customerName),
      );
    }
    if (orderId) {
      filteredOrders = filteredOrders.filter((o) => o.orderId == orderId);
    }
    if (orderStatus) {
      filteredOrders = filteredOrders.filter((o) => o.status == orderStatus);
    }
    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    );
    return HttpResponse.json<GetOrdersResponse>({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    });
  },
);
