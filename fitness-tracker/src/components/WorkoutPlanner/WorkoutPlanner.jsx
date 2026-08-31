import { useMemo } from 'react';
import DayCard from './DayCard';
import styles from './WorkoutPlanner.module.css';

// Days of the week for the weekly planner
const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

/**
 * WorkoutPlanner displays the weekly workout plan.
 * Demonstrates lifting state up: workoutPlan is received as a prop from App.jsx
 * (the single source of truth), and mutation callbacks are delegated back up.
 */
const WorkoutPlanner = ({ workoutPlan = {}, onRemoveExercise, onClearDay }) => {
  // Compute summary stats using useMemo for derived state
  const summary = useMemo(() => {
    const allExercises = DAYS_OF_WEEK.flatMap((d) => workoutPlan[d] || []);
    return {
      totalExercises: allExercises.length,
      activeDays: DAYS_OF_WEEK.filter((d) => (workoutPlan[d] || []).length > 0).length,
      totalSets: allExercises.reduce((sum, e) => sum + (e.sets || 0), 0),
      totalVolume: allExercises.reduce((sum, e) => sum + (e.sets || 0) * (e.reps || 0), 0),
    };
  }, [workoutPlan]);

  return (
    <div className={styles.planner}>
      {/* Summary statistics row */}
      <div className={styles.plannerSummary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>{summary.totalExercises}</div>
          <div className={styles.summaryLabel}>Total Exercises</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>{summary.activeDays}</div>
          <div className={styles.summaryLabel}>Active Days</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>{summary.totalSets}</div>
          <div className={styles.summaryLabel}>Total Sets</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>{summary.totalVolume}</div>
          <div className={styles.summaryLabel}>Total Reps</div>
        </div>
      </div>

      {/* Week grid — DayCard reused 7 times */}
      <div className={styles.weekGrid}>
        {DAYS_OF_WEEK.map((day) => (
          <DayCard
            key={day}
            day={day}
            exercises={workoutPlan[day] || []}
            onRemoveExercise={onRemoveExercise}
            onClearDay={onClearDay}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanner;
