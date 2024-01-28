import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavigationBar from './components/NavigationBar'
import FindJobsPage from './pages/FindJobs'
import HowItWorksPage from './pages/HowItWorks'
import AboutUsPage from './pages/AboutUs'
import HomePage from './pages/LandingPage'

const App = () => {
  useEffect(() => {
    //TODO: update this with data to be fetched from database
    fetch('http://localhost:3000').then((res) => res.json())
  })

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-jobs" element={<FindJobsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </Router>
  )
}

export default App
