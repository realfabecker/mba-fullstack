import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { OrderTableRow } from "@/pages/app/orders/order-table-row.tsx";
import { OrderTableFilters } from "@/pages/app/orders/order-table-filters.tsx";
import { Pagination } from "@/components/Pagination.tsx";
import { useQuery } from "@tanstack/react-query";
import { getOrders, GetOrdersResponse } from "@/api/get-orders.ts";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { OrderTableSkeleton } from "@/pages/app/orders/order-table-skeleton.tsx";
import { PaginationSkeleton } from "@/components/PaginationSkeleton.tsx";

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId") || "";
  const customerName = searchParams.get("customerName") || "";
  const status = searchParams.get("status") || "all";

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") || 1);

  const {
    data: result,
    isLoading: isLoadingOrders,
  }: { data: GetOrdersResponse } = useQuery<GetOrdersResponse>({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === "all" ? null : status,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set("page", String(pageIndex + 1));
      return prev;
    });
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]" />
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado a</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingOrders && <OrderTableSkeleton />}
                {result &&
                  result.orders?.map((order) => {
                    return <OrderTableRow key={order.orderId} order={order} />;
                  })}
              </TableBody>
            </Table>
          </div>
          {!isLoadingOrders ? (
            <Pagination
              pageIndex={pageIndex}
              totalCount={result?.meta?.totalCount || 0}
              perPage={result?.meta?.perPage || 0}
              onPageChange={handlePaginate}
            />
          ) : (
            <PaginationSkeleton />
          )}
        </div>
      </div>
    </>
  );
}
