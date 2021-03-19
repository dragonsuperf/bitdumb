import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ChartSection from './components/ChartSection';
import Header from './components/Header';
import SideBar from './components/SideBar';

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
