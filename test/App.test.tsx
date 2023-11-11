import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from '../src/App';

test('renders 404 page for invalid route', () => {
  render(<App />, {
    wrapper: ({ children }) => <div data-testid="test-wrapper">{children}</div>,
  });

  window.history.pushState({}, 'Test Page', '/invalid-route');

  return Promise.resolve().then(() => {
    const notFoundContent = screen.getByText('Page not found');
    expect(notFoundContent).toBeInTheDocument();
  });
});
