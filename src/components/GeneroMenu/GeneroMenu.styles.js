import styled, { css, keyframes } from "styled-components";

const highlight = keyframes`
  0% { background-color: var(--color-500); }
  50% { background-color: var(--color-400); }
  100% { background-color: var(--color-500); }
`;

export const Menu = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0.5em 2em;
  background-color: var(--color-100);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.1);
  scrollbar-width: thin;
  scrollbar-color: var(--color-500) transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-500);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

// Aqui o filtro impede que a prop 'active' seja repassada para o div DOM e cause warning
export const Item = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active"
})`
  flex: 0 0 auto;
  margin: 0 0.4em;
  padding: 0.5em 1em;
  font-size: 0.95em;
  text-transform: capitalize;
  color: ${(props) => (props.active ? "white" : "#4a4a4a")};
  cursor: pointer;
  border-radius: 20px;
  user-select: none;
  min-width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.active ? "var(--color-500)" : "transparent"};
  box-shadow: ${(props) =>
    props.active ? "0 0 12px var(--color-500)" : "none"};

  ${(props) =>
    props.active &&
    css`
      animation: ${highlight} 2s ease-in-out infinite;
    `}

  &:hover {
    color: white;
    background-color: var(--color-500);
    box-shadow: 0 4px 8px rgb(0 180 216 / 0.5);
    transform: translateY(-3px);
  }
`;

export const SelectMobile = styled.select`
  width: 100%;
  max-width: 90%;
  margin: 1em auto;
  padding: 0.75em 1em;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-500);
  background-color: var(--color-100);
  color: #333;
  display: block;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: var(--color-500);
    box-shadow: 0 0 4px var(--color-500);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;
