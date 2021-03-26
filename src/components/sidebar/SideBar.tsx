import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Coin } from '@/types/coin';
import SidebarItem from './SidebarItem';

const SideBarContainer = styled.aside`
  border-left: 1px solid ${(props) => props.theme.weakBorder};
  border-bottom: 1px solid ${(props) => props.theme.weakBorder};
  display: block;
  flex-direction: column;
  & > ol {
    max-height: 700px;
    overflow-y: scroll;
  }
`;

const SearchBar = styled.input`
  margin: 5px;
  padding: 5px;
  width: calc(100% - 10px);
  box-sizing: border-box;
  height: 25px;
  border: 1px solid ${(props) => props.theme.weakBorder};
  border-radius: 3px;
`;

function SideBar() {
  const [coinList, setCoinList] = useState<Coin[]>([]);
  const [searchSymbol, setSearchSymbol] = useState('');

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
  };

  return (
    <SideBarContainer>
      <SearchBar placeholder="코인 심볼 검색" value={searchSymbol} onChange={(e) => setSearchSymbol(e.target.value)} />
      <ol>
        {coinList.map((coin) => {
          if (searchSymbol === '') return <SidebarItem key={coin.id} coinData={coin} />;
          if (coin.id.includes(searchSymbol)) return <SidebarItem key={coin.id} coinData={coin} />;
          return null;
        })}
      </ol>
    </SideBarContainer>
  );
}

export default SideBar;
