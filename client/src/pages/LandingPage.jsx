import { useState, useMemo } from 'react'
import { Button, TextInput } from 'flowbite-react'
import { Hero } from '../components'
import { FaSearch, FaMapPin } from 'react-icons/fa'

const LandingPage = () => {
  const [signedIn, setSignedIn] = useState(false)
  const uploadResumeOrSignIn = () => {
    if (signedIn) {
      return (
        <Button color="blue" className="mt-4">
          Upload Resume
        </Button>
      )
    } else {
      return (
        <Button color="dark" className="mt-4 w-200">
          Sign In
        </Button>
      )
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Hero />
      <div className="text-center mt-12">
        <form className="flex flex-row items-center gap-2">
          <TextInput icon={FaSearch} type="text" placeholder="Keywords" />
          <TextInput icon={FaMapPin} type="text" placeholder="Location" />
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
