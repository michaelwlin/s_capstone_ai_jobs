import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { NavigationBar } from './components'
import { FindJobs, HowItWorks, AboutUs, Homepage } from './pages'

const App = () => {
  useEffect(() => {
    //TODO: update this with data to be fetched from database
    fetch('http://localhost:3000').then((res) => res.json())
  })

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  )
}

export default App
