import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ChartSection from './components/chart/ChartSection';
import Header from './components/header/Header';
import SideBar from './components/sidebar/SideBar';

axios.defaults.baseURL = 'https://api.bithumb.com/public';

const MainContainer = styled.div`
  display: flex;
`;

function App() {
  return (
    <>
      <Header />
      <MainContainer>
        <ChartSection />
        <SideBar />
      </MainContainer>
    </>
  );
}

export default App;
