import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavigationBar, Footer } from './components'
import { Results, FindJobs, HowItWorks, AboutUs, Homepage} from './pages'

const App = () => {
  useEffect(() => {
    //TODO: update this with data to be fetched from database
    fetch('http://localhost:3000').then((res) => res.json())
  })

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/search-results" element={<Results />} />
        </Routes>
        
      </Router>
      <Footer />
    </div>
  )
}

export default App
