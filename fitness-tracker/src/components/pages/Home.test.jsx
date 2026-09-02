import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

vi.mock("../common/Header", () => ({
  default: ({ title, subtitle }) => (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
}));

vi.mock("../UI/Card", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock("../Media/AudioPlayer", () => ({
  default: ({ title }) => <div>{title}</div>,
}));

describe("Home", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows loading then the home page", async () => {
    render(
      <MemoryRouter>
        <Home workoutPlan={{}} workoutHistory={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByText("FitTracker Pro")).toBeInTheDocument();
  });

  it("displays workout statistics", async () => {
    render(
      <MemoryRouter>
        <Home
          workoutPlan={{
            monday: [{ id: 1 }, { id: 2 }],
            friday: [{ id: 3 }],
            sunday: [],
          }}
          workoutHistory={[{ id: 1 }, { id: 2 }]}
        />
      </MemoryRouter>
    );

    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByText("3")).toBeInTheDocument();

    expect(
      screen.getByText("Planned Exercises")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Active Days")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Workouts Logged")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Planned Exercises")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Active Days")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Workouts Logged")
    ).toBeInTheDocument();
  });

  it("displays the main sections", async () => {
    render(
      <MemoryRouter>
        <Home workoutPlan={{}} workoutHistory={[]} />
      </MemoryRouter>
    );

    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByText("Today's Focus")).toBeInTheDocument();
    expect(screen.getByText("Workout Audio")).toBeInTheDocument();
    expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
  });

  it("contains navigation links", async () => {
    render(
      <MemoryRouter>
        <Home workoutPlan={{}} workoutHistory={[]} />
      </MemoryRouter>
    );

    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    expect(
      screen.getByRole("link", { name: "DASHBOARD" })
    ).toHaveAttribute("href", "/progress");

    expect(
      screen.getByRole("link", { name: "Browse Exercises" })
    ).toHaveAttribute("href", "/exercises");

    expect(
      screen.getByRole("link", { name: "Open Planner" })
    ).toHaveAttribute("href", "/workout-planner");
  });
});