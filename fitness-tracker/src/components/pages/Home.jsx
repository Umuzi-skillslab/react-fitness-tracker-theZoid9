import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../common/Header";
import commonStyles from '../common/common.module.css';
/**
 * Home page — landing page with overview stats, quick links, and motivational audio.
 * Demonstrates useEffect for loading data and conditional rendering.
 */
const Home = ({ workoutPlan, workoutHistory }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial data loading (useEffect)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className={commonStyles.pageContainer}><p>Loading...</p></div>;
  }


  return (
    <div>
      <Header title="FitTracker Pro" subtitle="Plan workouts, track progress, and crush your fitness goals" />

    </div>
  );
};

export default Home;
