import { FaBriefcase } from 'react-icons/fa'
import { Button } from 'flowbite-react'

const Hero = () => {
  return (
    <div className="hero">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Find your best match{' '}
          <FaBriefcase className="inline-block align-bottom" />
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          MatchIQ uses AI to help find your best match (add more in this
          caption)
        </p>
      </div>
      <div className="mt-10 text-center">
        <div className="flex flex-wrap gap-6 mb-5 justify-center">
          <Button color="light" pill>
            front-end
          </Button>
          <Button color="light" pill>
            ux designer
          </Button>
          <Button color="light" pill>
            product manager
          </Button>
          <Button color="light" pill>
            marketing
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          <Button color="light" pill>
            back-end
          </Button>
          <Button color="light" pill>
            cybersecurity
          </Button>
          <Button color="light" pill>
            consulting
          </Button>
          <Button color="light" pill>
            banker
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
