import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Coin } from '@/types/coin';
import { StoreState } from '@/store/store';
import { useSelector } from 'react-redux';
import SidebarItem from './SidebarItem';

const SideBarContainer = styled.aside<{ visible: boolean }>`
  border-left: 1px solid ${(props) => props.theme.weakBorder};
  border-bottom: 1px solid ${(props) => props.theme.weakBorder};
  flex-direction: column;
  & > ol {
    max-height: calc(92vh - 50px);
    overflow-y: scroll;
  }
  @media only screen and (${(props) => props.theme.tablet}) {
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
    position: fixed;
    right: 0px;
    max-height: 100vh;
    transition: all 0.3s;
    min-width: 280px;
    width: ${(props) => (props.visible ? '60%' : '0%')};
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
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;

function SideBar() {
  const sidebarState = useSelector((state: StoreState) => state.sidebar);
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
    <SideBarContainer visible={sidebarState.visible}>
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
