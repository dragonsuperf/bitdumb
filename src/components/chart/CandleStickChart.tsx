import React from 'react';
import { Chart } from 'react-google-charts';
import styled from 'styled-components';
import { TickData } from '@/types/chart';
import ChartLoading from './ChartLoading';

const ChartItem = styled.div`
  flex-grow: 1;
  border-left: 1px solid ${(props) => props.theme.themeColor};
  margin: 5px;
  margin-bottom: 18px;
  min-height: 350px;
`;

interface ChartProps {
  chartTitle: string;
  currencyDatas: TickData[];
}

function CandleStickChart({ chartTitle, currencyDatas }: ChartProps) {
  const tickPriceToChartData = () => {
    if (currencyDatas === undefined) return false;

    const chartData: any[][] = [];

    currencyDatas.forEach((data: TickData) => {
      chartData.push(Object.values(data));
    });
    if (chartData.length > 100) chartData.shift();
    chartData.unshift(['Date', 'Price', 'startPrice', 'endPrice', 'maxPrice']);
    return chartData;
  };

  if (currencyDatas.length === 0) {
    return (
      <ChartItem>
        <ChartLoading />
      </ChartItem>
    );
  }

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
            titleTextStyle: {
              color: '#0a4297',
            },
          },
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    </ChartItem>
  );
}

export default CandleStickChart;
