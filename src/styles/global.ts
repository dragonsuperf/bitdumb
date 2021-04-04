import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquare';
    font-weight: 400;
    src: url('/fonts/NanumSquareRoundL.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'NanumSquare';
    font-weight: 700;
    src: url('/fonts/NanumSquareRoundB.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'NanumSquare';
    font-weight: 800;
    src: url('/fonts/NanumSquareRoundEB.ttf') format('truetype');
  }

  * {
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: '#1b1b1b';
  }

  body {
    box-sizing: border-box;
    font-family: 'NanumSquare', sans-serif;
    color: ${(props) => props.theme.coloredTextColor};
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;

export default GlobalStyle;
