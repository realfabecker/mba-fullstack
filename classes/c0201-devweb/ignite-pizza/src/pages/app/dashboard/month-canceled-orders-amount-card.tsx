import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMonthCanceledOrdersAmount } from "@/api/get-month-orders-canceled.ts";
import { MetricCardSkeleton } from "@/pages/app/dashboard/metric-card-skeleton.tsx";

export function MonthCanceledOrdersAmountCard() {
  const { data: monthOrdersCanceled } = useQuery({
    queryKey: ["metrics", "month-orders-canceled"],
    queryFn: getMonthCanceledOrdersAmount,
  });
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersCanceled ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersCanceled.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthOrdersCanceled.diffFromLastMonth >= 0 ? (
                <>
                  <span className="dark:text-roles-400 text-emerald-500">
                    +{monthOrdersCanceled.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="dark:text-roles-400 text-rose-500">
                    {monthOrdersCanceled.diffFromLastMonth}%
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
