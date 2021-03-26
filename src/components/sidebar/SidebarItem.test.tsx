import React from 'react';
import { screen, render } from '@testing-library/react';
import store from '@/store/store';
import { Provider } from 'react-redux';
import { Coin } from '@/types/coin';
import SidebarItem from './SidebarItem';

describe('SidebarItem Component', () => {
  const reduxStore = store();
  const coinData: Coin = {
    id: 'BTC',
    currentPrice: 100,
    prevPrice: 99,
    fluctate24H: 10,
    fluctateRate24H: 1,
    accTradeValue: 50010,
  };

  beforeAll(() => {
    render(
      <Provider store={reduxStore}>
        <SidebarItem coinData={coinData} />
      </Provider>,
    );
  });

  it('can print coin data', () => {
    expect(screen.getByText('BTC/KRW')).toBeInTheDocument();
  });
});
