# FitTracker Pro

## Project Overview

FitTracker Pro is a responsive React fitness tracking application designed to help users discover exercises, plan weekly workouts, log completed workouts, and monitor their progress. The application provides exercise information, instructional videos, workout audio, filtering and sorting, and a weekly workout planner.

## Features

* Browse a comprehensive exercise database
* Search exercises by name or description
* Filter exercises by:

  * Category
  * Muscle group
  * Difficulty
* Sort exercises by name, difficulty, category, or muscle group
* View detailed exercise information
* View exercise instructions and demonstration videos
* Add exercises to specific workout days
* Weekly Monday–Sunday workout planner
* Remove exercises from workout plans
* Clear planned workout days
* Calculate total exercises, active days, sets, and reps
* Log completed workouts
* View workout history
* Track workout progress
* Dashboard with workout statistics
* Workout motivation quotes
* Workout audio player
* Responsive navigation and mobile layout
* Local browser storage for workout data
* Form validation and user feedback
* Automated component and integration testing

## Technologies Used

* **React** – User interface and component architecture
* **React Router** – Client-side routing and navigation
* **PropTypes** – Component prop validation
* **Jest/Vitest** – Automated JavaScript testing
* **React Testing Library** – Component and user interaction testing
* **Vite** – Development server and build tooling
* **CSS Modules** – Component-scoped styling
* **LocalStorage** – Client-side data persistence

## Installation

Clone the repository and install the dependencies:
```
cd fitness-tracker
```

```bash
npm install
```

Start the application:

```bash
npm start
```

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

> If using the Vite development script instead of `npm start`, run `npm run dev`.

## Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── UI/
│   ├── Exercise/
│   ├── Workout/
│   └── Media/
├── data/
│   └── exercisesData.js
├── pages/
│   ├── Home.jsx
│   ├── Exercises.jsx
│   ├── WorkoutPlanner.jsx
│   ├── History.jsx
│   └── Progress.jsx
├── utils/
│   └── helpers.js
├── App.jsx
├── main.jsx
└── test/
    └── setup.js
```

The project separates reusable UI components, pages, data, utility functions, media components, and tests to keep the application maintainable.

## Major Components

* **Navbar** – Provides application navigation and responsive mobile menu.
* **Home** – Displays dashboard statistics, motivation quotes, audio, and quick actions.
* **ExerciseList** – Displays exercises with search, filtering, and sorting.
* **ExerciseCard** – Presents individual exercise information and planning actions.
* **ExerciseDetail** – Displays detailed instructions, statistics, and exercise video.
* **WorkoutPlanner** – Organizes exercises across the seven days of the week.
* **DayCard** – Displays and manages exercises assigned to a particular day.
* **WorkoutLog** – Records completed workouts.
* **WorkoutHistory** – Displays previously completed workouts.
* **Progress** – Displays workout statistics and progress information.
* **AudioPlayer** – Provides workout audio playback.
* **VideoPlayer** – Displays exercise demonstration videos.
* **Button/Card/SearchBar** – Reusable interface components.

## State Management

Application state is primarily managed using React's `useState` and `useEffect` hooks.

State flows from the main application component to child components through props. For example, workout plan data is passed to the planner, while callback functions allow child components to add or remove exercises.

Workout history and workout plans are persisted using browser LocalStorage so data can remain available between sessions.

## Routing

React Router provides navigation between the application's main pages:

| Route              | Purpose                |
| ------------------ | ---------------------- |
| `/`                | Home dashboard         |
| `/exercises`       | Exercise browser       |
| `/exercises/:id`   | Exercise details       |
| `/workout-planner` | Weekly workout planner |
| `/history`         | Workout history        |
| `/progress`        | Progress tracking      |

## Testing Strategy

The application uses component, utility, and integration tests.

React Testing Library is used to test components from the user's perspective, including rendering, buttons, navigation, filtering, form interactions, and state changes.

Tests cover reusable components such as Buttons and Cards, exercise components, workout planning, navigation, media components, utility functions, and important application flows.

Coverage is generated using the coverage command:

```bash
npm test -- --coverage
```

### Test Coverage Report

| Metric     |       Coverage |
| ---------- | -------------: |
| Statements | **[INSERT %]** |
| Branches   | **[INSERT %]** |
| Functions  | **[INSERT %]** |
| Lines      | **[INSERT %]** |

## Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Exercises Page

![Exercises Page](screenshots/exercises.png)

### Exercise Detail

![Exercise Detail](screenshots/exercise-detail.png)

### Workout Planner

![Workout Planner](screenshots/workout-planner.png)

### Workout History

![Workout History](screenshots/history.png)

### Progress Tracking

![Progress](screenshots/progress.png)

### Mobile Responsive View

![Mobile View](screenshots/mobile.png)

### Test Coverage Report

![Test Coverage](screenshots/coverage.png)

## Future Enhancements

* User authentication and individual accounts
* Cloud-based workout synchronization
* Exercise favorites
* Personal workout templates
* Progress charts and graphs
* Weight and body measurement tracking
* Personal records and achievements
* Push notifications and workout reminders
* More exercise videos and audio
* Dark/light theme selection
* Social sharing and workout challenges
* Backend database integration

## Conclusion

FitTracker Pro demonstrates a complete React application using reusable components, client-side routing, state management, persistent data, responsive design, and automated testing. The application provides a foundation that can be extended with authentication, cloud storage, analytics, and additional fitness features.
