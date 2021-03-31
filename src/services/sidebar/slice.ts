import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SideBarState {
  visible: boolean;
  selectedCoin: string;
}

const initialState: SideBarState = {
  visible: false,
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
    toggleVisibility(state) {
      state.visible = !state.visible;
      return state;
    },
  },
});

export const sideBarReducer = sideBarSlice.reducer;
export const sideBarActions = sideBarSlice.actions;
