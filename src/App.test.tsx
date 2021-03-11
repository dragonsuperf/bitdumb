import React from 'react';
import { screen, render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  beforeAll(() => {
    render(<App />);
  });

  it('should have message', () => {
    const message = 'React!';

    expect(screen.getByText(message)).toBeInTheDocument();
  })
});
