import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import WorkoutPlanner from "./WorkoutPlanner";

vi.mock("./DayCard", () => ({
  default: ({ day }) => (
    <div data-testid="day-card">
      {day}
    </div>
  ),
}));

describe("WorkoutPlanner", () => {
  it("renders all days of the week", () => {
    render(<WorkoutPlanner />);

    expect(screen.getAllByTestId("day-card")).toHaveLength(7);

    expect(screen.getByText("monday")).toBeInTheDocument();
    expect(screen.getByText("sunday")).toBeInTheDocument();
  });

  it("calculates workout summary", () => {
    const workoutPlan = {
      monday: [
        { sets: 3, reps: 10 },
        { sets: 4, reps: 8 },
      ],
      wednesday: [
        { sets: 3, reps: 12 },
      ],
    };

    render(
      <WorkoutPlanner workoutPlan={workoutPlan} />
    );

    expect(screen.getByText("3")).toBeInTheDocument(); // exercises
    expect(screen.getByText("2")).toBeInTheDocument(); // active days
    expect(screen.getByText("10")).toBeInTheDocument(); // sets
    expect(screen.getByText("98")).toBeInTheDocument();// total reps
  });

  it("shows a success message", () => {
    render(
      <WorkoutPlanner
        message="Exercise added successfully"
        messageType="success"
      />
    );

    expect(
      screen.getByText(/Exercise added successfully/)
    ).toBeInTheDocument();
  });

  it("shows an error message", () => {
    render(
      <WorkoutPlanner
        message="Unable to remove exercise"
        messageType="error"
      />
    );

    expect(
      screen.getByText(/Unable to remove exercise/)
    ).toBeInTheDocument();
  });

  it("passes exercises and handlers to DayCard", () => {
    const onRemoveExercise = vi.fn();
    const onClearDay = vi.fn();

    const workoutPlan = {
      monday: [
        { id: 1, name: "Squat", sets: 3, reps: 10 },
      ],
    };

    render(
      <WorkoutPlanner
        workoutPlan={workoutPlan}
        onRemoveExercise={onRemoveExercise}
        onClearDay={onClearDay}
      />
    );

    expect(screen.getByText("monday")).toBeInTheDocument();
  });
});