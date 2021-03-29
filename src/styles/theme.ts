import { DefaultTheme } from 'styled-components';

const size = {
  moblie: '600px',
  tablet: '960px',
  desktop: '1200px',
};

export const theme: DefaultTheme = {
  themeColor: '#3AAFA9',
  textColor: '#0a4297',
  fallingColor: '#4386f9',
  risingColor: '#f75467',
  baseBackgroundColor: '#f8f8f8',
  weakBorder: '#eee',
  basicColor: '#1b1b1b',
  backgroundColor: 'white',
  moblide: `(max-width: ${size.moblie})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(max-width: ${size.desktop})`,
};

export const darkTheme: DefaultTheme = {
  themeColor: '#3AAFA9',
  textColor: '#fafcfc',
  fallingColor: '#4386f9',
  risingColor: '#f75467',
  baseBackgroundColor: '#f8f8f8',
  weakBorder: '#eee',
  basicColor: '#1b1b1b',
  backgroundColor: '#282c34',
  moblide: `(max-width: ${size.moblie})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(max-width: ${size.desktop})`,
};

export const textColor = '#0a4297';
export const themeColor = '#3AAFA9';
