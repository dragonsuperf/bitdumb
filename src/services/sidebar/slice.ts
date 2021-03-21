import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SideBarState {
  selectedCoin: string;
}

const initialState: SideBarState = {
  selectedCoin: 'BTC',
};

const sideBarSlice = createSlice({
  name: 'sideBarSlice',
  initialState,
  reducers: {
    select(state, action: PayloadAction<{ coinId: string }>) {
      state.selectedCoin = action.payload.coinId;
      sessionStorage.setItem('selectedCoin', action.payload.coinId);
      return state;
    },
  },
});

export const sideBarReducer = sideBarSlice.reducer;
export const sideBarActions = sideBarSlice.actions;
