import { combineReducers, Store } from 'redux';
import { SideBarState, sideBarReducer } from '@/services/sidebar/slice';
import { configureStore } from '@reduxjs/toolkit';

export interface StoreState {
  sidebar: SideBarState;
}

const sidebar = sideBarReducer;

const reducers = combineReducers<StoreState>({
  sidebar,
});

export default function createStore(): Store<StoreState> {
  const store = configureStore({
    reducer: reducers,
  });

  return store;
}
