import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: '#1b1b1b';
  }

  body {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
