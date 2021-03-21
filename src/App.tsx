import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Provider } from 'react-redux';
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
  return (
    <Provider store={appStore}>
      <Header />
      <Wrapper>
        <MainContainer>
          <ChartSection />
          <SideBar />
        </MainContainer>
      </Wrapper>
    </Provider>
  );
}

export default App;
