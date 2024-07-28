import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../../../contexts/TransactionsContext.tsx";
import { TransactionCard, TransactionsList } from "./styles.ts";
import { dateFormatter, priceFormatter } from "../../../../utils/formatters.ts";
import { PriceHighlight } from "../../styles.ts";

import { CalendarBlank, TagSimple } from "phosphor-react";

export function CardList() {
  const transactions = useContextSelector(
    TransactionsContext,
    (value) => value.transactions,
  );
  return (
    <TransactionsList>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id}>
          <header>
            <span>{transaction.description}</span>
          </header>
          <PriceHighlight $variant={transaction.type}>
            <strong>
              {transaction.type === "outcome" && "- "}
              {priceFormatter.format(transaction.price)}
            </strong>
          </PriceHighlight>
          <footer>
            <span>
              <TagSimple />
              {transaction.category.toUpperCase()}
            </span>
            <span>
              <CalendarBlank />
              {dateFormatter.format(new Date(transaction.createdAt))}
            </span>
          </footer>
        </TransactionCard>
      ))}
    </TransactionsList>
  );
}
