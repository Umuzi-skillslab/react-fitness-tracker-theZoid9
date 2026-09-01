import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import LogEntry from './LogEntry';
import { generateId } from "../utils/helpers";
import commonStyles from '../common/common.module.css';
import styles from './WorkoutLog.module.css';

/**
 * WorkoutLog component for logging completed workouts.
 * Manages form state, logs history, and persists to localStorage.
 * Demonstrates form handling with onSubmit, onChange, and state updates.
 */
const WorkoutLog = ({ exercises = [] }) => {
  // Form state for logging a workout
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [error, setError] = useState('');

  // Load workout history from localStorage on mount (useEffect)
  useEffect(() => {
    const saved = localStorage.getItem('workoutHistory');
    if (saved) {
      try {
        setWorkoutHistory(JSON.parse(saved));
      } catch {
        // Ignore corrupt data
      }
    }
  }, []);

  // Save workout history to localStorage when it changes (useEffect)
  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  // Handle form submission — validates inputs and creates log entry
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedExerciseId) {
      setError('Please select an exercise.');
      return;
    }

    const numSets = parseInt(sets);
    const numReps = parseInt(reps);
    const numWeight = parseFloat(weight) || 0;

    if (!numSets || numSets < 1) {
      setError('Please enter a valid number of sets.');
      return;
    }
    if (!numReps || numReps < 1) {
      setError('Please enter a valid number of reps.');
      return;
    }

    const exercise = exercises.find((ex) => ex.id === parseInt(selectedExerciseId));
    if (!exercise) {
      setError('Selected exercise not found.');
      return;
    }

    const newLog = {
      id: generateId(),
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: numSets,
      reps: numReps,
      weight: numWeight,
      date: new Date().toISOString(),
    };

    // Add new log to the beginning of the history array
    setWorkoutHistory([newLog, ...workoutHistory]);

    // Reset form
    setSelectedExerciseId('');
    setSets('');
    setReps('');
    setWeight('');
  };

  // Delete a log entry by ID
  const handleDelete = (logId) => {
    setWorkoutHistory(workoutHistory.filter((log) => log.id !== logId));
  };

  return (
    <div className={styles.logContainer}>
      {/* Workout logging form */}
      <Card title="Log a Workout">
        <form className={styles.logForm} onSubmit={handleSubmit}>
          {error && <div className={commonStyles.errorState}>{error}</div>}

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="exercise-select">Exercise</label>
              <select
                id="exercise-select"
                className={styles.formInput}
                value={selectedExerciseId}
                onChange={(e) => setSelectedExerciseId(e.target.value)}
              >
                <option value="">Select an exercise...</option>
                {exercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="sets-input">Sets</label>
              <input
                id="sets-input"
                type="number"
                className={styles.formInput}
                placeholder="e.g. 4"
                min="1"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="reps-input">Reps</label>
              <input
                id="reps-input"
                type="number"
                className={styles.formInput}
                placeholder="e.g. 10"
                min="1"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="weight-input">Weight (kg)</label>
              <input
                id="weight-input"
                type="number"
                className={styles.formInput}
                placeholder="e.g. 60"
                min="0"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <Button type="submit">Log Workout</Button>
          </div>
        </form>
      </Card>

      {/* Workout history list */}
      <Card title={`Workout History (${workoutHistory.length} entries)`}>
        {workoutHistory.length === 0 ? (
          <div className={commonStyles.emptyState}>
            <div className={commonStyles.emptyIcon}>📝</div>
            <h3 className={commonStyles.emptyTitle}>No workouts logged yet</h3>
            <p className={commonStyles.emptyMessage}>Start tracking your progress by logging your first workout above.</p>
          </div>
        ) : (
          <div>
            {workoutHistory.map((log) => (
              <LogEntry key={log.id} log={log} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default WorkoutLog;