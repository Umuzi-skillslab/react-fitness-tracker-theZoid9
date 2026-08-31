import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '../UI/Card';
import Button from '../UI/Button';

import styles from './WorkoutPlanner.module.css';

const DayCard = ({
  day,
  exercises = [],
  onRemoveExercise,
  onClearDay,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Card
        className={styles.dayCard}
        onClick={() => setShowPopup(true)}
        hoverable
      >
        <div className={styles.dayHeader}>
          <div>
            <h3 className={styles.dayName}>{day}</h3>

            <span className={styles.dayCount}>
              {exercises.length} exercise
              {exercises.length !== 1 ? 's' : ''}
            </span>
          </div>

          {exercises.length > 0 && (
            <Button
              size="small"
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                onClearDay(day);
              }}
            >
              Clear
            </Button>
          )}
        </div>

        <div className={styles.dayBody}>
          {exercises.length === 0 ? (
            <p className={styles.dayEmpty}>
              No exercises planned. Add some!
            </p>
          ) : (
            exercises.map((exercise) => (
              <div
                key={exercise.id}
                className={styles.dayExerciseItem}
              >
                <div>
                  <div className={styles.dayExerciseName}>
                    {exercise.name}
                  </div>

                  <div className={styles.dayExerciseMeta}>
                    {exercise.sets} × {exercise.reps} reps |{' '}
                    {exercise.muscleGroup}
                  </div>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveExercise(day, exercise.id);
                  }}
                  aria-label={`Remove ${exercise.name}`}
                  title="Remove exercise"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </Card>

      {showPopup && (
        <div
          className={styles.popupOverlay}
          onClick={() => setShowPopup(false)}
        >
          <div
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closePopup}
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

            <h2>{day}</h2>

            <p className={styles.popupCount}>
              {exercises.length} exercise
              {exercises.length !== 1 ? 's' : ''} planned
            </p>

            {exercises.length === 0 ? (
              <p className={styles.popupEmpty}>
                No exercises planned for {day}.
              </p>
            ) : (
              <div className={styles.popupExercises}>
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className={styles.popupExercise}
                  >
                    <div>
                      <strong>{exercise.name}</strong>

                      <span>
                        {exercise.sets} × {exercise.reps} reps
                      </span>

                      <span>
                        {exercise.muscleGroup}
                      </span>
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() =>
                        onRemoveExercise(day, exercise.id)
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              className={styles.closeButton}
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  exercises: PropTypes.array,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired,
};

export default DayCard;