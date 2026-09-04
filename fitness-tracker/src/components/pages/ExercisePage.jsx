import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ExerciseList from "../Exercise/ExerciseList";
import commonStyles from "../common/common.module.css";
import exercisesData from "../data/exercisesData";

const ExercisesPage = ({
  workoutPlan,
  onAddToPlan,
}) => {

  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setExercises(exercisesData);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectExercise = (id) => {
    navigate(`/exercises/${id}`);
  };

  const handleAddToPlan = (day, exercise) => {

    const dayExercises =
      workoutPlan?.[day] || [];

    const alreadyExists =
      dayExercises.some(
        (existingExercise) =>
          existingExercise.id === exercise.id
      );

    // =========================
    // DUPLICATE
    // =========================

    if (alreadyExists) {

      navigate("/workout-planner", {
        state: {
          message: `${exercise.name} is already added to ${day}.`,
          messageType: "error",
        },
      });

      return;
    }

    // =========================
    // NEW EXERCISE
    // =========================

    onAddToPlan(day, exercise);

    navigate("/workout-planner", {
      state: {
        message: `${exercise.name} was added to ${day}.`,
        messageType: "success",
      },
    });
  };

  const planFlat = workoutPlan
    ? Object.values(workoutPlan).flat()
    : [];

  return (
      <main
        className={commonStyles.pageContainer}
        style={{
          maxWidth: "none",
          width: "100%",
          minHeight: "100vh",

          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.78)), url("/assets/images/gymE.jpg")',

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",

          boxSizing: "border-box",
        }}
      >
      <h1
        className={commonStyles.pageTitle}
        style={{
          textAlign: "center",
        }}
      >
        The Work Room
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.55)",
          marginTop: "-10px",
        }}
      >
        Browse, search, and find the perfect exercises
        for your workout.
      </p>

      <ExerciseList
        exercises={exercises}
        workoutPlan={planFlat}
        onSelectExercise={handleSelectExercise}
        onAddToPlan={handleAddToPlan}
        isLoading={isLoading}
      />
    </main>
  );
};

export default ExercisesPage;