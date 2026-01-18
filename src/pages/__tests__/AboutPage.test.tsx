import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from '../AboutPage';

describe('AboutPage', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    
    expect(screen.getAllByText(/Nossa/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/História/i)).toBeInTheDocument();
  });

  it('displays main sections', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/História/i)).toBeInTheDocument();
    // Add more based on content
  });
});