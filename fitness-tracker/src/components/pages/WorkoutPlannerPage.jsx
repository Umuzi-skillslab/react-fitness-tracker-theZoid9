
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import WorkoutPlanner from '../WorkoutPlanner/WorkoutPlanner';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

import commonStyles from '../common/common.module.css';
import exercisesData from '../data/exercisesData';
import styles from '../WorkoutPlanner/WorkoutPlanner.module.css';

const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const WorkoutPlannerPage = ({
  workoutPlan,
  onAddToPlan,
  onRemoveExercise,
  onClearDay,
}) => {
  const [exercises] = useState(exercisesData);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Exercise passed from the Exercise page
  const exercise = location.state?.exercise;

  // Automatically open the day-selection modal
  // when arriving from "Add to Plan"
  useEffect(() => {
    if (exercise) {
      setSelectedExercise(exercise);
      setShowModal(true);
    }
  }, [exercise]);

  // Confirm which day the exercise should be added to
  const handleConfirmDay = (day) => {
    if (selectedExercise && onAddToPlan) {
      onAddToPlan(day, selectedExercise);
    }

    setShowModal(false);
    setSelectedExercise(null);

    // Remove the exercise from navigation state
    navigate('/workout-planner', { replace: true });
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExercise(null);

    navigate('/workout-planner', { replace: true });
  };

  return (
    <div className={commonStyles.pageContainer}>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <h1
          className={commonStyles.pageTitle}
          style={{ margin: 0 }}
        >
          Weekly Workout Planner
        </h1>

        <Button onClick={() => navigate('/exercises')}>
          Browse Exercises
        </Button>
      </div>

      <WorkoutPlanner
        workoutPlan={workoutPlan}
        onRemoveExercise={onRemoveExercise}
        onClearDay={onClearDay}
      />

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={`Add "${selectedExercise?.name || ''}" to which day?`}
      >
        <div className={styles.addDayGrid}>
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day}
              className={styles.addDayBtn}
              onClick={() => handleConfirmDay(day)}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>
      </Modal>

    </div>
  );
};

export default WorkoutPlannerPage;

