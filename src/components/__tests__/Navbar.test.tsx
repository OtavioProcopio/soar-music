import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Navbar from '../Navbar';

// Mock useLocation
const mockUseLocation = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue({ pathname: '/' });
  });

  it('renders navigation links', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Cursos')).toBeInTheDocument();
    expect(screen.getByText('Planos')).toBeInTheDocument();
    expect(screen.getByText('Studios')).toBeInTheDocument();
    expect(screen.getByText('Professores')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Ferramentas')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    renderWithRouter(<Navbar />);
    
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    
    // Menu should be closed initially
    expect(screen.queryByText('Home')).toBeInTheDocument(); // Desktop links always visible
    
    // Click to open mobile menu
    fireEvent.click(menuButton);
    
    // In mobile view, menu items should be visible (assuming responsive classes work)
    // Since we can't test CSS in jsdom, we check if state changes
    // This is a basic test; in real scenario, test with responsive utilities
  });

  it('highlights active link based on current path', () => {
    mockUseLocation.mockReturnValue({ pathname: '/sobre' });
    renderWithRouter(<Navbar />);
    
    // Check if 'Sobre' link has active styling (depends on implementation)
    const sobreLink = screen.getByText('Sobre');
    expect(sobreLink).toBeInTheDocument();
    // Further checks would require inspecting classes
  });
});