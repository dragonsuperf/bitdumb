import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const SideBarContainer = styled.aside`
  border-left: 1px solid black;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

function SideBar() {
  const ORDER_BOOK_API = `/orderbook/ALL_KRW`;

  useEffect(() => {
    getCurrentPrices();
  }, []);

  const getCurrentPrices = async () => {
    try {
      const { data } = await axios.get(ORDER_BOOK_API);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SideBarContainer>
      <span>1</span>
      <span>2</span>
    </SideBarContainer>
  );
}

export default SideBar;
