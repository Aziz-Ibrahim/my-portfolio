import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { theme } from './theme';

test('renders the portfolio hero', () => {
  window.matchMedia = () => ({
    matches: false,
    media: '(prefers-reduced-motion)',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });

  render(
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  );

  expect(screen.getByRole('heading', { name: /aziz ibrahim/i })).toBeInTheDocument();
  expect(screen.getByText(/full-stack engineering portfolio/i)).toBeInTheDocument();
});
