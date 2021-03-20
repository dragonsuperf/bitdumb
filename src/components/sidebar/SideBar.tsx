import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Coin } from '@/types/coin';
import SidebarItem from './SidebarItem';

const SideBarContainer = styled.aside`
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  height: 80vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

function SideBar() {
  const [coinList, setCoinList] = useState<Coin[]>([]);

  const TICKER_API = `/ticker/ALL_KRW`;

  useEffect(() => {
    getCurrentPrices();
    setInterval(getCurrentPrices, 1000);
  }, []);

  const getCurrentPrices = async () => {
    try {
      const newCoinList: Coin[] = [];
      const response = await axios.get(TICKER_API);
      const { data } = response.data;

      Object.entries(data).forEach((value) => {
        const key: string = value[0];
        const coin: any = value[1];

        if (key === 'date') return;

        const newCoinData: Coin = {
          id: '',
          currentPrice: 0,
          prevPrice: 0,
          fluctate24H: 0,
          fluctateRate24H: 0,
          accTradeValue: 0,
        };

        [
          newCoinData.id,
          newCoinData.currentPrice,
          newCoinData.prevPrice,
          newCoinData.fluctate24H,
          newCoinData.fluctateRate24H,
          newCoinData.accTradeValue,
        ] = [
          key,
          coin.closing_price,
          coin.prev_closing_price,
          coin.fluctate_24H,
          coin.fluctate_rate_24H,
          Math.floor(coin.acc_trade_value / 1000000),
        ];

        newCoinList.push(newCoinData);
      });

      setCoinList(newCoinList);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SideBarContainer>
      <ol>
        {coinList.map((coin) => {
          return <SidebarItem key={coin.id} coinData={coin} />;
        })}
      </ol>
    </SideBarContainer>
  );
}

export default SideBar;
