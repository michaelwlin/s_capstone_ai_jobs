import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar, Footer } from './components';
import { Results, FindJobs, HowItWorks, AboutUs, Homepage, Login, Register, SignIn, Resume } from './pages';
import RequireAuth from './components/RequireAuth';
import { FetchApp, FetchUsers, FetchJob } from './components'

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
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/jobs" element={<FetchJob />} />
        <Route path="/users" element={<FetchUsers />} />
        <Route path="/app" element={<FetchApp />} />
        <Route path="/resume" element={<Resume />} />


        {/* Protected Route */}
        <Route element={<RequireAuth />}>
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;