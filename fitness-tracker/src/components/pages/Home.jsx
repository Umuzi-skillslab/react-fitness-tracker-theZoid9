import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import commonStyles from '../common/common.module.css';
import Card from '../UI/Card';

import styles from './Home.module.css';

const Home = ({ workoutPlan, workoutHistory }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className={styles.loading}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const totalPlannedExercises = Object.values(workoutPlan || {}).flat().length;
  const activeDays = Object.values(workoutPlan || {}).filter((d) => d.length > 0).length;
  const totalLogged = (workoutHistory || []).length;

  return (
    <div className={styles.home}>
      <Header
        title="FitTracker Pro"
        subtitle="Plan workouts, track progress, and crush your fitness goals"
      />

      <div className={commonStyles.pageContainer}>
        
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