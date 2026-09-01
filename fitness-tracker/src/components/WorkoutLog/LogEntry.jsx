import PropTypes from 'prop-types';
import { formatDate, calculateVolume } from "../utils/helpers";
import styles from './WorkoutLog.module.css';

/**
 * LogEntry displays a single completed workout log with its details.
 * Demonstrates data transformation via helper functions called in JSX.
 */
const LogEntry = ({ log, onDelete }) => {
  const { exerciseName, sets, reps, weight, date, id } = log;

  return (
    <div className={styles.logEntry}>
      <div className={styles.logEntryInfo}>
        <span className={styles.logEntryName}>{exerciseName}</span>
        <span className={styles.logEntryDetails}>
          {sets} sets × {reps} reps @ {weight} kg = {calculateVolume(log)} kg total volume
        </span>
        <span className={styles.logEntryDate}>{formatDate(date)}</span>
      </div>
      <div className={styles.logEntryActions}>
        <span className={styles.completedBadge}>✓ Completed</span>
        <button
          onClick={() => onDelete(id)}
          style={{ background: 'none', border: 'none', color: '#8E8E93', cursor: 'pointer', fontSize: '0.9rem', padding: '4px 6px', borderRadius: '6px', transition: 'all 0.2s ease' }}
          title="Delete log entry"
          aria-label={`Delete log for ${exerciseName}`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

LogEntry.propTypes = {
  log: PropTypes.shape({
    id: PropTypes.string.isRequired,
    exerciseName: PropTypes.string.isRequired,
    sets: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    weight: PropTypes.number,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LogEntry;
