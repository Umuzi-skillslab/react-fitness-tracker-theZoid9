import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Header from "../common/Header";

import commonStyles from "../common/common.module.css";

import Card from "../UI/Card";

import styles from "./Home.module.css";

const GYM_QUOTES = [
  "The pain you feel today will be the strength you feel tomorrow.",
  "Don't limit your challenges. Challenge your limits.",
  "Your only bad workout is the one that didn't happen.",
  "Discipline will take you where motivation can't.",
  "Small progress is still progress.",
  "The body achieves what the mind believes.",
  "Push yourself because no one else is going to do it for you.",
];

const Home = ({ workoutPlan, workoutHistory }) => {

  // =========================
  // LOADING STATE
  // =========================

  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // QUOTE STATE
  // =========================

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showQuote, setShowQuote] = useState(true);

  // =========================
  // LOADING TIMER
  // =========================

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // =========================
  // ROTATING QUOTES
  // =========================

  useEffect(() => {
    const timer = setInterval(() => {

      // Make current quote disappear
      setShowQuote(false);

      // Wait before showing the next quote
      const nextQuoteTimer = setTimeout(() => {

        setQuoteIndex((current) =>
          (current + 1) % GYM_QUOTES.length
        );

        setShowQuote(true);

      }, 500);

      return () => clearTimeout(nextQuoteTimer);

    }, 9500);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // LOADING SCREEN
  // =========================

  if (isLoading) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className={styles.loading}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // =========================
  // STATISTICS
  // =========================

  const totalPlannedExercises =
    Object.values(workoutPlan || {}).flat().length;

  const activeDays =
    Object.values(workoutPlan || {})
      .filter((day) => day.length > 0)
      .length;

  const totalLogged =
    (workoutHistory || []).length;

  // =========================
  // PAGE
  // =========================

  return (
    <div className={styles.home}>

      <Header
        title="FitTracker Pro"
        subtitle="Plan workouts, track progress, and crush your fitness goals"
      />

      {/* =========================
          GYM QUOTE
          ========================= */}

      <div className={styles.quoteContainer}>

        <p
          className={`${styles.gymQuote} ${
            showQuote ? styles.quoteVisible : styles.quoteHidden
          }`}
        >
          "{GYM_QUOTES[quoteIndex]}"
        </p>

      </div>

      {/* =========================
          DASHBOARD
          ========================= */}

      <div className={commonStyles.pageContainer}>

        <div className={styles.dashboardLinkContainer}>
          <Link
            to="/workout-planner"
            className={styles.dashboardLink}
          >
            DASHBOARD
          </Link>
        </div>

        {/* =========================
            STATS
            ========================= */}

        <div className={styles.statsGrid}>

          <Card>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                {totalPlannedExercises}
              </div>

              <div className={styles.statLabel}>
                Planned Exercises
              </div>
            </div>
          </Card>

          <Card>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                {activeDays}
              </div>

              <div className={styles.statLabel}>
                Active Days
              </div>
            </div>
          </Card>

          <Card>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                {totalLogged}
              </div>

              <div className={styles.statLabel}>
                Workouts Logged
              </div>
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
};

export default Home;