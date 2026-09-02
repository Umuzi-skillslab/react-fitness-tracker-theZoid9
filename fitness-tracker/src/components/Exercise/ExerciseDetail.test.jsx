import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import ExerciseDetail from "./ExerciseDetail";

// Mock React Router
vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

// Mock VideoPlayer so we test ExerciseDetail,
// not VideoPlayer itself
vi.mock("../Media/VideoPlayer", () => ({
  default: ({ videoUrl, title, description }) => (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{videoUrl}</div>
    </div>
  ),
}));

import { useParams, useNavigate } from "react-router-dom";

const mockNavigate = vi.fn();

const mockExercises = [
  {
    id: 1,
    name: "Bench Press",
    description: "A compound chest exercise for building strength.",
    category: "strength",
    muscleGroup: "chest",
    difficulty: "intermediate",
    equipment: "Barbell",
    instructions: [
      "Lie on the bench.",
      "Grip the bar.",
      "Lower the bar to your chest.",
      "Press the bar upward.",
    ],
    sets: 4,
    reps: 8,
    restTime: 90,
    videoUrl: "https://youtube.com/watch?v=bench123",
  },
  {
    id: 2,
    name: "Squat",
    description: "A lower-body compound exercise.",
    category: "strength",
    muscleGroup: "legs",
    difficulty: "beginner",
    equipment: "Barbell",
    instructions: [
      "Stand with your feet shoulder-width apart.",
      "Lower your body.",
      "Return to the starting position.",
    ],
    sets: 3,
    reps: 10,
    restTime: 60,
    videoUrl: "https://youtube.com/watch?v=squat123",
  },
  {
    id: 3,
    name: "Push Up",
    description: "A bodyweight upper-body exercise.",
    category: "bodyweight",
    muscleGroup: "chest",
    difficulty: "beginner",
    equipment: "",
    instructions: [
      "Start in a plank position.",
      "Lower your chest.",
      "Push yourself back up.",
    ],
    sets: 3,
    reps: 15,
    restTime: 45,
  },
];

describe("ExerciseDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useParams.mockReturnValue({ id: "1" });
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("shows loading state before displaying exercise details", () => {
    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    expect(
      screen.getByText("Loading exercise details...")
    ).toBeInTheDocument();
  });

  it("displays exercise details after loading", async () => {
    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    expect(
      await screen.findByRole("heading", {
        name: "Bench Press",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "A compound chest exercise for building strength."
      )
    ).toBeInTheDocument();

    expect(screen.getByText("strength")).toBeInTheDocument();
    expect(screen.getByText("chest")).toBeInTheDocument();
    expect(screen.getByText("intermediate")).toBeInTheDocument();

    expect(screen.getByText("Sets").parentElement).toHaveTextContent("4");
    expect(screen.getByText("Reps").parentElement).toHaveTextContent("8");
    expect(screen.getByText("Equipment").parentElement).toHaveTextContent("Barbell");
  });

  it("displays all exercise instructions", async () => {
    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Bench Press",
    });

    expect(
      screen.getByText("Lie on the bench.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Grip the bar.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Lower the bar to your chest.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Press the bar upward.")
    ).toBeInTheDocument();
  });

  it("displays the video when videoUrl exists", async () => {
    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Bench Press",
    });

    expect(
      screen.getByText("Exercise Demonstration")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Bench Press Demonstration")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Watch how to perform Bench Press correctly."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "https://youtube.com/watch?v=bench123"
      )
    ).toBeInTheDocument();
  });

  it("does not display video section when videoUrl is missing", async () => {
    useParams.mockReturnValue({ id: "3" });

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Push Up",
    });

    expect(
      screen.queryByText("Exercise Demonstration")
    ).not.toBeInTheDocument();
  });

  it("uses None when exercise has no equipment", async () => {
    useParams.mockReturnValue({ id: "3" });

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Push Up",
    });

    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("calls onAddToPlan with the exercise", async () => {
    const user = userEvent.setup();
    const handleAdd = vi.fn();

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={handleAdd}
      />
    );

    await screen.findByRole("heading", {
      name: "Bench Press",
    });

    await user.click(
      screen.getByRole("button", {
        name: "+ Add to Workout Plan",
      })
    );

    expect(handleAdd).toHaveBeenCalledWith(
      mockExercises[0]
    );
  });

  it("navigates back to exercises when Back to Exercises is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Bench Press",
    });

    await user.click(
      screen.getByRole("button", {
        name: "← Back to Exercises",
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/exercises"
    );
  });

  it("navigates to the previous exercise", async () => {
    const user = userEvent.setup();

    useParams.mockReturnValue({ id: "2" });

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Squat",
    });

    await user.click(
      screen.getByRole("button", {
        name: "← Previous",
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/exercises/1"
    );
  });

  it("navigates to the next exercise", async () => {
    const user = userEvent.setup();

    useParams.mockReturnValue({ id: "2" });

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Squat",
    });

    await user.click(
      screen.getByRole("button", {
        name: "Next →",
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/exercises/3"
    );
  });

  it("disables Previous on the first exercise", async () => {
    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Bench Press",
    });

    expect(
      screen.getByRole("button", {
        name: "← Previous",
      })
    ).toBeDisabled();
  });

  it("disables Next on the last exercise", async () => {
    useParams.mockReturnValue({ id: "3" });

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Push Up",
    });

    expect(
      screen.getByRole("button", {
        name: "Next →",
      })
    ).toBeDisabled();
  });

  it("shows Exercise Not Found for an invalid ID", async () => {
    useParams.mockReturnValue({ id: "999" });

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    expect(
      await screen.findByRole("heading", {
        name: "Exercise Not Found",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("No exercise found with ID: 999")
    ).toBeInTheDocument();
  });

  it("navigates back when Back to Exercises is clicked from not found", async () => {
    const user = userEvent.setup();

    useParams.mockReturnValue({ id: "999" });

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Exercise Not Found",
    });

    await user.click(
      screen.getByRole("button", {
        name: "Back to Exercises",
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/exercises"
    );
  });

  it("does not navigate previous when already on first exercise", async () => {
    const user = userEvent.setup();

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Bench Press",
    });

    await user.click(
      screen.getByRole("button", {
        name: "← Previous",
      })
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("does not navigate next when already on last exercise", async () => {
    const user = userEvent.setup();

    useParams.mockReturnValue({ id: "3" });

    render(
      <ExerciseDetail
        exercises={mockExercises}
        onAddToPlan={vi.fn()}
      />
    );

    await screen.findByRole("heading", {
      name: "Push Up",
    });

    await user.click(
      screen.getByRole("button", {
        name: "Next →",
      })
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});