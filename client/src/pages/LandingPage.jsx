import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextInput } from 'flowbite-react'
import { Hero } from '../components'
import { FaSearch, FaMapPin } from 'react-icons/fa'

const LandingPage = () => {
  const [signedIn, setSignedIn] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/search-results', { state: { keyword, location } });
  };

  const uploadResume = () => { }
  const signIn = () => {
    setSignedIn(true)
  }

  const uploadResumeOrSignIn = () => {
    if (signedIn) {
      return (
        <Button color="blue" className="mt-4 w-200" onClick={uploadResume}>
          Upload Resume
        </Button>
      )
    } else {
      return (
        <Button color="dark" className="mt-4 w-200" onClick={signIn}>
          Sign In
        </Button>
      )
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Hero />
      <div className="text-center mt-12">
        <form className="flex flex-row items-center gap-2" onSubmit={handleSubmit}>
          <TextInput
            id="keywords"
            icon={FaSearch}
            type="text"
            placeholder="Keywords"
            className="w-250"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <TextInput
            id="location"
            icon={FaMapPin}
            type="text"
            placeholder="Location"
            className="w-250"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button className="w-120" color="blue" type="submit">
            Search
          </Button>
        </form>
        <div className="flex flex-col items-center gap-2">
          <p className="mt-6">OR</p>
          {uploadResumeOrSignIn()}
        </div>
      </div>
    </div>
  )
}

export default LandingPage
