import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./Exercise.module.css";
import { formatDuration } from "../utils/helpers";

// Import the reusable VideoPlayer component
import VideoPlayer from "../Media/VideoPlayer";

const ExerciseDetail = ({ exercises, onAddToPlan }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  // Find the exercise that matches the URL ID
  const exercise = exercises.find(
    (exercise) => exercise.id === Number(id)
  );

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.notFound}>
        <p>Loading exercise details...</p>
      </div>
    );
  }

  // Exercise not found
  if (!exercise) {
    return (
      <div className={styles.notFound}>
        <h2>Exercise Not Found</h2>

        <p>
          No exercise found with ID: {id}
        </p>

        <button
          className={styles.actionButton}
          onClick={() => navigate("/exercises")}
        >
          Back to Exercises
        </button>
      </div>
    );
  }

  // Get information from the exercise object
  const {
    name,
    description,
    category,
    muscleGroup,
    difficulty,
    equipment,
    instructions = [],
    sets,
    reps,
    restTime,
    videoUrl,
  } = exercise;

  // Find current exercise position
  const currentIndex = exercises.findIndex(
    (exercise) => exercise.id === Number(id)
  );

  // Go to previous exercise
  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(
        `/exercises/${exercises[currentIndex - 1].id}`
      );
    }
  };

  // Go to next exercise
  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      navigate(
        `/exercises/${exercises[currentIndex + 1].id}`
      );
    }
  };

  return (
    <main className={styles.detailPage}>

      {/* Back navigation */}
      <button
        className={styles.backButton}
        onClick={() => navigate("/exercises")}
      >
        ← Back to Exercises
      </button>

      {/* Exercise heading */}
      <header className={styles.detailHeader}>

        <div>
          <h1 className={styles.detailTitle}>
            {name}
          </h1>

          <p className={styles.detailDesc}>
            {description}
          </p>
        </div>

        <div className={styles.detailBadges}>

          <span className={styles.badge}>
            {category}
          </span>

          <span className={styles.badge}>
            {muscleGroup}
          </span>

          <span className={styles.badge}>
            {difficulty}
          </span>

        </div>
      </header>

      {/* Main two-column layout */}
      <div className={styles.detailContainer}>

        {/* LEFT SIDE */}
        <section className={styles.detailMain}>

          {/* Stats */}
          <div className={styles.detailStats}>

            <div className={styles.statCard}>
              <span className={styles.statValue}>
                {sets}
              </span>

              <span className={styles.statLabel}>
                Sets
              </span>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statValue}>
                {reps}
              </span>

              <span className={styles.statLabel}>
                Reps
              </span>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statValue}>
                {formatDuration(restTime)}
              </span>

              <span className={styles.statLabel}>
                Rest
              </span>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statValue}>
                {equipment || "None"}
              </span>

              <span className={styles.statLabel}>
                Equipment
              </span>
            </div>

          </div>

          {/* Instructions */}
          <div className={styles.instructionsCard}>

            <h2 className={styles.sectionTitle}>
              Proper Form
            </h2>

            <p className={styles.sectionDescription}>
              Follow these steps to perform the exercise
              safely and correctly.
            </p>

            <ol className={styles.instructionsList}>

              {instructions.map((step, index) => (
                <li key={index}>

                  <span className={styles.stepNumber}>
                    {index + 1}
                  </span>

                  <span className={styles.stepText}>
                    {step}
                  </span>

                </li>
              ))}

            </ol>

          </div>

        </section>

        {/* RIGHT SIDE */}
        <aside className={styles.detailSidebar}>

          {/* Video */}
          {videoUrl && (
            <div className={styles.videoCard}>

              <div className={styles.videoHeader}>

                <h2 className={styles.sectionTitle}>
                  Exercise Demonstration
                </h2>

                <span className={styles.videoLabel}>
                  VIDEO
                </span>

              </div>

              {/* Reusable VideoPlayer component */}
              <VideoPlayer
                videoUrl={videoUrl}
                title={`${name} Demonstration`}
                description={`Watch how to perform ${name} correctly.`}
              />

            </div>
          )}

          {/* Add to plan */}
          <button
            className={styles.addButton}
            onClick={() => onAddToPlan(exercise)}
          >
            + Add to Workout Plan
          </button>

          {/* Navigation */}
          <div className={styles.navigationButtons}>

            <button
              className={styles.secondaryButton}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>

            <button
              className={styles.secondaryButton}
              onClick={handleNext}
              disabled={
                currentIndex === exercises.length - 1
              }
            >
              Next →
            </button>

          </div>

        </aside>

      </div>

    </main>
  );
};

export default ExerciseDetail;

