import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMonthRevenue } from "@/api/get-month-orders-revenue.ts";
import { MetricCardSkeleton } from "@/pages/app/dashboard/metric-card-skeleton.tsx";

export function MonthRevenueCard() {
  const { data: monthOrdersRevenue } = useQuery({
    queryKey: ["metrics", "month-revenue"],
    queryFn: getMonthRevenue,
  });
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita Total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthOrdersRevenue?.receipt / 100)?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthOrdersRevenue.diffFromLastMonth >= 0 ? (
                <>
                  <span className="dark:text-roles-400 text-emerald-500">
                    +{monthOrdersRevenue.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="dark:text-roles-400 text-rose-500">
                    {monthOrdersRevenue.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
