// GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
  }
`;

export default GlobalStyle;
