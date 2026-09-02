import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

// Component test: VideoPlayer renders HTML5 video element with controls and fallback
describe('VideoPlayer', () => {
  // Test 43: VideoPlayer renders an HTML5 video element with controls
  it('renders a video element with controls', () => {
    render(<VideoPlayer videoUrl='https://example.com/video.mp4' />);
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('controls');
  });

  // Test 44: VideoPlayer includes fallback text
  it('includes fallback text for unsupported browsers', () => {
    render(<VideoPlayer videoUrl='https://example.com/video.mp4' />);
    expect(screen.getByText('Your browser does not support the video tag.')).toBeInTheDocument();
  });

  // Test 45: VideoPlayer renders title when provided
  it('renders title when provided', () => {
    render(<VideoPlayer videoUrl='https://example.com/video.mp4' title='Demo Video' />);
    expect(screen.getByText('Demo Video')).toBeInTheDocument();
  });
});
