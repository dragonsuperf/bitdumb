import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import CandleStickChart from './components/CandleStickChart';

axios.defaults.baseURL = 'https://api.bithumb.com/public';

export interface TickPrice {
  tickDate: string;
  minPrice: number;
  startPrice: number;
  endPrice: number;
  maxPrice: number;
}

function App() {
  const SOCKET_URL = 'wss://pubwss.bithumb.com/pub/ws';
  const SOCKET_API_SUB = `{"type":"ticker", "symbols": ["BTC_KRW"], "tickTypes": ["30M"]}`;

  const [currency, setCurrency] = useState('BTC');
  const [selectedCurrencyDatas, setSelectedCurrencyDatas] = useState<TickPrice[]>([]);
  const [currentPrice, setCurrentPrice] = useState<TickPrice>();
  const candleStickApi = `/candlestick/${currency}_KRW/1m`;

  const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data).content;
      if (data !== null && data !== undefined) {
        const newDate = Moment(`${data.date} ${data.time}`);
        let newTickData = {
          tickDate: newDate.format('HH:mm:ss'),
          minPrice: Number(data.openPrice),
          startPrice: Number(data.openPrice),
          endPrice: Number(data.closePrice),
          maxPrice: Number(data.closePrice),
        };

        const newCurrencyData = selectedCurrencyDatas;

        if (currentPrice === undefined) newCurrencyData.shift();
        else if (newDate.format('ss') === '00') {
          newTickData = {
            ...newTickData,
            minPrice: Math.min(newTickData.minPrice, currentPrice.endPrice),
            startPrice: currentPrice.startPrice,
            endPrice: currentPrice.endPrice,
            maxPrice: Math.max(newTickData.maxPrice, currentPrice.endPrice),
          };
          newCurrencyData.shift();
        } else {
          newTickData = {
            ...newTickData,
            minPrice: Math.min(newTickData.minPrice, currentPrice.endPrice),
            startPrice: currentPrice.startPrice,
            endPrice: currentPrice.endPrice,
            maxPrice: Math.max(newTickData.maxPrice, currentPrice.endPrice),
          };
          newCurrencyData.pop();
        }
        console.log(newTickData);
        setCurrentPrice(newTickData);

        newCurrencyData.push(newTickData);
        setSelectedCurrencyDatas(newCurrencyData);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    switch (readyState) {
      case ReadyState.OPEN:
        console.log('open');
        sendMessage(SOCKET_API_SUB);
        break;
      default:
        console.log('idle....');
        break;
    }
  }, [readyState]);

  const convertDataToTickPrice = (datas: any): TickPrice[] => {
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

  const getCurrentCryptoCurrency = () => {
    axios
      .get(candleStickApi)
      .then((response: any) => {
        const currentData = response.data.data;
        const currentDataLength = response.data.data.length;
        const newTickPriceList: TickPrice[] = convertDataToTickPrice(
          currentData.slice(currentDataLength - 100, currentDataLength - 1),
        );
        setSelectedCurrencyDatas(newTickPriceList);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCurrentCryptoCurrency();
  }, []);

  return (
    <>
      <div>React!</div>
      <CandleStickChart currencyDatas={selectedCurrencyDatas} />
    </>
  );
}

export default App;
