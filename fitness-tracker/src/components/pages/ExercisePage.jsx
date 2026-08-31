import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ExerciseList from "../Exercise/ExerciseList";
import commonStyles from "../common/common.module.css";
import exercisesData from "../data/exercisesData";

const ExercisesPage = ({ workoutPlan, onAddToPlan }) => {
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

  const handleAddToPlan = (exercise) => {
    if (onAddToPlan) {
      onAddToPlan(exercise);
    }
  };

  const planFlat = workoutPlan
    ? Object.values(workoutPlan).flat()
    : [];

  return (
    <main className={commonStyles.pageContainer}>
    <h1 className={commonStyles.pageTitle} style={{ textAlign: "center" }}>
      The Work Room
    </h1>

    <p style={{ textAlign: "center", color: "#777", marginTop: "-10px" }}>
        Browse, search, and find the perfect exercises for your workout.
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