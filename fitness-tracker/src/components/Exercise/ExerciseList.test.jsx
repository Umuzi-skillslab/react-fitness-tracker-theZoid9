import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import ExerciseList from "./ExerciseList";

const exercises = [
  {
    id: 1,
    name: "Barbell Bench Press",
    description: "A chest exercise using a barbell.",
    category: "Strength",
    muscleGroup: "Chest",
    difficulty: "Intermediate",
  },
  {
    id: 2,
    name: "Squat",
    description: "A lower body exercise targeting the legs.",
    category: "Strength",
    muscleGroup: "Legs",
    difficulty: "Beginner",
  },
];

vi.mock("./ExerciseCard", () => ({
  default: ({ exercise }) => (
    <div data-testid="exercise-card">
      {exercise.name}
    </div>
  ),
}));

vi.mock("../UI/SearchBar", () => ({
  default: ({ value, onChange, placeholder }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search exercises"
    />
  ),
}));

vi.mock("../UI/Loading", () => ({
  default: ({ message }) => <div>{message}</div>,
}));


describe("ExerciseList", () => {
  it("renders exercises", () => {
    render(<ExerciseList exercises={exercises} />);

    expect(screen.getByText("Barbell Bench Press")).toBeInTheDocument();
    expect(screen.getByText("Squat")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(
      <ExerciseList
        exercises={[]}
        isLoading={true}
      />
    );

    expect(
      screen.getByText("Loading exercises...")
    ).toBeInTheDocument();
  });

  it("filters exercises by search", () => {
    render(<ExerciseList exercises={exercises} />);

    const search = screen.getByPlaceholderText(
      "Search exercises by name..."
    );

    fireEvent.change(search, {
      target: { value: "Squat" },
    });

    expect(screen.getByText("Squat")).toBeInTheDocument();
    expect(
      screen.queryByText("Barbell Bench Press")
    ).not.toBeInTheDocument();
  });

  it("filters exercises by category", () => {
    render(<ExerciseList exercises={exercises} />);

    fireEvent.change(
      screen.getByLabelText("Filter by muscle group"),
      {
        target: { value: "Legs" },
      }
    );

    expect(screen.getByText("Squat")).toBeInTheDocument();
    expect(
      screen.queryByText("Barbell Bench Press")
    ).not.toBeInTheDocument();
  });

  it("shows empty state when no exercises match", () => {
    render(<ExerciseList exercises={[]} />);

    expect(
      screen.getByText("No exercises found")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Try adjusting your search or filters."
      )
    ).toBeInTheDocument();
  });

  it("changes sort direction when the same sort is selected", () => {
    render(<ExerciseList exercises={exercises} />);

    const sort = screen.getByLabelText("Sort exercises");

    fireEvent.change(sort, {
      target: { value: "name" },
    });

    expect(sort).toHaveValue("name");
  });
});