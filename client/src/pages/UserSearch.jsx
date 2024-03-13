import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, TextInput, ToggleSwitch } from 'flowbite-react'
import { Hero } from '../components'
import { FaSearch, FaMapPin } from 'react-icons/fa'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { maliciousChars } from '../utils/maliciousChars'

const UserSearch = () => {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [useSkills, setUseSkills] = useState(false)
  const [userSkills, setUserSkills] = useState([]);
  const navigate = useNavigate()

  const schema = yup.object().shape({
    keyword: yup.string(),
    location: yup
      .string()
      .required('Location cannot be empty.')
      .test(
        'maliciousChars',
        'Special characters are not allowed.',
        function (value) {
          return !maliciousChars.some((char) => value?.includes(char))
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

  const onSubmit = async () => {
    navigate('/search-results', { state: { keyword, location, useSkills } })
  }

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value)
    clearErrors('keyword')
  }

  const onChangeLocation = (e) => {
    setLocation(e.target.value)
    clearErrors('location')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Hero />
      <div className="text-center mt-12">
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            {...register('keyword')}
            id="keyword"
            icon={FaSearch}
            type="text"
            placeholder="Keywords"
            className="w-250"
            value={keyword}
            color={errors.keyword ? 'failure' : 'blue'}
            helperText={errors.keyword?.message}
            onChange={onChangeKeyword}
          />
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
            onChange={onChangeLocation}
          />
          <ToggleSwitch
            id="useSkills"
            checked={useSkills}
            onChange={setUseSkills}
            label="Enhance search with my skills"
          />
          <Button className="w-120 mt-4" color="blue" type="submit">
            Search
          </Button>
        </form>
      </div>
    </div>
  )
}

export default UserSearch
