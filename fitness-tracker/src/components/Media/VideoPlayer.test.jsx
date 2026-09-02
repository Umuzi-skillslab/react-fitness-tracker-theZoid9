import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VideoPlayer from './VideoPlayer';

describe('VideoPlayer', () => {
  it('renders an iframe', () => {
    render(
      <VideoPlayer videoUrl="https://www.youtube.com/embed/test-video" />
    );

    const iframe = screen.getByTitle('Exercise demonstration');

    expect(iframe).toBeInTheDocument();
  });

  it('uses the provided video URL', () => {
    render(
      <VideoPlayer videoUrl="https://www.youtube.com/embed/test-video" />
    );

    const iframe = screen.getByTitle('Exercise demonstration');

    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/test-video'
    );
  });

  it('renders the provided title', () => {
    render(
      <VideoPlayer
        videoUrl="https://www.youtube.com/embed/test-video"
        title="Squat Demonstration"
      />
    );

    expect(
      screen.getByTitle('Squat Demonstration')
    ).toBeInTheDocument();
  });
});