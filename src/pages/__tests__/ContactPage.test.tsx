import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactPage from '../ContactPage';

describe('ContactPage', () => {
  it('renders without crashing', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Fale com a/i)).toBeInTheDocument();
    expect(screen.getByText(/Soar/i)).toBeInTheDocument();
  });
});
