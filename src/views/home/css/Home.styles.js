import { Card as SemanticCard, Image as SemanticImage, Menu as SemanticMenu } from "semantic-ui-react";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 1.5em auto;
  padding: 0 0.5em;
`;

export const Title = styled.h2`
  text-align: left;
  color: black;
  display: flex;
  align-items: center;
  gap: 0.4em;
  font-size: 1.1em;
`;

export const Menu = styled(SemanticMenu)`
  overflow-x: auto !important;
  white-space: nowrap;

  .item {
    flex: 0 0 auto !important;
    text-transform: capitalize;
    font-size: 0.85em;
    padding: 0.4em 0.7em !important;
  }
`;

export const CardGroup = styled(SemanticCard.Group)`
  &&& {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
    gap: 0.75em !important;
    justify-items: center;
  }
`;

export const Card = styled(SemanticCard)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.7em;
    width: 50%;
    font-size: 0.85em;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    background: #fff;
  }
`;

export const Image = styled(SemanticImage)`
  width: 100% !important;
  height: auto !important;
  object-fit: cover !important;
  border-radius: 3px;
`;

export const CardContentCenter = styled(SemanticCard.Content)`
  &&& {
    text-align: center;
    padding: 0.4em 0 !important;
  }
`;

export const CardContentExtra = styled(SemanticCard.Content)`
  &&& {
    padding-top: 0.4em !important;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
  }
`;
