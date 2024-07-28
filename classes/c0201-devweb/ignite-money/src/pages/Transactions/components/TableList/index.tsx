import { dateFormatter, priceFormatter } from "../../../../utils/formatters.ts";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../../../contexts/TransactionsContext.tsx";
import { TransactionsTable } from "./styles.ts";
import { PriceHighlight } from "../../styles.ts";

export function TableList() {
  const transactions = useContextSelector(
    TransactionsContext,
    (value) => value.transactions,
  );
  return (
    <TransactionsTable>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td width="50%">{transaction.description}</td>
            <td>
              <PriceHighlight $variant={transaction.type}>
                {transaction.type === "outcome" && "-"}
                <strong>{priceFormatter.format(transaction.price)}</strong>
              </PriceHighlight>
            </td>
            <td>{transaction.category}</td>
            <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
          </tr>
        ))}
      </tbody>
    </TransactionsTable>
  );
}
