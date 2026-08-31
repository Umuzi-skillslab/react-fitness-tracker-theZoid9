import PropTypes from 'prop-types';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import styles from './Exercise.module.css';
import { formatDuration } from '../utils/helpers'

/**
 * ExerciseCard displays a summary of an exercise with icon, badges, metadata,
 * and action buttons. Receives multiple props and demonstrates props destructuring.
 */


const ExerciseCard = ({ exercise, onSelect, onAddToPlan }) => {
  return (
    

    <div className={styles.exerciseCard}>
      <h3>{exercise.name}</h3>

      <p>{exercise.description}</p>

      <p>Category: {exercise.category}</p>
      <p>Muscle: {exercise.muscleGroup}</p>
      <p>Difficulty: {exercise.difficulty}</p>

      <p>
        Sets: {exercise.sets} | Reps: {exercise.reps}
      </p>

      <button onClick={() => onSelect(exercise.id)}>
        View Details
      </button>

      <button onClick={() => onAddToPlan(exercise)}>
        Add to Plan
      </button>
    </div>
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

