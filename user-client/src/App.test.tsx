import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar', () => {
  render(<App />);
  const navbar = screen.getByText(/Home/i);
  expect(navbar).toBeInTheDocument();
});
