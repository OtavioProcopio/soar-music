import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CoursesPage from '../CoursesPage';

describe('CoursesPage', () => {
  it('renders without crashing', () => {
    render(<CoursesPage />);
    expect(screen.getByText(/Nossos/i)).toBeInTheDocument();
    expect(screen.getByText(/Cursos/i)).toBeInTheDocument();
  });
});
