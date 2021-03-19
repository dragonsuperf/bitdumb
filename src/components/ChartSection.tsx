import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import styled from 'styled-components';
import { TickData } from '@/types/chart';
import CandleStickChart from './chart/CandleStickChart';

const ChartContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

function ChartSection() {
  const [currency, setCurrency] = useState('BTC');

  const SOCKET_URL = 'wss://pubwss.bithumb.com/pub/ws';
  const SOCKET_API_SUB = `{"type":"ticker", "symbols": ["BTC_KRW"], "tickTypes": ["30M"]}`;
  const candleStickApi = `/candlestick/${currency}_KRW/1m`;

  const [prevTickDatas, setPrevTickDatas] = useState<TickData[]>([]);
  const [realtimeTickDatas, setRealtimeTickDatas] = useState<TickData[]>([]);
  const [currentPrice, setCurrentPrice] = useState('0');

  const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL);

  useEffect(() => {
    getPrevTickDatas();
  }, []);

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

        setCurrentPrice(newTickData.endPrice.toString());
        setRealtimeTickDatas([...realtimeTickDatas, newTickData]);
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
          currentData.slice(currentDataLength - 100, currentDataLength - 1),
        );
        setPrevTickDatas(newTickPriceList);
        setTimeout(getPrevTickDatas, 60000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ChartContainer>
      <CandleStickChart currencyDatas={prevTickDatas} chartTitle="이전 기록" />
      <CandleStickChart currencyDatas={realtimeTickDatas} chartTitle={`현재가: ${currentPrice} KRW`} />
    </ChartContainer>
  );
}

export default ChartSection;
