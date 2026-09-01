
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navigation/Navbar";

import Home from "./components/pages/Home";
import HistoryPage from "./components/pages/HistoryPage";
import ExercisePage from "./components/pages/ExercisePage";
import ProgressPage from "./components/pages/ProgressPage";
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
  // =========================
  // Workout History
  // =========================

  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem("workoutHistory");

    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // =========================
  // Workout Plan
  // =========================

  const [workoutPlan, setWorkoutPlan] = useState(() => {
    const savedPlan = localStorage.getItem("workoutPlan");

    if (!savedPlan) {
      return EMPTY_PLAN;
    }

    try {
      return JSON.parse(savedPlan);
    } catch {
      return EMPTY_PLAN;
    }
  });

  // =========================
  // Save Workout History
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "workoutHistory",
      JSON.stringify(workoutHistory)
    );
  }, [workoutHistory]);

  // =========================
  // Save Workout Plan
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "workoutPlan",
      JSON.stringify(workoutPlan)
    );
  }, [workoutPlan]);

  // =========================
  // Add Exercise To Plan
  // =========================

  const handleAddToPlan = useCallback((day, exercise) => {
    setWorkoutPlan((prev) => {
      const dayExercises = prev[day] || [];

      // Don't add duplicate exercises
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

  // =========================
  // Remove Exercise From Plan
  // =========================

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

  // =========================
  // Clear Day
  // =========================

  const handleClearDay = useCallback((day) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [day]: [],
    }));
  }, []);

  // =========================
  // App
  // =========================

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
          {/* Home */}
          <Route
            path="/"
            element={
              <Home workoutPlan={workoutPlan} />
            }
          />

          {/* Exercises */}
          <Route
            path="/exercises"
            element={
              <ExercisePage
                workoutPlan={workoutPlan}
                onAddToPlan={handleAddToPlan}
              />
            }
          />

          {/* Exercise Details */}
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

          {/* Workout Planner */}
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

          {/* History */}
          <Route
            path="/history"
            element={
              <HistoryPage
                workoutHistory={workoutHistory}
                setWorkoutHistory={setWorkoutHistory}
              />
            }
          />

          {/* Progress */}
          <Route
            path="/progress"
            element={
              <ProgressPage
                workoutHistory={workoutHistory}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

