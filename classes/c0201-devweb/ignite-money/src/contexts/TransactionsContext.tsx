import { ReactNode, useCallback, useEffect, useState } from "react";

import { api } from "../lib/axios.ts";
import { createContext } from "use-context-selector";

export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

export interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, category, price, type } = data;
      const transaction = await api.post("/transactions", {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      });
      setTransactions((prevState) => [transaction.data, ...prevState]);
    },
    [setTransactions],
  );

  const fetchTransactions = useCallback(
    async (query: string = "") => {
      const response = await api.get("/transactions", {
        params: {
          _sort: "createdAt",
          _order: "desc",
          q: query,
        },
      });

      if (query && response.data) {
        const filtered = response.data.filter((t) => {
          const regexp = new RegExp(query);
          return (
            regexp.test(t.description) ||
            regexp.test(t.type) ||
            regexp.test(t.category)
          );
        });
        setTransactions(filtered);
      } else {
        setTransactions(response.data || []);
      }
    },
    [setTransactions],
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
