import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-size: 12px;
  }

  body {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
