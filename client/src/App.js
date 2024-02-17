import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavigationBar, Footer } from './components'
import { Results, FindJobs, HowItWorks, AboutUs, Homepage, Register, SignIn } from './pages'
import FetchApp from "./components/FetchApp";
import FetchUsers from "./components/FetchUsers";
import FetchJob from "./components/FetchJob";
import FetchData from "./components/FetchData";
import DatabaseView from "./pages/DatabaseView";

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
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/jobs" element={<FetchJob />} />
          <Route path="/users" element={<FetchUsers />} />
          <Route path="/app" element={<FetchApp />} />     
          <Route path="/database-view" element={<DatabaseView />} /> 
        </Routes>
        
      </Router>
      <Footer />
    </div>
  )
}

export default App
