import { useState } from "react";

import ExerciseCard from "./ExerciseCard";
import SearchBar from "../UI/SearchBar";
import Loading from "../UI/Loading";

import styles from "./Exercise.module.css";
import commonStyles from "../common/common.module.css";

import {
  getUniqueValues,
  filterExercises,
  sortExercises,
} from "../utils/helpers";

const ExerciseList = ({
  exercises = [],
  workoutPlan = [],
  onSelectExercise,
  onAddToPlan,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [category, setCategory] = useState("all");

  const [muscleGroup, setMuscleGroup] =
    useState("all");

  const [difficulty, setDifficulty] =
    useState("all");

  const [sortBy, setSortBy] = useState("name");

  const [sortDirection, setSortDirection] =
    useState("asc");

  /*
   * Make sure null values don't crash the page.
   */
  const validExercises = exercises.filter(
    (exercise) => exercise !== null
  );

  /*
   * Filter options.
   */
  const categories = getUniqueValues(
    validExercises,
    "category"
  );

  const muscleGroups = getUniqueValues(
    validExercises,
    "muscleGroup"
  );

  const difficulties = getUniqueValues(
    validExercises,
    "difficulty"
  );

  /*
   * IDs currently in workout plan.
   */
  const planExerciseIds = workoutPlan
    .filter((exercise) => exercise !== null)
    .map((exercise) => exercise.id);

  /*
   * Filter.
   */
  const filteredExercises = filterExercises(
    validExercises,
    {
      searchTerm,
      category,
      muscleGroup,
      difficulty,
    }
  );

  /*
   * Sort.
   */
  const sortedExercises = sortExercises(
    filteredExercises,
    sortBy,
    sortDirection
  );

  /*
   * Select changes.
   */
  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value === sortBy) {
      setSortDirection((direction) =>
        direction === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(value);
      setSortDirection("asc");
    }
  };

  return (
    <div>

      {/* SEARCH */}
      <div className={styles.listHeader}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search exercises by name..."
        />
      </div>

      {/* FILTERS */}
      <div className={styles.listControls}>

        <select
          className={styles.filterSelect}
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          aria-label="Filter by category"
        >
          <option value="all">
            All Categories
          </option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={muscleGroup}
          onChange={(e) =>
            setMuscleGroup(e.target.value)
          }
          aria-label="Filter by muscle group"
        >
          <option value="all">
            All Muscle Groups
          </option>

          {muscleGroups.map((mg) => (
            <option key={mg} value={mg}>
              {mg}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
          aria-label="Filter by difficulty"
        >
          <option value="all">
            All Difficulties
          </option>

          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={sortBy}
          onChange={handleSortChange}
          aria-label="Sort exercises"
        >
          <option value="name">
            Sort by Name
          </option>

          <option value="difficulty">
            Sort by Difficulty
          </option>

          <option value="category">
            Sort by Category
          </option>

          <option value="muscleGroup">
            Sort by Muscle Group
          </option>
        </select>

      </div>

      {/* LOADING */}
      {isLoading ? (
        <Loading message="Loading exercises..." />
      ) : sortedExercises.length === 0 ? (

        <div className={commonStyles.emptyState}>
          <h3 className={commonStyles.emptyTitle}>
            No exercises found
          </h3>

          <p className={commonStyles.emptyMessage}>
            Try adjusting your search or filters.
          </p>
        </div>

      ) : (

        <div className={styles.exerciseGrid}>

          {sortedExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onSelect={onSelectExercise}
              onAddToPlan={onAddToPlan}
              isInPlan={planExerciseIds.includes(
                exercise.id
              )}
            />
          ))}

        </div>

      )}

    </div>
  );
};

export default ExerciseList;