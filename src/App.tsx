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

  return (
    <>
      <div>React!</div>
      <DoughnutChart />
      {chart}
    </>
  );
}

export default App;
