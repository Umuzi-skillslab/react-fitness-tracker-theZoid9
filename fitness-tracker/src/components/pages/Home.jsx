import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../common/Header";
import commonStyles from '../common/common.module.css';
import Card from '../UI/Card';

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

    // Calculate summary stats from plan and history
  const totalPlannedExercises = Object.values(workoutPlan || {}).flat().length;
  const activeDays = Object.values(workoutPlan || {}).filter((d) => d.length > 0).length;
  const totalLogged = (workoutHistory || []).length;

  return (
    <div>
      <Header title="FitTracker Pro" subtitle="Plan workouts, track progress, and crush your fitness goals" />
        <div className={commonStyles.pageContainer}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px',}}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1C1C1E', letterSpacing: '-0.03em' }}>{totalPlannedExercises}</div>
              <div style={{ fontSize: '0.68rem', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginTop: '6px' }}>Planned Exercises</div>
            </div>
          </Card>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1C1C1E', letterSpacing: '-0.03em' }}>{activeDays}</div>
              <div style={{ fontSize: '0.68rem', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginTop: '6px' }}>Active Days</div>
            </div>
          </Card>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1C1C1E', letterSpacing: '-0.03em' }}>{totalLogged}</div>
              <div style={{ fontSize: '0.68rem', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginTop: '6px' }}>Workouts Logged</div>
            </div>
          </Card>
        </div>
        </div>
    </div>
  );
};

export default Home;
