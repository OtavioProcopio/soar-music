import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamPage from '../TeamPage';

describe('TeamPage', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <TeamPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Mestres da/i)).toBeInTheDocument();
    // Use getAllByText as "Música" appears multiple times
    const musicElements = screen.getAllByText(/Música/i);
    expect(musicElements.length).toBeGreaterThan(0);
  });
});
