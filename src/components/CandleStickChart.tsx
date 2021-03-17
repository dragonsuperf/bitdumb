import { Chart } from 'react-google-charts';
import React from 'react';
import { TickPrice } from '../App';

interface ChartProps {
  currencyDatas: TickPrice[];
}

function CandleStickChart({ currencyDatas }: ChartProps) {
  const tickPriceToChartData = () => {
    if (currencyDatas === undefined) return false;

    const chartData: any[][] = [];

    // eslint-disable-next-line array-callback-return
    currencyDatas.map((data: TickPrice) => {
      chartData.push(Object.values(data));
    });
    if (chartData.length > 100) chartData.shift();
    chartData.unshift(['Date', 'Price', 'startPrice', 'endPrice', 'maxPrice']);
    return chartData;
  };

  return (
    <Chart
      height={350}
      chartType="CandlestickChart"
      loader={<div>Loading Chart</div>}
      data={tickPriceToChartData()}
      options={{
        legend: 'none',
        bar: { groupWidth: '50%' }, // Remove space between bars.
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: '#0051c7' },
          risingColor: { strokeWidth: 0, fill: '#a52714' },
        },
        hAxis: {
          title: 'test',
          ticks: [22058, 22080, 22100, 22120],
        },
      }}
      rootProps={{ 'data-testid': '2' }}
    />
  );
}

export default CandleStickChart;
