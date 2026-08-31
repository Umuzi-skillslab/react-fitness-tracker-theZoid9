import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './components/pages/Home';
import ExercisePage from "./components/pages/ExercisePage";
import ExerciseDetail from './components/Exercise/ExerciseDetail';
import exercisesData from './components/data/exercisesData';

import './App.css'

const EMPTY_PLAN = {
  monday: [    { id: 1, name: 'Push Ups' },
    { id: 2, name: 'Bench Press' },],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};


function App() {
  
  // Shared state: workout plan (complex object state managed at top level)
  const [workoutPlan, setWorkoutPlan] = useState(() => {
  const savedPlan = localStorage.getItem('workoutPlan');

    return savedPlan
      ? JSON.parse(savedPlan)
      : EMPTY_PLAN;
  });

    useEffect(() => {
    localStorage.setItem(
      'workoutPlan',
      JSON.stringify(workoutPlan)
    );
  }, [workoutPlan]);


    const handleAddToPlan = useCallback((day, exercise) => {
    setWorkoutPlan((prev) => {
      const dayExercises = prev[day] || [];
      // Prevent duplicates within the same day
      if (dayExercises.some((e) => e.id === exercise.id)) return prev;
      return {
        ...prev,
        [day]: [...dayExercises, exercise],
      };
    });
  }, []);

  // Callback: remove a single exercise from a specific day
  const handleRemoveFromPlan = useCallback((day, exerciseId) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [day]: (prev[day] || []).filter((e) => e.id !== exerciseId),
    }));
  }, []);

  // Callback: clear all exercises from a specific day
  const handleClearDay = useCallback((day) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [day]: [],
    }));
  }, []);


  return (
    <BrowserRouter>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar/>
      <Routes>
          <Route path="/" element=
          {<Home workoutPlan={workoutPlan} />} />
           <Route path="/exercises" element={
              <ExercisePage workoutPlan={workoutPlan} onAddToPlan={handleAddToPlan} />
            }/>

            {/* Dynamic route for individual exercise detail — uses route params */}
            <Route path="/exercises/:id" element={
              <ExerciseDetail exercises={exercisesData} onAddToPlan={(exercise) => handleAddToPlan('monday', exercise)} />
            } />
           {/* Dynamic route for individual exercise detail — uses route params */}
            <Route path="/exercises/:id" element={
              <ExerciseDetail exercises={exercisesData} onAddToPlan={(exercise) => handleAddToPlan('monday', exercise)} />
            } />
      </Routes>
    </div>


  
    </BrowserRouter>
  )
}

export default App
