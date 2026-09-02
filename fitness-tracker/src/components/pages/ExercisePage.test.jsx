import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ExercisesPage from "./ExercisePage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../Exercise/ExerciseList", () => ({
  default: ({ exercises, onSelectExercise, onAddToPlan, isLoading }) => (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{exercises.length} exercises</p>

          <button onClick={() => onSelectExercise(1)}>
            Select Exercise
          </button>

          <button
            onClick={() =>
              onAddToPlan("monday", {
                id: 1,
                name: "Bench Press",
              })
            }
          >
            Add Exercise
          </button>
        </>
      )}
    </div>
  ),
}));

describe("ExercisesPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows loading then loads exercises", async () => {
    render(
      <ExercisesPage
        workoutPlan={{}}
        onAddToPlan={vi.fn()}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText("16 exercises")).toBeInTheDocument();
  });

  it("navigates when an exercise is selected", async () => {
    render(
      <ExercisesPage
        workoutPlan={{}}
        onAddToPlan={vi.fn()}
      />
    );

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    fireEvent.click(screen.getByText("Select Exercise"));

    expect(mockNavigate).toHaveBeenCalledWith("/exercises/1");
  });

  it("adds a new exercise", async () => {
    const onAddToPlan = vi.fn();

    render(
      <ExercisesPage
        workoutPlan={{}}
        onAddToPlan={onAddToPlan}
      />
    );

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    fireEvent.click(screen.getByText("Add Exercise"));

    expect(onAddToPlan).toHaveBeenCalledWith(
      "monday",
      { id: 1, name: "Bench Press" }
    );

    expect(mockNavigate).toHaveBeenCalled();
  });

  it("rejects a duplicate exercise", async () => {
    const onAddToPlan = vi.fn();

    render(
      <ExercisesPage
        workoutPlan={{
          monday: [{ id: 1, name: "Bench Press" }],
        }}
        onAddToPlan={onAddToPlan}
      />
    );

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    fireEvent.click(screen.getByText("Add Exercise"));

    expect(onAddToPlan).not.toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith(
      "/workout-planner",
      expect.objectContaining({
        state: expect.objectContaining({
          messageType: "error",
        }),
      })
    );
  });
});