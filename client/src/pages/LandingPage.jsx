import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextInput, Checkbox } from 'flowbite-react'
import { Hero } from '../components'
import { FaSearch, FaMapPin } from 'react-icons/fa'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { maliciousChars } from '../utils/maliciousChars'
import useAuth from '../hooks/useAuth'
import axios from 'axios'

const LandingPage = () => {
  const { auth } = useAuth()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [useSkills, setUseSkills] = useState(false)
  const [userSkills, setUserSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    location: yup
      .string()
      .test(
        'atLeastOne',
        'Keyword and/or location cannot be empty.',
        function () {
          const keyword = this.parent.keyword
          const location = this.parent.location

          return !!keyword || !!location
        },
      )
      .test(
        'maliciousChars',
        'Special characters are not allowed.',
        function (value) {
          return !maliciousChars.some((char) => value?.includes(char))
        },
      )
      .test(
        'numeric',
        'Location cannot be numeric.',
        function (value) {
          return isNaN(value)
        },
      ),
    keyword: yup
      .string()
      .test(
        'atLeastOne',
        'Keyword and/or location cannot be empty.',
        function () {
          const keyword = this.parent.keyword
          const location = this.parent.location

          return !!keyword || !!location
        },
      )
      .test(
        'maliciousChars',
        'Special characters are not allowed.',
        function (value) {
          return !maliciousChars.some((char) => value?.includes(char))
        },
      )
      .test(
        'numeric',
        'Keyword cannot be numeric.',
        function (value) {
          return isNaN(value)
        },
      ),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/${auth.userId}/skills`,
        )

        setUserSkills(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user skills:', error)
      }
    }

    if (auth.isAuthenticated) {
      fetchUserSkills()
    }
  }, [auth.isAuthenticated, auth.userId])

  const onSubmit = () => {
    navigate('/search-results', {
      state: { keyword, location, useSkills },
    })
  }

  const onChange = (e, type) => {
    if (type === 'keyword') {
      setKeyword(e.target.value)
    } else {
      setLocation(e.target.value)
    }
    clearErrors(type)
  }

  const uploadResume = () => {
    navigate('/resume')
  }

  const signIn = () => {
    navigate('/signin')
  }

  const uploadResumeOrSignIn = () => {
    if (auth.isAuthenticated) {
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
      <Hero setKeyword={setKeyword} />
      <div className="text-center mt-12 flex flex-col items-center justify-center">
        <form
          className="flex flex-row items-start gap-2"
          onSubmit={(e) => handleSubmit(onSubmit)(e)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="keywords" hidden={true}>
              keyword
            </label>
            <TextInput
              {...register('keyword')}
              id="keywords"
              icon={FaSearch}
              type="text"
              placeholder="Keywords"
              className="w-250"
              value={keyword}
              color={errors.keyword ? 'failure' : 'blue'}
              helperText={errors.keyword?.message}
              onChange={(e) => onChange(e, 'keyword')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="location" hidden={true}>
              location
            </label>
            <TextInput
              {...register('location')}
              id="location"
              icon={FaMapPin}
              type="text"
              placeholder="Location"
              className="w-250"
              value={location}
              color={errors.location ? 'failure' : 'blue'}
              helperText={errors.location?.message}
              onChange={(e) => onChange(e, 'location')}
            />
          </div>
          <Button
            className="w-120"
            color="blue"
            type="submit"
            data-testid="searchBtn"
          >
            Search
          </Button>
        </form>
        <div className="flex flex-col items-center gap-2">
          <p className="mt-6">OR</p>
          {uploadResumeOrSignIn()}
          {auth?.isAuthenticated && !loading && userSkills.length > 0 && (
            <div className="flex items-start skills-container">
              <div className="custom-checkbox">
                <Checkbox
                  id="useSkills"
                  checked={useSkills}
                  onChange={(e) => setUseSkills(e.target.checked)}
                  className="mr-2"
                />
              </div>
              <label htmlFor="useSkills">
                {' '}
                Check here to enhance search with your skills:{' '}
                {userSkills.join(', ')}
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LandingPage
