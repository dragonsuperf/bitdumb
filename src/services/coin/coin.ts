import { createSlice } from '@reduxjs/toolkit';
import { Coin } from '@/types/coin';

export interface CoinState {
  selectedCoin: Coin;
}

const coinInitialState: CoinState = {
  selectedCoin: {
    id: '',
    currentPrice: 0,
    prevPrice: 0,
    fluctate24H: 0,
    fluctateRate24H: 0,
    accTradeValue: 0,
  },
};

const coinSlice = createSlice({
  name: 'coinSlice',
  coinInitialState,
  reducers: {

  }
});