import { useState, useEffect } from "react";
import Card from "../UI/Card";
import commonStyles from "../common/common.module.css";
import styles from "./ProgressPage.module.css";
import { Link } from "react-router-dom";


const ProgressPage = ({ workoutHistory = [] }) => {


  // =========================
  // Statistics
  // =========================

  const totalWorkouts = workoutHistory.length;

  const totalVolume = workoutHistory.reduce(
    (sum, log) =>
      sum + log.sets * log.reps * (log.weight || 0),
    0
  );

  const totalSets = workoutHistory.reduce(
    (sum, log) => sum + log.sets,
    0
  );

  const uniqueExercises = new Set(
    workoutHistory.map((log) => log.exerciseId)
  ).size;

  const avgWeight =
    totalWorkouts > 0
      ? (
          workoutHistory.reduce(
            (sum, log) => sum + (log.weight || 0),
            0
          ) / totalWorkouts
        ).toFixed(1)
      : 0;

  // =========================
  // Exercise Breakdown
  // =========================

  const exerciseBreakdown = workoutHistory.reduce((acc, log) => {
    if (!acc[log.exerciseName]) {
      acc[log.exerciseName] = {
        count: 0,
        totalVolume: 0,
        totalSets: 0,
      };
    }

    acc[log.exerciseName].count += 1;

    acc[log.exerciseName].totalVolume +=
      log.sets * log.reps * (log.weight || 0);

    acc[log.exerciseName].totalSets += log.sets;

    return acc;
  }, {});



  // =========================
  // Page
  // =========================

  return (
    <div
      className={`${commonStyles.pageContainer} ${styles.progressPage}`}
    >
      {/* Page Header */}

      <div className={styles.pageIntro}>
        <h1 className={commonStyles.pageTitle}>
          Your Progress
        </h1>

        <p className={styles.pageDescription}>
          Track your training performance, monitor your
          workout volume, and see how consistently you're
          putting in the work.
        </p>
      </div>

      {/* Statistics */}

      <div className={styles.statsGrid}>
        <Card>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {totalWorkouts}
            </div>

            <div className={styles.statLabel}>
              Total Workouts
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {totalVolume.toLocaleString()}
            </div>

            <div className={styles.statLabel}>
              Total Volume (kg)
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {totalSets}
            </div>

            <div className={styles.statLabel}>
              Total Sets
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {uniqueExercises}
            </div>

            <div className={styles.statLabel}>
              Exercises Done
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {avgWeight}
            </div>

            <div className={styles.statLabel}>
              Avg Weight (kg)
            </div>
          </div>
        </Card>
      </div>


        <Card>
        <div className={styles.workoutPrompt}>
            <div className={styles.workoutPromptText}>
            <h2 className={styles.workoutPromptTitle}>
                Workout Today?
            </h2>

            <p className={styles.workoutPromptMessage}>
                Keep your progress going. Log your workout and
                track your performance.
            </p>
            </div>

            <Link
            to="/History"
            className={styles.workoutButton}
            >
            Log Your Progress
            </Link>
        </div>
        </Card>



      {/* Exercise Breakdown */}

      <Card title="Exercise Breakdown">
        {Object.keys(exerciseBreakdown).length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📈</div>

            <h3 className={styles.emptyTitle}>
              No progress data yet
            </h3>

            <p className={styles.emptyMessage}>
              Start logging your workouts to see your
              training volume and exercise performance here.
            </p>
          </div>
        ) : (
          <div className={styles.breakdown}>
            {Object.entries(exerciseBreakdown).map(
              ([name, data]) => (
                <div
                  key={name}
                  className={styles.exerciseRow}
                >
                  <div className={styles.exerciseInfo}>
                    <div className={styles.exerciseName}>
                      {name}
                    </div>

                    <div className={styles.exerciseDetails}>
                      {data.count} sessions
                      {" | "}
                      {data.totalSets} sets
                    </div>
                  </div>

                  <div className={styles.exerciseVolume}>
                    {data.totalVolume.toLocaleString()} kg
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProgressPage;