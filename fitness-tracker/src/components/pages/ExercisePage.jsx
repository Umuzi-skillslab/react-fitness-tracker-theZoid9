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
  const [showDayModal, setShowDayModal] = useState(false);
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
      />

      {/* Day selection modal for adding exercise to plan */}
      <Modal
        isOpen={showDayModal}
        onClose={() => setShowDayModal(false)}
        title={`Add "${selectedExercise?.name || ''}" to which day?`}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '10px',
        }}>
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day}
              onClick={() => handleConfirmDay(day)}
              style={{
                padding: '12px',
                border: '1px solid #E5E5EA',
                borderRadius: '8px',
                background: '#FEFEFE',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: 'inherit',
                color: '#1C1C1E',
                textTransform: 'capitalize',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1C1C1E';
                e.currentTarget.style.background = '#F5F4F1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E5EA';
                e.currentTarget.style.background = '#FEFEFE';
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ExercisesPage;
