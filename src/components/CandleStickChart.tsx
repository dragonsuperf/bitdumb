import { Chart } from 'react-google-charts';
import React from 'react';
import styled from 'styled-components';
import { TickPrice } from '../App';

const ChartItem = styled.div`
  flex-grow: 1;
  max-width: 50%;
`;

interface ChartProps {
  chartTitle: string;
  currencyDatas: TickPrice[];
}

function CandleStickChart({ chartTitle, currencyDatas }: ChartProps) {
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

  if (currencyDatas.length === 0) return null;

  return (
    <ChartItem>
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
            title: chartTitle,
            ticks: [22058, 22080, 22100, 22120],
          },
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    </ChartItem>
  );
}

export default CandleStickChart;
