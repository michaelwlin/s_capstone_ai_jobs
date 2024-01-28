import { Button } from 'flowbite-react'
import { Hero } from '../components'

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Hero />
      <div className="text-center mt-12">
        <form className="flex flex-row items-center gap-2">
          <input
            type="text"
            placeholder="keywords"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="location"
            className="p-2 border border-gray-300 rounded"
          />
          <Button color="blue" type="submit">
            Search
          </Button>
        </form>
        <p className="mt-4">OR</p>
        <Button color="dark">Sign In</Button>
      </div>
    </div>
  )
}

export default LandingPage
