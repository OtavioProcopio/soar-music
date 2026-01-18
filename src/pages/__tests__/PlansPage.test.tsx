import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlansPage from '../PlansPage';

describe('PlansPage', () => {
  it('renders without crashing', () => {
    render(<PlansPage />);
    expect(screen.getByText(/Escolha sua/i)).toBeInTheDocument();
    expect(screen.getByText(/Trajetória/i)).toBeInTheDocument();
  });
});
