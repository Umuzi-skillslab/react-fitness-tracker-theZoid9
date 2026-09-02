import { describe, it, expect, vi, afterEach } from "vitest";

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

describe("formatDuration", () => {
  it("returns 0s for zero", () => {
    expect(formatDuration(0)).toBe("0s");
  });

  it("returns 0s for negative values", () => {
    expect(formatDuration(-10)).toBe("0s");
  });

  it("formats seconds only", () => {
    expect(formatDuration(30)).toBe("30s");
  });

  it("formats minutes only", () => {
    expect(formatDuration(120)).toBe("2m");
  });

  it("formats minutes and seconds", () => {
    expect(formatDuration(90)).toBe("1m 30s");
  });
});

describe("formatDate", () => {
  it("returns empty string when no date is provided", () => {
    expect(formatDate("")).toBe("");
  });

  it("formats a valid date", () => {
    expect(formatDate("2026-01-15")).toBe("Jan 15, 2026");
  });
});

describe("calculateTotalWeight", () => {
  it("returns 0 when exercise is missing", () => {
    expect(calculateTotalWeight(null)).toBe(0);
  });

  it("returns 0 when weight is missing", () => {
    expect(
      calculateTotalWeight({ sets: 3 })
    ).toBe(0);
  });

  it("calculates total weight", () => {
    expect(
      calculateTotalWeight({
        weight: 50,
        sets: 4,
      })
    ).toBe(200);
  });
});

describe("calculateVolume", () => {
  it("returns 0 when exercise is missing", () => {
    expect(calculateVolume(null)).toBe(0);
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

  it("uses default values when properties are missing", () => {
    expect(
      calculateVolume({
        sets: 4,
      })
    ).toBe(0);
  });
});

describe("getDifficultyColor", () => {
  it("returns beginner color", () => {
    expect(getDifficultyColor("beginner")).toBe("#22c55e");
  });

  it("returns intermediate color", () => {
    expect(getDifficultyColor("intermediate")).toBe("#f59e0b");
  });

  it("returns advanced color", () => {
    expect(getDifficultyColor("advanced")).toBe("#ef4444");
  });

  it("returns default color for unknown difficulty", () => {
    expect(getDifficultyColor("unknown")).toBe("#6b7280");
  });
});

describe("capitalize", () => {
  it("returns empty string when no value is provided", () => {
    expect(capitalize("")).toBe("");
  });

  it("capitalizes the first letter", () => {
    expect(capitalize("squat")).toBe("Squat");
  });

  it("keeps the rest of the string unchanged", () => {
    expect(capitalize("bench press")).toBe("Bench press");
  });
});

describe("generateId", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates a string ID", () => {
    const id = generateId();

    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  it("generates different IDs", () => {
    const first = generateId();
    const second = generateId();

    expect(first).not.toBe(second);
  });
});

const exercises = [
  {
    name: "Bench Press",
    description: "Chest strength exercise",
    category: "strength",
    muscleGroup: "chest",
    difficulty: "intermediate",
  },
  {
    name: "Squat",
    description: "Leg strength exercise",
    category: "strength",
    muscleGroup: "legs",
    difficulty: "beginner",
  },
  {
    name: "Push Up",
    description: "Bodyweight chest exercise",
    category: "bodyweight",
    muscleGroup: "chest",
    difficulty: "beginner",
  },
];

describe("filterExercises", () => {
  it("returns all exercises with default filters", () => {
    const result = filterExercises(exercises, {});

    expect(result).toHaveLength(3);
  });

  it("filters by search term", () => {
    const result = filterExercises(exercises, {
      searchTerm: "bench",
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Bench Press");
  });

  it("searches descriptions", () => {
    const result = filterExercises(exercises, {
      searchTerm: "bodyweight",
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Push Up");
  });

  it("filters by category", () => {
    const result = filterExercises(exercises, {
      category: "bodyweight",
    });

    expect(result).toHaveLength(1);
  });

  it("filters by muscle group", () => {
    const result = filterExercises(exercises, {
      muscleGroup: "legs",
    });

    expect(result).toHaveLength(1);
  });

  it("filters by difficulty", () => {
    const result = filterExercises(exercises, {
      difficulty: "beginner",
    });

    expect(result).toHaveLength(2);
  });

  it("combines multiple filters", () => {
    const result = filterExercises(exercises, {
      category: "strength",
      muscleGroup: "chest",
      difficulty: "intermediate",
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Bench Press");
  });
});

describe("sortExercises", () => {
  it("sorts ascending by name", () => {
    const result = sortExercises(exercises, "name", "asc");

    expect(result.map((exercise) => exercise.name)).toEqual([
      "Bench Press",
      "Push Up",
      "Squat",
    ]);
  });

  it("sorts descending by name", () => {
    const result = sortExercises(exercises, "name", "desc");

    expect(result.map((exercise) => exercise.name)).toEqual([
      "Squat",
      "Push Up",
      "Bench Press",
    ]);
  });

  it("does not modify the original array", () => {
    const original = [...exercises];

    sortExercises(exercises, "name", "asc");

    expect(exercises).toEqual(original);
  });
});

describe("getUniqueValues", () => {
  it("returns unique sorted values", () => {
    const result = getUniqueValues(exercises, "muscleGroup");

    expect(result).toEqual(["chest", "legs"]);
  });

  it("removes duplicate values", () => {
    const result = getUniqueValues(exercises, "difficulty");

    expect(result).toEqual([
      "beginner",
      "intermediate",
    ]);
  });
});