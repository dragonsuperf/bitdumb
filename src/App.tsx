import React, { useState } from 'react';
import axios from 'axios';
import GlobalStyle from '@/styles/global';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { theme, darkTheme } from '@/styles/theme';
import store from '@/store/store';
import { Integrations } from '@sentry/tracing';
import * as Sentry from '@sentry/react';
import ChartSection from './components/chart/ChartSection';
import Header from './components/header/Header';
import SideBar from './components/sidebar/SideBar';
import DarkModeButton from './components/button/DarkModeButton';

Sentry.init({
  dsn: 'https://d8363a5886dc401c85bcdad0a68e80b5@o565801.ingest.sentry.io/5707748',
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0,
});

axios.defaults.baseURL = 'https://api.bithumb.com/public';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Sentry.captureException(error);
    return Promise.reject(error);
  },
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 1200px;
  display: flex;
`;

const appStore = store();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <Provider store={appStore}>
        <Header />
        <Wrapper>
          <MainContainer>
            <ChartSection />
            <SideBar />
          </MainContainer>
          <DarkModeButton onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? '🌝' : '🌚'}</DarkModeButton>
        </Wrapper>
        <GlobalStyle theme={isDarkMode ? darkTheme : theme} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
