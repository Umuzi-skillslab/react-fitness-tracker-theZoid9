import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';

// Component test: AudioPlayer renders with HTML5 audio element
// Multimedia requirement: proper audio controls with fallback
const mockProps = {
  audioUrl: 'https://example.com/audio.mp3',
  title: 'Workout Mix',
  duration: '3:45',
  description: 'High energy workout music',
};

describe('AudioPlayer', () => {
  // Test 39: AudioPlayer renders the title and description
  it('renders title and description', () => {
    render(<AudioPlayer {...mockProps} />);
    expect(screen.getByText('Workout Mix')).toBeInTheDocument();
    expect(screen.getByText('High energy workout music')).toBeInTheDocument();
  });

  // Test 40: AudioPlayer renders duration when provided
  it('renders duration', () => {
    render(<AudioPlayer {...mockProps} />);
    expect(screen.getByText('3:45')).toBeInTheDocument();
  });

  // Test 41: AudioPlayer renders an HTML5 audio element with controls
  it('renders an audio element with controls', () => {
    render(<AudioPlayer {...mockProps} />);
    const audio = document.querySelector('audio');
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('controls');
  });

  // Test 42: AudioPlayer includes fallback text for unsupported browsers
  it('includes fallback text for unsupported browsers', () => {
    render(<AudioPlayer {...mockProps} />);
    expect(screen.getByText('Your browser does not support the audio element.')).toBeInTheDocument();
  });
});