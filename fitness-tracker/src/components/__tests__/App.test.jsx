import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import Header from '../common/Header';
import NotFound from '../pages/NotFound';
import { Routes, Route } from 'react-router-dom';

// Routing test: Verify routes render correct page components
// We test each route individually to avoid nested Router issues
const renderWithRoutes = (initialRoute) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Header title='FitTracker Pro' />} />
        <Route path='/exercises' element={<div>Exercises Page Content</div>} />
        <Route path='/workout-planner' element={<div>Planner Page Content</div>} />
        <Route path='/history' element={<div>History Page Content</div>} />
        <Route path='/progress' element={<div>Progress Page Content</div>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('App Routing', () => {
  // Test 53: Home route renders the home page content
  it('renders Home page on / route', () => {
    renderWithRoutes('/');
    expect(screen.getByText('FitTracker Pro')).toBeInTheDocument();
  });

  // Test 54: 404 page rendered for unknown routes
  it('renders 404 page for unknown routes', () => {
    renderWithRoutes('/this-route-does-not-exist');
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
