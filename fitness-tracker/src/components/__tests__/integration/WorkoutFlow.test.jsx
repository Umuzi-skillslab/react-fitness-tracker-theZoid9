import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import WorkoutLog from '../../../components/WorkoutLog/WorkoutLog';
import exercisesData from '../../data/exercisesData';
import { useState } from "react";
// Integration test: End-to-end workout logging flow
// Tests form submission, localStorage persistence, and list rendering

describe('Workout Flow Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Test 49: User can fill out the workout log form and submit (interaction + integration)
  it('allows user to log a workout through the form', async () => {
    const user = userEvent.setup();

    const TestWrapper = () => {
      const [workoutHistory, setWorkoutHistory] = useState([]);

      return (
        <WorkoutLog
          exercises={exercisesData}
          workoutHistory={workoutHistory}
          setWorkoutHistory={setWorkoutHistory}
        />
      );
    };

    render(
      <MemoryRouter>
        <TestWrapper />
      </MemoryRouter>
    );

    const select = screen.getByLabelText('Exercise');
    await user.selectOptions(select, '1');

    await user.type(screen.getByLabelText('Sets'), '4');
    await user.type(screen.getByLabelText('Reps'), '10');
    await user.type(screen.getByLabelText('Weight (kg)'), '60');

    await user.click(
      screen.getByRole('button', { name: /log workout/i })
    );

    await waitFor(() => {
      const entries = screen.getAllByText('Barbell Bench Press');
      expect(entries).toHaveLength(2);
    });

    expect(
      screen.getByText(/4 sets.*10 reps.*60 kg/i)
    ).toBeInTheDocument();
  });

  // Test 50: Workout log persists to localStorage (hook test - useEffect)
  it('persists workout history to localStorage', async () => {
  const user = userEvent.setup();

  const TestWrapper = () => {
    const [workoutHistory, setWorkoutHistory] = useState([]);

      return (
        <WorkoutLog
          exercises={exercisesData}
          workoutHistory={workoutHistory}
          setWorkoutHistory={setWorkoutHistory}
        />
      );
    };

    render(
      <MemoryRouter>
        <TestWrapper />
      </MemoryRouter>
    );
    await user.selectOptions(screen.getByLabelText('Exercise'), '2');
    await user.type(screen.getByLabelText('Sets'), '3');
    await user.type(screen.getByLabelText('Reps'), '6');
    await user.type(screen.getByLabelText('Weight (kg)'), '80');
    await user.click(screen.getByRole('button', { name: /log workout/i }));

    await waitFor(() => {
      const stored = localStorage.getItem('workoutHistory');
      expect(stored).toBeTruthy();
      const history = JSON.parse(stored);
      expect(history).toHaveLength(1);
      expect(history[0].exerciseName).toBe('Squat');
    });
  });

  // Test 51: Empty state shown when no workouts logged (conditional rendering)
  it('shows empty state when no workouts have been logged', () => {
    render(
      <MemoryRouter>
        <WorkoutLog exercises={exercisesData} />
      </MemoryRouter>
    );
    expect(screen.getByText('No workouts logged yet')).toBeInTheDocument();
  });

  // Test 52: Validation error displayed when submitting without selecting exercise
  it('displays error when submitting without selecting exercise', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <WorkoutLog exercises={exercisesData} />
      </MemoryRouter>
    );

    // Try to submit without filling anything
    await user.click(screen.getByRole('button', { name: /log workout/i }));

    // Error message should appear
    await waitFor(() => {
      expect(screen.getByText('Please select an exercise.')).toBeInTheDocument();
    });
  });
});
