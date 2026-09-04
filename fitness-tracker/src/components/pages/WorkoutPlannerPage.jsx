import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import WorkoutPlanner from "../WorkoutPlanner/WorkoutPlanner";
import Button from "../UI/Button";
import commonStyles from "../common/common.module.css";
import styles from "../WorkoutPlanner/WorkoutPlanner.module.css";

const WorkoutPlannerPage = ({
  workoutPlan,
  onRemoveExercise,
  onClearDay,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState(
    location.state?.message || ""
  );

  const [messageType, setMessageType] = useState(
    location.state?.messageType || "success"
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setMessageType(location.state.messageType || "success");

      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [location, navigate]);

  useEffect(() => {
  if (!message) return;

  const timer = setTimeout(() => {
    setMessage("");
  }, 3000);

  return () => clearTimeout(timer);
}, [message]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.78)), url("/assets/images/gym2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={commonStyles.pageContainer}>
        {/* HEADER */}
        <div className={styles.plannerHeader}>
          <div className={styles.plannerHeaderText}>
            <h1 className={styles.plannerTitle}>
              Weekly Workout Planner
            </h1>

            <p className={styles.plannerSubtitle}>
              Organize your exercises and build your weekly routine.
            </p>
          </div>

          <Button onClick={() => navigate("/exercises")}>
            Browse Exercises
          </Button>
        </div>

        {/* WORKOUT PLANNER */}
        <WorkoutPlanner
          workoutPlan={workoutPlan}
          onRemoveExercise={onRemoveExercise}
          onClearDay={onClearDay}
          message={message}
          messageType={messageType}
        />
      </div>
    </div>
  );
};

export default WorkoutPlannerPage;