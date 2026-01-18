import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StudiosPage from '../StudiosPage';

describe('StudiosPage', () => {
  it('renders without crashing', () => {
    render(<StudiosPage />);
    expect(screen.getByText(/Nossas/i)).toBeInTheDocument();
    expect(screen.getByText(/Unidades/i)).toBeInTheDocument();
  });
});
