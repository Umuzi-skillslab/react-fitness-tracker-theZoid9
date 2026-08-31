import PropTypes from "prop-types";
import styles from "./Exercise.module.css";

const ExerciseCard = ({
  exercise,
  onSelect,
  onAddToPlan,
}) => {
  return (
    <article
      className={styles.exerciseCard}
      style={{ backgroundImage: `url(${exercise.image})` }}
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
          onClick={() => onAddToPlan(exercise)}
        >
          Add to Plan
        </button>
      </div>

    </article>
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
  }).isRequired,

  onSelect: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func.isRequired,
};

export default ExerciseCard;