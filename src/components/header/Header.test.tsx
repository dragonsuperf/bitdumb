import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  beforeAll(() => {
    render(<Header />);
  });

  it('has title', () => {
    expect(screen.getByText('Bit')).toBeInTheDocument();
    expect(screen.getByText('dumb')).toBeInTheDocument();
  });
});
