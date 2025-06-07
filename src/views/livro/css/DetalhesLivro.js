import styled from "styled-components";

export const ContainerStyled = styled.div`
  max-width: 1100px;
  margin: 2em auto;
  padding: 0 1rem;
  width: 100%;
`;

export const SegmentStyled = styled.section`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgb(0 0 0 / 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
`;

export const ImageStyled = styled.img`
  flex: 1 1 250px;
  max-width: 250px;
  border-radius: 10px;
  object-fit: cover;
  width: 100%;
  height: auto;
  box-shadow: 0 0 5px rgb(0 0 0 / 0.2);
`;

export const InfoWrapper = styled.div`
  flex: 2 1 400px;
  min-width: 200px;

  p {
    margin-bottom: 0.8rem;
    font-size: 1rem;
    line-height: 1.4;
    word-break: break-word;
  }

  strong {
    font-weight: 600;
  }
`;

/* Responsividade */
export const HeaderStyled = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;
