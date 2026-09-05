import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DayCard from './DayCard';

// Component test: DayCard renders day name and exercises, handles remove/clear
// Conditional rendering test: shows empty state when no exercises
describe('DayCard', () => {
  // Test 33: DayCard renders the day name
  it('renders the day name', () => {
    render(
      <DayCard
        day='monday'
        exercises={[]}
        onRemoveExercise={vi.fn()}
        onClearDay={vi.fn()}
      />
    );
    expect(screen.getByText('monday')).toBeInTheDocument();
  });

  // Test 34: DayCard shows empty state when no exercises (conditional rendering)
  it('shows empty message when no exercises', () => {
    render(
      <DayCard
        day='tuesday'
        exercises={[]}
        onRemoveExercise={vi.fn()}
        onClearDay={vi.fn()}
      />
    );
    expect(screen.getByText('No exercises planned. Add some!')).toBeInTheDocument();
  });

  // Test 35: DayCard renders exercise list when exercises are provided
  it('renders exercise items when exercises are provided', () => {
    const exercises = [
      { id: 1, name: 'Bench Press', sets: 4, reps: 8, muscleGroup: 'chest' },
      { id: 2, name: 'Squat', sets: 3, reps: 10, muscleGroup: 'legs' },
    ];
    render(
      <DayCard
        day='wednesday'
        exercises={exercises}
        onRemoveExercise={vi.fn()}
        onClearDay={vi.fn()}
      />
    );
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Squat')).toBeInTheDocument();
  });

  // Test 36: DayCard hides clear button when no exercises (conditional rendering with &&)
  it('hides clear button when no exercises', () => {
    render(
      <DayCard
        day='thursday'
        exercises={[]}
        onRemoveExercise={vi.fn()}
        onClearDay={vi.fn()}
      />
    );
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  // Test 37: DayCard shows clear button when exercises exist
  it('shows clear button when exercises exist', () => {
    render(
      <DayCard
        day='friday'
        exercises={[{ id: 1, name: 'Deadlift', sets: 4, reps: 5, muscleGroup: 'back' }]}
        onRemoveExercise={vi.fn()}
        onClearDay={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  // Test 38: DayCard calls onRemoveExercise when remove button is clicked
  it('calls onRemoveExercise with day and exercise ID', async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();
    render(
      <DayCard
        day='saturday'
        exercises={[{ id: 5, name: 'Pull-Up', sets: 3, reps: 8, muscleGroup: 'back' }]}
        onRemoveExercise={handleRemove}
        onClearDay={vi.fn()}
      />
    );
    await user.click(screen.getByLabelText('Remove Pull-Up'));
    expect(handleRemove).toHaveBeenCalledWith('saturday', 5);
  });
});
