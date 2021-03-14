import { Chart } from 'react-google-charts';
import React from 'react';
import { TickPrice } from '../App';

interface ChartProps {
  currencyDatas: TickPrice[];
}

function CandleStickChart({ currencyDatas }: ChartProps) {
  const tickPriceToChartData = () => {
    if (currencyDatas === undefined) return false;

    const chartData = [];
    chartData.push(['Date', 'Price', 'startPrice', 'endPrice', 'maxPrice']);

    // eslint-disable-next-line array-callback-return
    currencyDatas.map((data: TickPrice) => {
      chartData.push(Object.values(data));
    });
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
      }}
      rootProps={{ 'data-testid': '2' }}
    />
  );
}

export default CandleStickChart;
