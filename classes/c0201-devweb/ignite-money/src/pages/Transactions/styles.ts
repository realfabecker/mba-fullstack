import styled from "styled-components";

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    margin: 4rem auto 0;
    padding: 0 1.5rem;
  }
`;

interface PriceHighlightProps {
  $variant: "income" | "outcome";
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) => props.$variant === "income" && props.theme["green-300"]};
  color: ${(props) => props.$variant === "outcome" && props.theme["red-300"]};
`;
