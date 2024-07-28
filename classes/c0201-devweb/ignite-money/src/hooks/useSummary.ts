import { TransactionsContext } from "../contexts/TransactionsContext.tsx";
import { useContextSelector } from "use-context-selector";
import { useMemo } from "react";

export function useSummary() {
  const transactions = useContextSelector(
    TransactionsContext,
    (value) => value.transactions,
  );

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, v) => {
        if (v.type === "income") {
          acc.income += v.price;
          acc.total += v.price;
        } else {
          acc.outcome += v.price;
          acc.total -= v.price;
        }
        return acc;
      },
      {
        total: 0,
        income: 0,
        outcome: 0,
      },
    );
  }, [transactions]);

  return summary;
}
