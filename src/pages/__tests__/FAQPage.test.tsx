import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FAQPage from '../FAQPage';

describe('FAQPage', () => {
  it('renders without crashing', () => {
    render(<FAQPage />);
    expect(screen.getByText(/Perguntas Frequentes/i)).toBeInTheDocument();
  });
});
