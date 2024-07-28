import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { useMediaQuery } from "react-responsive";
import { CardList } from "./components/CardList";
import { TableList } from "./components/TableList";
import { TransactionsContainer } from "./styles.ts";

export function Transactions() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        {(isMobile && <CardList />) || <TableList />}
      </TransactionsContainer>
    </div>
  );
}
