import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../../components/Navigation/Navbar';

// Integration test: Navigation between routes works correctly
// Routing test: programmatic navigation via Link clicks
const renderWithRouter = (initialRoute) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
      <Routes>
        <Route path='/' element={<div>Home Page</div>} />
        <Route path='/exercises' element={<div>Exercises Page</div>} />
        <Route path='/workout-planner' element={<div>Planner Page</div>} />
        <Route path='/history' element={<div>History Page</div>} />
        <Route path='/progress' element={<div>Progress Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Navigation Integration', () => {
  // Test 46: Clicking a nav link navigates to the correct page (routing integration)
  it('navigates to the Exercises page when Exercises link is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter('/');
    await user.click(screen.getByText('Exercises'));
    expect(screen.getByText('Exercises Page')).toBeInTheDocument();
  });

  // Test 47: Clicking Home link navigates back to home
  it('navigates to the Home page when Home link is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter('/exercises');
    await user.click(screen.getByText('Home'));
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  // Test 48: Active route styling updates on navigation
  it('updates active styling when navigating between pages', async () => {
    const user = userEvent.setup();
    renderWithRouter('/');
    // Home should be active initially
    const homeLink = screen.getByText('Home');
    expect(homeLink.className).toMatch(/active/);
    // Navigate to exercises
    await user.click(screen.getByText('Exercises'));
    const exercisesLink = screen.getByText('Exercises');
    expect(exercisesLink.className).toMatch(/active/);
    // Home should no longer be active
    expect(homeLink.className).not.toMatch(/active/);
  });
});
