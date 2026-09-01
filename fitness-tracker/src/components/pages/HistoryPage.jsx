import { useState, useEffect } from "react";

import WorkoutLog from "../WorkoutLog/WorkoutLog";

import commonStyles from "../common/common.module.css";

import exercisesData from "../data/exercisesData";
/**
 * History page — wraps the WorkoutLog component for logging and viewing workout history.
 */
const HistoryPage = ({ workoutHistory, setWorkoutHistory }) => {
  return (
    <div className={commonStyles.pageContainer}>
      <h1 className={commonStyles.pageTitle}>Workout History</h1>
      <WorkoutLog exercises={exercisesData} />
    </div>
  );
};

export default HistoryPage;
