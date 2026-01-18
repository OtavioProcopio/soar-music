import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    // Check for some expected text or elements
    expect(screen.getByText(/O lugar onde sua jornada musical começa/i)).toBeInTheDocument();
  });

  it('displays hero section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    // Assuming there's a hero with specific text
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  // Add more specific tests based on HomePage content
});