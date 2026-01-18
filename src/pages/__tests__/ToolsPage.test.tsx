import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ToolsPage from '../ToolsPage';

// Mock AudioContext and other Web APIs if needed
global.AudioContext = vi.fn().mockImplementation(() => ({
  createOscillator: vi.fn().mockReturnValue({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: { value: 0 },
    type: '',
  }),
  createGain: vi.fn().mockReturnValue({
    connect: vi.fn(),
    gain: {
      setValueAtTime: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
  }),
  destination: {},
  currentTime: 0,
  suspend: vi.fn(),
  close: vi.fn(),
}));

describe('ToolsPage', () => {
  it('renders without crashing', () => {
    render(<ToolsPage />);
    expect(screen.getByText(/Ferramentas do Músico/i)).toBeInTheDocument();
  });
});
