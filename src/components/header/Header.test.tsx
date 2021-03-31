import React from 'react';
import { render, screen } from '@testing-library/react';
import store from '@/store/store';
import { Provider } from 'react-redux';
import Header from './Header';

const appStore = store();

describe('Header Component', () => {
  beforeAll(() => {
    render(
      <Provider store={appStore}>
        <Header />
      </Provider>,
    );
  });

  it('has title', () => {
    expect(screen.getByText('Bit')).toBeInTheDocument();
    expect(screen.getByText('dumb')).toBeInTheDocument();
  });
});
