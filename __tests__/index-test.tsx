import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

test('loads and displays greeting', () => {
  render(<Home />, {});
  expect(screen.getByRole('heading')).toHaveTextContent('Hello World!');
});
