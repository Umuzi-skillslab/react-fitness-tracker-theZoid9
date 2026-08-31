import { useState } from 'react';
import ExerciseCard from './ExerciseCard';
import SearchBar from '../UI/SearchBar';
import Loading from '../UI/Loading';
import styles from './Exercise.module.css';
import commonStyles from '../common/common.module.css';
import {
  getUniqueValues,
  filterExercises,
  sortExercises,
} from '../utils/helpers';

const ExerciseList = ({
  exercises = [],
  workoutPlan = [],
  onSelectExercise,
  onAddToPlan,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Remove null/undefined exercises before doing anything with them
  const validExercises = exercises.filter(
    (exercise) => exercise !== null && exercise !== undefined
  );

  // Filter options
  const categories = getUniqueValues(validExercises, 'category');
  const muscleGroups = getUniqueValues(validExercises, 'muscleGroup');
  const difficulties = getUniqueValues(validExercises, 'difficulty');

  // Exercise IDs in workout plan
  const planExerciseIds = workoutPlan
    .filter((exercise) => exercise !== null && exercise !== undefined)
    .map((exercise) => exercise.id);

  // Filter
  const filteredExercises = filterExercises(validExercises, {
    searchTerm,
    category,
    muscleGroup,
    difficulty,
  });

  // Sort
  const sortedExercises = sortExercises(
    filteredExercises,
    sortBy,
    sortDirection
  );

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleMuscleChange = (e) => {
    setMuscleGroup(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value === sortBy) {
      setSortDirection((direction) =>
        direction === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortBy(value);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      {/* Search */}
      <div className={styles.listHeader}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search exercises by name..."
        />
      </div>

      {/* Filters */}
      <div className={styles.listControls}>
        <select
          className={styles.filterSelect}
          value={category}
          onChange={handleCategoryChange}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={muscleGroup}
          onChange={handleMuscleChange}
          aria-label="Filter by muscle group"
        >
          <option value="all">All Muscle Groups</option>

          {muscleGroups.map((muscle) => (
            <option key={muscle} value={muscle}>
              {muscle}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={difficulty}
          onChange={handleDifficultyChange}
          aria-label="Filter by difficulty"
        >
          <option value="all">All Difficulties</option>

          {difficulties.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={sortBy}
          onChange={handleSortChange}
          aria-label="Sort exercises"
        >
          <option value="name">Sort by Name</option>
          <option value="difficulty">Sort by Difficulty</option>
          <option value="category">Sort by Category</option>
          <option value="muscleGroup">Sort by Muscle Group</option>
        </select>
      </div>

      {/* Results */}
      {isLoading ? (
        <Loading message="Loading exercises..." />
      ) : sortedExercises.length === 0 ? (
        <div className={commonStyles.emptyState}>
          <div className={commonStyles.emptyIcon}>🔍</div>

          <h3 className={commonStyles.emptyTitle}>
            No exercises found
          </h3>

          <p className={commonStyles.emptyMessage}>
            Try adjusting your search or filters to find what you're
            looking for.
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseList;