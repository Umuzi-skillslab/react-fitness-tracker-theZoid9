import { describe, it, expect } from "vitest";

import {
  formatDuration,
  formatDate,
  calculateTotalWeight,
  calculateVolume,
  getDifficultyColor,
  capitalize,
  generateId,
  filterExercises,
  sortExercises,
  getUniqueValues,
} from "./helpers";

describe("helpers", () => {
  it("formats duration", () => {
    expect(formatDuration(90)).toBe("1m 30s");
  });

  it("formats a date", () => {
    expect(formatDate("2026-01-15")).toBe("Jan 15, 2026");
  });

  it("calculates total weight", () => {
    expect(
      calculateTotalWeight({
        weight: 50,
        sets: 4,
      })
    ).toBe(200);
  });

  it("calculates volume", () => {
    expect(
      calculateVolume({
        sets: 4,
        reps: 10,
        weight: 50,
      })
    ).toBe(2000);
  });

  it("gets difficulty color", () => {
    expect(getDifficultyColor("beginner")).toBe("#22c55e");
  });

  it("capitalizes text", () => {
    expect(capitalize("squat")).toBe("Squat");
  });

  it("generates an ID", () => {
    const id = generateId();

    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  it("filters exercises", () => {
    const exercises = [
      {
        name: "Bench Press",
        description: "Chest exercise",
        category: "strength",
        muscleGroup: "chest",
        difficulty: "intermediate",
      },
      {
        name: "Squat",
        description: "Leg exercise",
        category: "strength",
        muscleGroup: "legs",
        difficulty: "beginner",
      },
    ];

    const result = filterExercises(exercises, {
      searchTerm: "bench",
    });

    expect(result).toHaveLength(1);
  });

  it("sorts exercises", () => {
    const exercises = [
      { name: "Squat" },
      { name: "Bench Press" },
    ];

    const result = sortExercises(exercises);

    expect(result[0].name).toBe("Bench Press");
  });

  it("gets unique values", () => {
    const exercises = [
      { muscleGroup: "chest" },
      { muscleGroup: "legs" },
      { muscleGroup: "chest" },
    ];

    expect(
      getUniqueValues(exercises, "muscleGroup")
    ).toEqual(["chest", "legs"]);
  });
});