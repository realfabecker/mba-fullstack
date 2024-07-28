import styled from "styled-components";

export const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-top: 1.5rem;
`;

export const TransactionCard = styled.div`
  background: ${(props) => props.theme["gray-700"]};
  border-radius: 6px;
  padding: 2rem;

  & header {
    color: ${(props) => props.theme["gray-300"]};
    text-transform: capitalize;
  }

  & strong {
    display: block;
    margin-top: 1rem;
    font-size: 1.25rem;
  }

  & footer {
    margin-top: 1rem;

    display: flex;
    justify-content: space-between;

    & span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${(props) => props.theme["gray-500"]};
    }
  }
`;
