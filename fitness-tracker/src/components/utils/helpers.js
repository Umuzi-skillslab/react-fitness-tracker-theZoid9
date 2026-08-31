/**
 * Helper utility functions for the Fitness Tracker application.
 * Provides data transformation, formatting, and calculation functions.
 */

/**
 * Formats a duration in seconds to a human-readable string (e.g., 90 → "1m 30s")
 */
export const formatDuration = (seconds) => {
  if (!seconds || seconds <= 0) return '0s';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0 && remainingSeconds > 0) return `${minutes}m ${remainingSeconds}s`;
  if (minutes > 0) return `${minutes}m`;
  return `${remainingSeconds}s`;
};

/**
 * Formats a date string to a localized, readable format
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Calculates the total weight lifted across all sets for a log entry
 * weight per set × number of sets
 */
export const calculateTotalWeight = (exercise) => {
  if (!exercise || !exercise.weight || !exercise.sets) return 0;
  return exercise.weight * exercise.sets;
};

/**
 * Calculates the total volume (sets × reps × weight) for a workout
 */
export const calculateVolume = (exercise) => {
  if (!exercise) return 0;
  const { sets = 0, reps = 0, weight = 0 } = exercise;
  return sets * reps * weight;
};

/**
 * Returns a color class string based on exercise difficulty level
 */
export const getDifficultyColor = (difficulty) => {
  const colors = {
    beginner: '#22c55e',
    intermediate: '#f59e0b',
    advanced: '#ef4444',
  };
  return colors[difficulty] || '#6b7280';
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Generates a unique ID using timestamp and random number
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Filters exercises by search term, category, muscle group, and difficulty
 */
export const filterExercises = (exercises, filters) => {
  const { searchTerm = '', category = 'all', muscleGroup = 'all', difficulty = 'all' } = filters;

  return exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || exercise.category === category;
    const matchesMuscle = muscleGroup === 'all' || exercise.muscleGroup === muscleGroup;
    const matchesDifficulty = difficulty === 'all' || exercise.difficulty === difficulty;

    return matchesSearch && matchesCategory && matchesMuscle && matchesDifficulty;
  });
};

/**
 * Sorts exercises by a given field and direction
 */
export const sortExercises = (exercises, field = 'name', direction = 'asc') => {
  return [...exercises].sort((a, b) => {
    if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Gets unique values for a given field from exercises array
 */
export const getUniqueValues = (exercises, field) => {
  return [...new Set(exercises.map((exercise) => exercise[field]))].sort();
};
