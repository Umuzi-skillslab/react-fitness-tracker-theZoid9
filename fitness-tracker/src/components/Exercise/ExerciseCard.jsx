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
const ExerciseCard = ({ exercise, onSelect, onAddToPlan, isInPlan = false }) => {
  // Destructure exercise object for cleaner JSX
  const { id, name, description, category, muscleGroup, difficulty, sets, reps, restTime, image } = exercise;

  return (
    <Card className={styles.exerciseCard}>
      <div className={styles.cardTop}>
        <span className={styles.exerciseIcon} role="img" aria-label={name}>
          {image}
        </span>
        <div className={styles.badgeGroup}>
          <Badge label={category} type={category} />
          <Badge label={difficulty} type={difficulty} />
        </div>
      </div>

      <h3 className={styles.exerciseName}>{name}</h3>
      <p className={styles.exerciseDesc}>{description}</p>

      {/* Exercise metadata: sets, reps, rest time */}
      <div className={styles.exerciseMeta}>
        <span className={styles.metaItem}>Reps: {sets} × {reps}</span>
        <span className={styles.metaItem}>Time: {formatDuration(restTime)}</span>
        <span className={styles.metaItem}>Target Muscle: {muscleGroup}</span>
      </div>

      {/* Action buttons — event handlers passed as props from parent */}
      <div className={styles.cardActions}>
        <Button size="small" onClick={() => onSelect(id)}>View Details</Button>
        <Button
          size="small"
          variant={isInPlan ? 'secondary' : 'primary'}
          onClick={() => onAddToPlan(exercise)}
        >
          {isInPlan ? '✓ In Plan' : '+ Add to Plan'}
        </Button>
      </div>

      {/* Conditional indicator when exercise is already in the plan */}
      {isInPlan && (
        <span className={styles.inPlanIndicator}>Already in your workout plan</span>
      )}
    </Card>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroup: PropTypes.string,
    difficulty: PropTypes.string,
    sets: PropTypes.number,
    reps: PropTypes.number,
    restTime: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func.isRequired,
  isInPlan: PropTypes.bool,
};

export default ExerciseCard;
