import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CandleStickChart from './components/CandleStickChart';

axios.defaults.baseURL = 'https://api.bithumb.com/public';

export interface TickPrice {
  tickDate: number;
  startPrice: number;
  endPrice: number;
  maxPrice: number;
  minPrice: number;
}

function App() {
  const [currency, setCurrency] = useState('ADA');
  const [selectedCurrencyDatas, setSelectedCurrencyDatas] = useState<TickPrice[]>([]);
  const candleStickApi = `/candlestick/${currency}_KRW/1m`;
  const tickerApi = `/ticker/${currency}_KRW`;

  useEffect(() => {
    getCurrentCryptoCurrency();
  }, []);

  const convertDataToTickPrice = (datas: any): TickPrice[] => {
    return datas.map((data: any) => {
      return { 
        tickDate: Number(data[0]),
        startPrice: Number(data[1]),
        endPrice: Number(data[2]),
        maxPrice: Number(data[3]),
        minPrice: Number(data[4]),
      };
    });
  }

  const getCurrentCryptoCurrency = () => {
    axios.get(candleStickApi)
      .then((response) => { 
        const currentData = response.data.data;
        const currentDataLength = response.data.data.length;
        const newTickPriceList:TickPrice[] = convertDataToTickPrice(currentData.slice(currentDataLength - 10, currentDataLength - 1));
        setSelectedCurrencyDatas(newTickPriceList);
        //setTimeout(setSelectedCurrencyDatas, 950);
      })
      .catch(() => console.log('ERROR!'));
  };

  return (
    <>
      <div>React!</div>
      <CandleStickChart currencyDatas={selectedCurrencyDatas} />
    </>
  );
}

export default App;
