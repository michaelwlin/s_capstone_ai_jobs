import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextInput } from 'flowbite-react'
import { Hero } from '../components'
import { FaSearch, FaMapPin } from 'react-icons/fa'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { maliciousChars } from '../utils/maliciousChars'

const LandingPage = () => {
  const [signedIn, setSignedIn] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const schema = yup.object().shape(
    {
      location: yup
        .string()
        .when(['keyword'], {
          is: (keyword) => !keyword,
          then: () =>
            yup.string().required('Please enter a keyword or location.'),
        })
        .test(
          'maliciousChars',
          'Special characters are not allowed.',
          (value) => !maliciousChars.some((char) => value.includes(char)),
        ),
      keyword: yup
        .string()
        .when(['location'], {
          is: (location) => !location,
          then: () =>
            yup.string().required('Please enter a keyword or location.'),
        })
        .test(
          'maliciousChars',
          'Special characters are not allowed.',
          (value) => !maliciousChars.some((char) => value.includes(char)),
        ),
    },
    ['keyword', 'location'],
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()
  const onSubmit = (e) => {
    navigate('/search-results', { state: { keyword, location } })
  }

  const onChange = (e, type) => {
    if (type === 'keyword') {
      setKeyword(e.target.value)
    } else {
      setLocation(e.target.value)
    }
    clearErrors(type)
  }

  const uploadResume = () => {}
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
        <form
          className="flex flex-row items-start gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
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
