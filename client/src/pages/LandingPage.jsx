import { Button } from 'flowbite-react'

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-4">
        <p className="text-xl font-semibold">
          Welcome to MatchIQ - Let's find you some jobs!
        </p>
        <form className="flex flex-col items-center gap-2 mt-4">
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
          <p className="mt-4">OR</p>
          <Button color="dark">Sign In</Button>
        </form>
      </div>
    </div>
  )
}

export default LandingPage
