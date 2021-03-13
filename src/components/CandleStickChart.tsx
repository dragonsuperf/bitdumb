import React, { useEffect, useState } from 'react';
import { BoxPlotChart } from '@toast-ui/react-chart';
import '@toast-ui/chart/dist/toastui-chart.css';
import { TickPrice } from '../App';

interface CandleStickChartProps {
  currencyDatas: TickPrice[];
}

interface Series {
  name: string;
  data: number[][];
}

interface ChartData {
  categories: string[];
  series: Series[];
}

function CandleStickChart({ currencyDatas }: CandleStickChartProps) {
  const [chartDatas, setChartDatas] = useState<ChartData>();

  useEffect(() => {
    convertCurrencyDataToChartData();
  }, [currencyDatas]);

  useEffect(() => {
    console.log(chartDatas);
  }, [chartDatas]);

  const convertCurrencyDataToChartData = () => {
    const newCategories: string[] = [];
    const lowSeriesDatas: number[][] = [];
    const highSeriesDatas: number[][] = [];
    
    if ( currencyDatas === undefined ) return;
    currencyDatas.map((data) => {
      newCategories.push(data.tickDate.toString());

      const name: string = data.startPrice > data.endPrice ? 'high' : 'low';
      const datas = [
        data.minPrice,
        data.startPrice,
        (data.startPrice + data.endPrice) / 2,
        data.endPrice,
        data.maxPrice,
      ];
      if (name === 'low')
        lowSeriesDatas.push(datas);
      else 
        highSeriesDatas.push(datas);
    });
    
    const newSeries: Series[] = [];
    newSeries.push({ name: 'low', data: lowSeriesDatas });
    newSeries.push({ name: 'high', data: highSeriesDatas });
    console.log(newSeries);
    setChartDatas({ 
      categories: newCategories,
      series: newSeries,
    });
  }

  const data = {
    categories: ["1615643340000", "1615643400000", "1615643460000", "1615643520000", "1615643580000", "1615643640000", "1615643700000", "1615643760000", "1615643820000"],
    series: [
      {
        name: '2020',
        data: [
          [1292, 1293, 1295.5, 1298, 1298],
          [1296, 1297, 1298.5, 1300, 1300],
          [1298, 1298, 1299, 1300, 1302],
          [1300, 1300, 1301.5, 1303, 1303]
        ],
      },
      {
        name: '2021',
        data: [
          [1296, 1299, 1297.5, 1296, 1299],
          [1303, 1306, 1304.5, 1303, 1306],
        ],
      },
    ],
  };
  const options = {
    chart: {
      height: 600,
      width: 1000,
      title: 'Test!',
    },
  };

  if (chartDatas !== undefined)
    return <BoxPlotChart data-testid="chart" data={chartDatas} options={options} />;
  else
    return <></>;
}

export default CandleStickChart;
