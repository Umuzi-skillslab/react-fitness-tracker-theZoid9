import { useState } from 'react';
import ExerciseCard from './ExerciseCard';
import SearchBar from '../UI/SearchBar';
import Loading from '../UI/Loading';
import styles from './Exercise.module.css';
import commonStyles from '../common/common.module.css';
import { getUniqueValues, filterExercises, sortExercises } from '../utils/helpers';


/**
 * ExerciseList renders a filterable, searchable list of exercises.
 * Manages its own filter/sort state, receives exercise data and callbacks as props.
 * Demonstrates lifting state up: exercises and plan come from parent.
 */
const ExerciseList = ({
  exercises,
  workoutPlan = [],
  onSelectExercise,
  onAddToPlan,
  isLoading = false,
}) => {
  // Local state for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Derive unique filter options from the exercise data
  const categories = getUniqueValues(exercises, 'category');
  const muscleGroups = getUniqueValues(exercises, 'muscleGroup');
  const difficulties = getUniqueValues(exercises, 'difficulty');

  // Collect all exercise IDs that are currently in the workout plan
  // workoutPlan is already a flat array of exercise objects (from ExercisesPage)
  const planExerciseIds = workoutPlan.map((e) => e.id);

  // Apply filters, then sort the results
  const filteredExercises = filterExercises(exercises, { searchTerm, category, muscleGroup, difficulty });
  const sortedExercises = sortExercises(filteredExercises, sortBy, sortDirection);

  // Handle change events on filter selects — access e.target.value
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleMuscleChange = (e) => setMuscleGroup(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);
  const handleSortChange = (e) => {
    const val = e.target.value;
    if (val === sortBy) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(val);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      {/* Search and filter controls */}
      <div className={styles.listHeader}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search exercises by name..." />
        <span className={styles.resultCount}>
          {filteredExercises.length} of {exercises.length} exercises
        </span>
      </div>

      <div className={styles.listControls}>
        <select
          className={styles.filterSelect}
          value={category}
          onChange={handleCategoryChange}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={muscleGroup}
          onChange={handleMuscleChange}
          aria-label="Filter by muscle group"
        >
          <option value="all">All Muscle Groups</option>
          {muscleGroups.map((mg) => (
            <option key={mg} value={mg}>{mg}</option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={difficulty}
          onChange={handleDifficultyChange}
          aria-label="Filter by difficulty"
        >
          <option value="all">All Difficulties</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>{d}</option>
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

      {/* Conditional rendering: loading state */}
      {isLoading ? (
        <Loading message="Loading exercises..." />
      ) : sortedExercises.length === 0 ? (
        /* Empty state when no exercises match the filters */
        <div className={commonStyles.emptyState}>
          <div className={commonStyles.emptyIcon}>🔍</div>
          <h3 className={commonStyles.emptyTitle}>No exercises found</h3>
          <p className={commonStyles.emptyMessage}>
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        /* Render exercise cards using .map() */
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
