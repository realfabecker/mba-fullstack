import styled, { css } from "styled-components";

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin: -5rem auto 0;

  /* Habilita scroll horizontal */
  overflow-x: scroll;

  /* Oculta barra de rolagem: Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Oculta barra de rolagem: Firefox */
  scrollbar-width: none;

  /* Oculta barra de rolagem: IE and Edge */
  -ms-overflow-style: none;
`;

export interface SummaryCardProps {
  $variant?: "green";
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme["gray-600"]};
  border-radius: 6px;
  padding: 2rem;

  & header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme["gray-300"]};
  }

  & strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  ${(props) => {
    if (props.$variant !== "green") return;
    return css`
      background: ${props.theme["green-700"]};
    `;
  }}
`;
