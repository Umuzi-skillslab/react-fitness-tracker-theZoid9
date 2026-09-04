import WorkoutLog from "../WorkoutLog/WorkoutLog";
import commonStyles from "../common/common.module.css";
import exercisesData from "../data/exercisesData";

const HistoryPage = ({ workoutHistory, setWorkoutHistory }) => {
  const hasHistory = workoutHistory.length > 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.78)), url("/assets/images/gym.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className={commonStyles.pageContainer}
        style={{
          minHeight: hasHistory ? "100vh" : "60vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: hasHistory ? "30px" : "22px",
            opacity: hasHistory ? 1 : 0.8,
          }}
        >
          {/* Page Header */}
          <div
            style={{
              padding: hasHistory ? "8px 0 4px" : "20px 0",
              borderLeft: hasHistory
                ? "4px solid var(--color-primary)"
                : "none",
              paddingLeft: hasHistory ? "12px" : "0",
            }}
          >
            <div>
              <h1
                className={commonStyles.pageTitle}
                style={{
                  marginBottom: "10px",
                  fontSize: hasHistory ? "2rem" : "1.8rem",
                }}
              >
                Workout History
              </h1>

              <p
                style={{
                  maxWidth: "680px",
                  margin: "0",
                  color: "var(--color-text-secondary)",
                  fontSize: hasHistory ? "0.95rem" : "0.88rem",
                  lineHeight: hasHistory ? "1.7" : "1.6",
                }}
              >
                Keep track of every workout you complete. Log your exercises,
                monitor your performance, and look back at your progress over time.
              </p>
            </div>
          </div>

          {/* Workout Log */}
          <div
            style={{
              width: "100%",
            }}
          >
            <WorkoutLog
              exercises={exercisesData}
              workoutHistory={workoutHistory}
              setWorkoutHistory={setWorkoutHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;

