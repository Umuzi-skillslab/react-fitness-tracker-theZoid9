import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../UI/Card';

import Button from '../UI/Button';

import styles from './Exercise.module.css';

/**
 * ExerciseDetail shows full information for a single exercise.
 * Uses route params (useParams) and programmatic navigation (useNavigate).
 * Loads exercise data via useEffect, demonstrating async-like loading pattern.
 */
const ExerciseDetail = ({ exercises, onAddToPlan }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate data loading with useEffect
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Use a small timeout to simulate async data fetch
    const timer = setTimeout(() => {
      if (!exercises || exercises.length === 0) {
        setError('Exercise data is not available.');
      }
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id, exercises]);

  // Find the exercise by ID from route params
  const exercise = exercises.find((e) => e.id === parseInt(id));

  // Handle navigation to previous/next exercise
  const handlePrevious = () => {
    const prevId = parseInt(id) - 1;
    if (prevId >= 1) navigate(`/exercises/${prevId}`);
  };

  const handleNext = () => {
    const nextId = parseInt(id) + 1;
    if (nextId <= exercises.length) navigate(`/exercises/${nextId}`);
  };

  // Loading and error conditional rendering
  if (isLoading) {
    return <div className={styles.notFound}><p>Loading exercise details...</p></div>;
  }

  if (error || !exercise) {
    return (
      <div className={styles.notFound}>
        <h2>Exercise Not Found</h2>
        <p>{error || `No exercise found with ID: ${id}`}</p>
        <Button onClick={() => navigate('/exercises')}>Back to Exercises</Button>
      </div>
    );
  }

  const { name, description, category, muscleGroup, difficulty, equipment, instructions, sets, reps, restTime, videoUrl } = exercise;

  return (
    <div>
      {/* Back button with programmatic navigation */}
      <button className={styles.backButton} onClick={() => navigate('/exercises')}>
        ← Back to Exercises
      </button>

      <div className={styles.detailContainer}>
        {/* Left column: main details */}
        <div className={styles.detailMain}>
          <h1 className={styles.detailTitle}>{name}</h1>
          <div className={styles.detailBadges}>
            <Badge label={category} type={category} />
            <Badge label={difficulty} type={difficulty} />
            <Badge label={muscleGroup} type="strength" />
          </div>
          <p className={styles.detailDesc}>{description}</p>

          {/* Exercise instructions list */}
          <div>
            <h3 className={styles.instructionsTitle}>Proper Form Instructions</h3>
            <ol className={styles.instructionsList}>
              {instructions.map((step, index) => (
                <li key={index} data-step={index + 1}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Stats cards showing sets, reps, rest, equipment */}
          <div className={styles.detailStats}>
            <Card>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{sets}</div>
                <div className={styles.statLabel}>Sets</div>
              </div>
            </Card>
            <Card>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{reps}</div>
                <div className={styles.statLabel}>Reps</div>
              </div>
            </Card>
            <Card>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{formatDuration(restTime)}</div>
                <div className={styles.statLabel}>Rest Time</div>
              </div>
            </Card>
            <Card>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{equipment}</div>
                <div className={styles.statLabel}>Equipment</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right column: video and actions */}
        <div className={styles.detailSidebar}>
          <VideoPlayer
            videoUrl={videoUrl}
            title={`${name} Demonstration`}
            description="Watch the proper form for this exercise"
          />
          <Button onClick={() => onAddToPlan(exercise)} size="large">Add to Workout Plan</Button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" onClick={handlePrevious} disabled={parseInt(id) <= 1}>
              ← Previous
            </Button>
            <Button variant="secondary" onClick={handleNext} disabled={parseInt(id) >= exercises.length}>
              Next →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
