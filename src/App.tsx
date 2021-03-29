import React, { useState } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { theme, darkTheme } from '@/styles/theme';
import store from '@/store/store';
import ChartSection from './components/chart/ChartSection';
import Header from './components/header/Header';
import SideBar from './components/sidebar/SideBar';

axios.defaults.baseURL = 'https://api.bithumb.com/public';

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
        </Wrapper>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
