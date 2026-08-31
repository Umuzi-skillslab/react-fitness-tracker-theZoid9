import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseList from "../Exercise/ExerciseList";
import Modal from "../UI/Modal";
import commonStyles from "../common/common.module.css";
import exercisesData from "../data/exercisesData";

const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

/**
 * Exercises page — shows all exercises with search/filter.
 * Manages the "add to plan" modal flow (child-to-parent communication).
 */
const ExercisesPage = ({ workoutPlan, onAddToPlan }) => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const navigate = useNavigate();

  // Load exercises data on mount (useEffect)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setExercises(exercisesData);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Navigate to exercise detail page
  const handleSelectExercise = (id) => {
    navigate(`/exercises/${id}`);
  };

  // Open the day-selection modal when adding to plan
  const handleAddToPlanClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowDayModal(true);
  };

  // Confirm adding to a specific day
  const handleConfirmDay = (day) => {
    if (selectedExercise && onAddToPlan) {
      onAddToPlan(day, selectedExercise);
    }
    setShowDayModal(false);
    setSelectedExercise(null);
  };

  // Flatten the workout plan to check which exercises are in it
  const planFlat = workoutPlan ? Object.values(workoutPlan).flat() : [];

  return (
    <div className={commonStyles.pageContainer}>
      <h1 className={commonStyles.pageTitle}>Exercise Library</h1>
      <ExerciseList
        exercises={exercises}
        workoutPlan={planFlat}
        onSelectExercise={handleSelectExercise}
        onAddToPlan={handleAddToPlanClick}
        isLoading={isLoading}
      />    </div>
  );
};

export default ExercisesPage;
