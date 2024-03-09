import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar, Footer } from './components';
import { Results, FindJobs, HowItWorks, AboutUs, Homepage, Login } from './pages';
import RequireAuth from './components/RequireAuth';

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/search-results" element={<Results />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route element={<RequireAuth />}>
          <Route path="/about-us" element={<AboutUs />} />
        </Route>

        {/* <Route path="/about-us" element={
          <RequireAuth>
            <AboutUs />
          </RequireAuth>} /> */}

      </Routes>
      <Footer />
    </div>
  );
};

export default App;