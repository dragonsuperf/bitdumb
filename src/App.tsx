import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CandleStickChart from './components/CandleStickChart';
import { convertTimestampToDateString } from './lib/utils';

axios.defaults.baseURL = 'https://api.bithumb.com/public';

export interface TickPrice {
  tickDate: string;
  minPrice: number;
  startPrice: number;
  endPrice: number;
  maxPrice: number;
}

function App() {
  const [currency, setCurrency] = useState('BTC');
  const [selectedCurrencyDatas, setSelectedCurrencyDatas] = useState<TickPrice[]>([]);
  const candleStickApi = `/candlestick/${currency}_KRW/1m`;
  // const tickerApi = `/ticker/${currency}_KRW`;

  const convertDataToTickPrice = (datas: any): TickPrice[] => {
    return datas.map((data: any) => {
      return {
        tickDate: convertTimestampToDateString(Number(data[0]), 'HM'),
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
          currentData.slice(currentDataLength - 50, currentDataLength - 1),
        );
        setSelectedCurrencyDatas(newTickPriceList);
        setTimeout(getCurrentCryptoCurrency, 950);
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
