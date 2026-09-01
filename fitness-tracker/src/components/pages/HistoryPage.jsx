
import WorkoutLog from "../WorkoutLog/WorkoutLog";
import commonStyles from "../common/common.module.css";
import styles from "./HistoryPage.module.css";
import exercisesData from "../data/exercisesData";

const HistoryPage = ({ workoutHistory, setWorkoutHistory }) => {
  return (
    <div className={commonStyles.pageContainer}>
      <div className={styles.historyPage}>

        {/* Page Header */}
        <div className={styles.historyHeader}>
          <div>
            <h1 className={commonStyles.pageTitle}>
              Workout History
            </h1>

            <p className={styles.description}>
              Keep track of every workout you complete. Log your exercises,
              monitor your performance, and look back at your progress over time.
            </p>
          </div>
        </div>

        {/* Workout Log */}
        <div className={styles.workoutLogSection}>
          <WorkoutLog
            exercises={exercisesData}
            workoutHistory={workoutHistory}
            setWorkoutHistory={setWorkoutHistory}
          />
        </div>

      </div>
    </div>
  );
};

export default HistoryPage;

