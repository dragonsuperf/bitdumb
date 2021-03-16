import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import CandleStickChart from './components/CandleStickChart';

axios.defaults.baseURL = 'https://api.bithumb.com/public';

export interface TickPrice {
  tickDate: Date;
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
  const candleStickApi = `/candlestick/${currency}_KRW/1m`;

  const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const newDate = `${data.date} ${data.time}`;
      const newCurrencyData = selectedCurrencyDatas;
      newCurrencyData.unshift();
      newCurrencyData.push({
        tickDate: new Date(Moment(newDate).format('HH:mm:SS')),
        minPrice: Number(data.lowPrice),
        startPrice: Number(data.openPrice),
        endPrice: Number(data.closePrice),
        maxPrice: Number(data.highPrice),
      })
      setSelectedCurrencyDatas(newCurrencyData);
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
        tickDate: Moment(data[0]).format('HH:mm:SS'),
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
