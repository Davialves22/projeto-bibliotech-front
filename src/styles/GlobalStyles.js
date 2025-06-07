import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset básico */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Fonte base */
  html {
    font-size: 16px;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background: #fff;
    color: #333;
    overflow-x: hidden;
  }

  /* Imagens responsivas */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Links sem sublinhado */
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
