import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./Exercise.module.css";
import { formatDuration } from "../utils/helpers";

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

  const exercise = exercises.find(
    (exercise) => exercise.id === Number(id)
  );

  if (isLoading) {
    return (
      <div className={styles.notFound}>
        <p>Loading exercise details...</p>
      </div>
    );
  }

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

  const currentIndex = exercises.findIndex(
    (exercise) => exercise.id === Number(id)
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(`/exercises/${exercises[currentIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      navigate(`/exercises/${exercises[currentIndex + 1].id}`);
    }
  };

  return (
    <main className={styles.detailPage}>

      {/* Back */}
      <button
        className={styles.backButton}
        onClick={() => navigate("/exercises")}
      >
        ← Back to Exercises
      </button>

      <div className={styles.detailContainer}>

        {/* Main content */}
        <section className={styles.detailMain}>

          <h1 className={styles.detailTitle}>
            {name}
          </h1>

          {/* Exercise tags */}
          <div className={styles.detailBadges}>
            <span className={styles.badge}>
              {category}
            </span>

            <span className={styles.badge}>
              {difficulty}
            </span>

            <span className={styles.badge}>
              {muscleGroup}
            </span>
          </div>

          <p className={styles.detailDesc}>
            {description}
          </p>

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
              Proper Form Instructions
            </h2>

            <ol className={styles.instructionsList}>
              {instructions.map((step, index) => (
                <li key={index}>
                  <span className={styles.stepNumber}>
                    {index + 1}
                  </span>

                  <span>
                    {step}
                  </span>
                </li>
              ))}
            </ol>

          </div>

        </section>

        {/* Sidebar */}
        <aside className={styles.detailSidebar}>

          {/* Video */}
          {videoUrl && (
            <div className={styles.videoCard}>

              <h2 className={styles.sectionTitle}>
                Demonstration
              </h2>

              <video
                className={styles.exerciseVideo}
                src={videoUrl}
                controls
              >
                Your browser does not support video.
              </video>

            </div>
          )}

          {/* Add to plan */}
          <button
            className={styles.addButton}
            onClick={() => onAddToPlan(exercise)}
          >
            + Add to Workout Plan
          </button>

          {/* Previous / Next */}
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

