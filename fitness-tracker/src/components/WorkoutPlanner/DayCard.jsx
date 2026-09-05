import PropTypes from "prop-types";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./WorkoutPlanner.module.css";

const DayCard = ({
  day,
  exercises = [],
  onRemoveExercise,
  onClearDay,
}) => {
  return (
    <Card className={styles.dayCard}>

      {/* DAY HEADER */}
      <div className={styles.dayHeader}>

        <div>

          <h3 className={styles.dayName}>
            {day}
          </h3>

          <span className={styles.dayCount}>
            {exercises.length} exercise
            {exercises.length !== 1
              ? "s"
              : ""}
          </span>

        </div>

        {/* CLEAR BUTTON */}
        {exercises.length > 0 && (
          <Button
            size="small"
            variant="danger"
            onClick={() =>
              onClearDay(day)
            }
          >
            Clear
          </Button>
        )}

      </div>

      {/* DAY CONTENT */}
      <div className={styles.dayBody}>

        {exercises.length === 0 ? (

          /*
           * This is ONLY text.
           * It is not clickable.
           */
          <p className={styles.dayEmpty}>
            No exercises planned. Add some!
          </p>

        ) : (

          exercises.map((exercise) => (

            <div
              key={exercise.id}
              className={
                styles.dayExerciseItem
              }
            >

              <div>

                <div
                  className={
                    styles.dayExerciseName
                  }
                >
                  {exercise.name}
                </div>

                <div
                  className={
                    styles.dayExerciseMeta
                  }
                >
                  {exercise.sets} ×{" "}
                  {exercise.reps} reps |{" "}
                  {exercise.muscleGroup}
                </div>

              </div>

              <button
                className={styles.removeBtn}
                onClick={() =>
                  onRemoveExercise(
                    day,
                    exercise.id
                  )
                }
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
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,

  exercises: PropTypes.array,

  onRemoveExercise:
    PropTypes.func.isRequired,

  onClearDay:
    PropTypes.func.isRequired,
};

export default DayCard;