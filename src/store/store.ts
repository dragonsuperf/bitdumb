import { combineReducers, Store } from 'redux';

export interface StoreState {
  
}

const reducers = combineReducers<StoreState>({

});

export default function createStore(): Store<StoreState> {
  const store = configureSTore({
    reducer: reducers,
  })
}
