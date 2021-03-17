<<<<<<< HEAD
import React from 'react';
import { BoxPlotChart } from '@toast-ui/react-chart';
import DoughnutChart from './components/DoughnutChart';

function App() {
  const data = {
    categories: ['Budget', 'Income', 'Expenses', 'Debt'],
    series: [
      {
        name: '2020',
        data: [
          [1000, 2500, 3714, 5500, 7000],
          [1000, 2750, 4571, 5250, 8000],
          [3000, 4000, 4714, 6000, 7000],
          [1000, 2250, 3142, 4750, 6000],
        ],
        outliers: [
          [0, 14000],
          [2, 10000],
          [3, 9600],
        ],
      },
      {
        name: '2021',
        data: [
          [2000, 4500, 6714, 11500, 13000],
          [3000, 5750, 7571, 8250, 9000],
          [5000, 8000, 8714, 9000, 10000],
          [7000, 9250, 10142, 11750, 12000],
        ],
        outliers: [[1, 14000]],
      },
    ],
  };

  const options = {
    chart: {
      height: 500,
      width: 1000,
      title: 'Monthly Revenue',
    },
  };

  const chart = <BoxPlotChart options={options} data={data} />;
=======
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
  const candleStickApi = `/candlestick/${currency}_KRW/1m`;

  const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data).content;
      if (data !== null && data !== undefined) {
        const newDate = Moment(`${data.date} ${data.time}`).format('HH:mm:ss');
        const newCurrencyData = selectedCurrencyDatas;
        console.log(data);
        newCurrencyData.shift();
        newCurrencyData.push({
          tickDate: newDate,
          minPrice: Number(data.lowPrice),
          startPrice: Number(data.openPrice),
          endPrice: Number(data.closePrice),
          maxPrice: Number(data.highPrice),
        });
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
>>>>>>> 9a5cb9474d9687f5a962939f713a9f316649bada

  return (
    <>
      <div>React!</div>
<<<<<<< HEAD
      <DoughnutChart />
      {chart}
=======
      <CandleStickChart currencyDatas={selectedCurrencyDatas} />
>>>>>>> 9a5cb9474d9687f5a962939f713a9f316649bada
    </>
  );
}

export default App;
