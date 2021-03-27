import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import styled from 'styled-components';
import { TickData } from '@/types/chart';
import { StoreState } from '@/store/store';
import { useSelector } from 'react-redux';
import CandleStickChart from './CandleStickChart';

const CurrentCoinHeader = styled.div`
  padding: 5px;
  font-size: 25px;
`;

const ChartContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

function ChartSection() {
  const sidebarState = useSelector((state: StoreState) => state.sidebar);

  const SOCKET_URL = 'wss://pubwss.bithumb.com/pub/ws';
  const SOCKET_API_SUB = `{"type":"ticker", "symbols": ["${sidebarState.selectedCoin}_KRW"], "tickTypes": ["30M"]}`;
  const candleStickApi = `/candlestick/${sidebarState.selectedCoin}_KRW/1m`;

  const [prevTickDatas, setPrevTickDatas] = useState<TickData[]>([]);
  const [realtimeTickDatas, setRealtimeTickDatas] = useState<TickData[]>([]);
  const [currentPrice, setCurrentPrice] = useState('0');

  const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL);

  useEffect(() => {
    setInterval(getPrevTickDatas, 60000);
  }, []);

  useEffect(() => {
    getPrevTickDatas();
    sendMessage(SOCKET_API_SUB);
    setRealtimeTickDatas([]);
  }, [candleStickApi]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data).content;
      if (data !== null && data !== undefined) {
        const newDate = Moment(`${data.date} ${data.time}`);

        if (realtimeTickDatas.length === 0) {
          const newTickData: TickData = {
            tickDate: newDate.format('HH:mm:ss'),
            minPrice: Number(data.closePrice),
            startPrice: Number(data.closePrice),
            endPrice: Number(data.closePrice),
            maxPrice: Number(data.closePrice),
          };
          setRealtimeTickDatas([...realtimeTickDatas, newTickData]);
          return;
        }
        const prevTickData = realtimeTickDatas[realtimeTickDatas.length - 1];
        const newTickData: TickData = {
          tickDate: newDate.format('HH:mm:ss'),
          minPrice: Number(Math.min(prevTickData.endPrice, data.closePrice)),
          startPrice: Number(prevTickData.endPrice),
          endPrice: Number(data.closePrice),
          maxPrice: Number(Math.max(prevTickData.endPrice, data.closePrice)),
        };

        const priceNow = newTickData.endPrice.toString();
        setCurrentPrice(priceNow);
        document.title = `Bitdumb ${priceNow} ${sidebarState.selectedCoin}/KRW`;
        const newRealTimeTickDatas = [...realtimeTickDatas, newTickData];
        if (newRealTimeTickDatas.length > 50) newRealTimeTickDatas.shift();
        setRealtimeTickDatas(newRealTimeTickDatas);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    switch (readyState) {
      case ReadyState.OPEN:
        sendMessage(SOCKET_API_SUB);
        break;
      default:
        break;
    }
  }, [readyState]);

  const convertDataToTickPrice = (datas: any): TickData[] => {
    return datas.map((data: any) => {
      return {
        tickDate: Moment(data[0]).format('HH:mm:ss'),
        minPrice: Number(data[4]),
        startPrice: Number(data[1]),
        endPrice: Number(data[2]),
        maxPrice: Number(data[3]),
      };
    });
  };

  const getPrevTickDatas = () => {
    axios
      .get(candleStickApi)
      .then((response: any) => {
        const currentData = response.data.data;
        const currentDataLength = response.data.data.length;
        const newTickPriceList: TickData[] = convertDataToTickPrice(
          currentData.slice(currentDataLength - 50, currentDataLength - 1),
        );
        setPrevTickDatas(newTickPriceList);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ChartContainer>
      <CurrentCoinHeader>{sidebarState.selectedCoin}</CurrentCoinHeader>
      <CandleStickChart currencyDatas={prevTickDatas} chartTitle="이전 기록" />
      <CandleStickChart currencyDatas={realtimeTickDatas} chartTitle={`현재가: ${currentPrice} KRW`} />
    </ChartContainer>
  );
}

export default ChartSection;
