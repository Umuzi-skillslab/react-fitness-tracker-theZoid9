import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navigation/Navbar";
import Home from "./components/pages/Home";
import HistoryPage from "./components/pages/HistoryPage";
import ExercisePage from "./components/pages/ExercisePage";
import ExerciseDetail from "./components/Exercise/ExerciseDetail";
import WorkoutPlannerPage from "./components/pages/WorkoutPlannerPage";

import exercisesData from "./components/data/exercisesData";
import "./App.css";

const EMPTY_PLAN = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

function App() {
  const [workoutPlan, setWorkoutPlan] = useState(() => {
    const savedPlan = localStorage.getItem("workoutPlan");

    return savedPlan
      ? JSON.parse(savedPlan)
      : EMPTY_PLAN;
  });

  // Save plan whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "workoutPlan",
      JSON.stringify(workoutPlan)
    );
  }, [workoutPlan]);

  // Add exercise to a day
  const handleAddToPlan = useCallback((day, exercise) => {
    setWorkoutPlan((prev) => {
      const dayExercises = prev[day] || [];

      // Don't add duplicate
      if (
        dayExercises.some(
          (existingExercise) =>
            existingExercise.id === exercise.id
        )
      ) {
        return prev;
      }

      return {
        ...prev,
        [day]: [...dayExercises, exercise],
      };
    });
  }, []);

  // Remove one exercise
  const handleRemoveFromPlan = useCallback(
    (day, exerciseId) => {
      setWorkoutPlan((prev) => ({
        ...prev,
        [day]: (prev[day] || []).filter(
          (exercise) => exercise.id !== exerciseId
        ),
      }));
    },
    []
  );

  // Clear entire day
  const handleClearDay = useCallback((day) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [day]: [],
    }));
  }, []);

  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home workoutPlan={workoutPlan} />}
        />

        <Route
          path="/exercises"
          element={
            <ExercisePage
              workoutPlan={workoutPlan}
              onAddToPlan={handleAddToPlan}
            />
          }
        />

        <Route
          path="/exercises/:id"
          element={
            <ExerciseDetail
              exercises={exercisesData}
              onAddToPlan={(exercise) =>
                handleAddToPlan("monday", exercise)
              }
            />
          }
        />

        <Route
          path="/workout-planner"
          element={
            <WorkoutPlannerPage
              workoutPlan={workoutPlan}
              onRemoveExercise={handleRemoveFromPlan}
              onClearDay={handleClearDay}
            />
          }
        />

        <Route
          path="/history"
          element={<HistoryPage />}
        />
      </Routes>
 
      </div>
    </BrowserRouter>
  );
}

export default App;