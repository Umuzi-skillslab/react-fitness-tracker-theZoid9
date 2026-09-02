import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseCard from './ExerciseCard';

// Mock exercise for testing
const mockExercise = {
  id: 1,
  name: 'Bench Press',
  description: 'A compound chest exercise for building strength.',
  category: 'strength',
  muscleGroup: 'chest',
  difficulty: 'intermediate',
  sets: 4,
  reps: 8,
  restTime: 90,
  image: '🏋️',
};

// Component + interaction test: ExerciseCard renders correctly and handles clicks
describe('ExerciseCard', () => {
  // Test 28: ExerciseCard renders exercise name and description
  it('renders exercise name and description', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        onSelect={vi.fn()}
        onAddToPlan={vi.fn()}
      />
    );
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('A compound chest exercise for building strength.')).toBeInTheDocument();
  });

  // Test 29: ExerciseCard shows "In Plan" indicator when isInPlan is true (conditional rendering)
  it('shows Add to Plan button when exercise is in plan', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        isInPlan={true}
        onSelect={vi.fn()}
        onAddToPlan={vi.fn()}
      />
    );

    expect(
      screen.getByRole('button', { name: 'Add to Plan' })
    ).toBeInTheDocument();
  });

  // Test 30: ExerciseCard hides in-plan indicator when isInPlan is false
  it('does not show in-plan indicator when isInPlan is false', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        onSelect={vi.fn()}
        onAddToPlan={vi.fn()}
        isInPlan={false}
      />
    );
    expect(screen.queryByText('Already in your workout plan')).not.toBeInTheDocument();
  });

  // Test 31: ExerciseCard calls onSelect when View Details is clicked (parent-child event flow)
  it('calls onSelect with exercise ID when View Details is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(
      <ExerciseCard
        exercise={mockExercise}
        onSelect={handleSelect}
        onAddToPlan={vi.fn()}
      />
    );
    await user.click(screen.getByText('View Details'));
    expect(handleSelect).toHaveBeenCalledWith(1);
  });

  
  it('calls onAddToPlan with day and exercise when a day is selected', async () => {
    const user = userEvent.setup();
    const handleAdd = vi.fn();

    render(
      <ExerciseCard
        exercise={mockExercise}
        onSelect={vi.fn()}
        onAddToPlan={handleAdd}
      />
    );

    // Step 1: Open the day picker
    await user.click(
      screen.getByRole('button', { name: 'Add to Plan' })
    );

    // Step 2: Select a day
    await user.click(
      screen.getByRole('button', { name: 'monday' })
    );

    // Step 3: Check the function was called
    expect(handleAdd).toHaveBeenCalledWith(
      'monday',
      mockExercise
    );
  });
});
