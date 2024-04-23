import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavigationBar, Footer } from './components'
import { Results, FindJobs, HowItWorks, AboutUs, Homepage, Register, SignIn, Resume, Dashboard, UserProfile, SavedJobs, UserSettings } from './pages'
import { FetchApp, FetchUsers, FetchJob, RequireAuth } from './components'

const App = () => {

  return (
    <div className="App flex flex-col min-h-screen">
      <div className="main-content flex-grow mb-auto">
        <NavigationBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/search-results" element={<Results />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/jobs" element={<FetchJob />} />
          <Route path="/app" element={<FetchApp />} />

          {/* Protected Route */}
          <Route element={<RequireAuth />}>
            <Route path="/users" element={<FetchUsers />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/resume/:_id" element={<Resume />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/user-settings" element={<UserSettings />} />
          </Route>
        </Routes>
        <Footer/>
      </div>
    </div>
  )
}

export default App;