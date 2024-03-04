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
  const [email, setEmail] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [showOverwriteWarning, setShowOverwriteWarning] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

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

  const uploadResume = async () => {
    if (!resumeFile) {
      alert('Please select a file to upload.');
      return;
    }
    if (!email) {
      alert('Please enter an email address.');
      return;
    }
  
    // Example: Check if a resume already exists
    // This requires an API endpoint on your server to check by email
    const checkResponse = await fetch(`${apiUrl}/users/check-resume?email=${email}`);
    const { exists } = await checkResponse.json();
  
    if (exists) {
      setShowOverwriteWarning(true);
    } else {
      proceedWithUpload();
    }
  };
  
  const proceedWithUpload = async () => {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('email', email);
  
    // Your API endpoint to upload the resume
    await fetch(`${apiUrl}/users/upload-resume`, {
      method: 'POST',
      body: formData,
    });
  
    alert('Resume uploaded successfully.');
  };
  
  // Simple browser confirm dialog for the warning
  if (showOverwriteWarning) {
    if (window.confirm('A resume already exists for this email. Overwrite?')) {
      proceedWithUpload();
    } else {
      setShowOverwriteWarning(false); // User chose to cancel
    }
  }

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
        <div className="flex flex-col items-center gap-2">
          <TextInput
            id="email"
            type="email"
            placeholder="User Email Address"
            className="w-250"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
