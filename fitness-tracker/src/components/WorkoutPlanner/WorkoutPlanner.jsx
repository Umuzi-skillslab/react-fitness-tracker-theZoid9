import { useMemo } from "react";

import DayCard from "./DayCard";
import styles from "./WorkoutPlanner.module.css";

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const WorkoutPlanner = ({
  workoutPlan = {},
  onRemoveExercise,
  onClearDay,
  message,
  messageType,
}) => {

  const summary = useMemo(() => {

    const allExercises =
      DAYS_OF_WEEK.flatMap(
        (day) => workoutPlan[day] || []
      );

    return {
      totalExercises: allExercises.length,

      activeDays:
        DAYS_OF_WEEK.filter(
          (day) =>
            (workoutPlan[day] || []).length > 0
        ).length,

      totalSets:
        allExercises.reduce(
          (sum, exercise) =>
            sum + (exercise.sets || 0),
          0
        ),

      totalVolume:
        allExercises.reduce(
          (sum, exercise) =>
            sum +
            (exercise.sets || 0) *
            (exercise.reps || 0),
          0
        ),
    };

  }, [workoutPlan]);

  return (
    <div className={styles.planner}>

      {/* =========================
          STATISTICS
          ========================= */}

      <div className={styles.plannerSummary}>

        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>
            {summary.totalExercises}
          </div>

          <div className={styles.summaryLabel}>
            Total Exercises
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>
            {summary.activeDays}
          </div>

          <div className={styles.summaryLabel}>
            Active Days
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>
            {summary.totalSets}
          </div>

          <div className={styles.summaryLabel}>
            Total Sets
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>
            {summary.totalVolume}
          </div>

          <div className={styles.summaryLabel}>
            Total Reps
          </div>
        </div>

      </div>

      {/* =========================
          MESSAGE
          ========================= */}

      {message && (
        <div
          className={
            messageType === "error"
              ? styles.errorMessage
              : styles.successMessage
          }
        >
          {messageType === "error" ? "✕ " : "✓ "}
          {message}
        </div>
      )}

      {/* =========================
          DAYS
          ========================= */}

      <div className={styles.weekGrid}>

        {DAYS_OF_WEEK.map((day) => (

          <DayCard
            key={day}
            day={day}
            exercises={
              workoutPlan[day] || []
            }
            onRemoveExercise={
              onRemoveExercise
            }
            onClearDay={
              onClearDay
            }
          />

        ))}

      </div>

    </div>
  );
};

export default WorkoutPlanner;