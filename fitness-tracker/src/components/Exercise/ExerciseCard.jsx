import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Exercise.module.css';

const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const ExerciseCard = ({
  exercise,
  onSelect,
  onAddToPlan,
}) => {
  const [showDayPicker, setShowDayPicker] = useState(false);

  const handleAddToDay = (day) => {
    onAddToPlan(exercise, day);
    setShowDayPicker(false);
  };

  return (
    <>
      <article
        className={styles.exerciseCard}
        style={
          exercise.image && exercise.image.startsWith('/')
            ? { backgroundImage: `url(${exercise.image})` }
            : undefined
        }
      >
        <div className={styles.cardHeader}>
          <h3>{exercise.name}</h3>

          <span className={styles.difficulty}>
            {exercise.difficulty}
          </span>
        </div>

        <p className={styles.description}>
          {exercise.description}
        </p>

        <div className={styles.exerciseInfo}>
          <p>
            <strong>Category</strong>
            <span>{exercise.category}</span>
          </p>

          <p>
            <strong>Muscle</strong>
            <span>{exercise.muscleGroup}</span>
          </p>

          <p>
            <strong>Sets</strong>
            <span>{exercise.sets}</span>
          </p>

          <p>
            <strong>Reps</strong>
            <span>{exercise.reps}</span>
          </p>
        </div>

        <div className={styles.cardActions}>
          <button
            className={styles.viewButton}
            onClick={() => onSelect(exercise.id)}
          >
            View Details
          </button>

          <button
            className={styles.planButton}
            onClick={() => setShowDayPicker(true)}
          >
            Add to Plan
          </button>
        </div>
      </article>

      {showDayPicker && (
        <div
          className={styles.popupOverlay}
          onClick={() => setShowDayPicker(false)}
        >
          <div
            className={styles.dayPicker}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closePopup}
              onClick={() => setShowDayPicker(false)}
            >
              ✕
            </button>

            <h2>Add to Workout Plan</h2>

            <p>
              Choose a day for <strong>{exercise.name}</strong>
            </p>

            <div className={styles.dayOptions}>
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day}
                  className={styles.dayOption}
                  onClick={() => handleAddToDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    muscleGroup: PropTypes.string,
    difficulty: PropTypes.string,
    sets: PropTypes.number,
    reps: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,

  onSelect: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func.isRequired,
};

export default ExerciseCard;