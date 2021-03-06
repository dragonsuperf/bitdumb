import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    themeColor: string;
    coloredTextColor: string;
    textColor: string;
    fallingColor: string;
    risingColor: string;
    baseBackgroundColor: string;
    weakBorder: string;
    basicColor: string;
    backgroundColor: string;
    mobile: string;
    tablet: string;
    desktop: string;
  }
}
