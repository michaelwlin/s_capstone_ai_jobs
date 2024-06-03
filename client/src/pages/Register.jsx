import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, TextInput } from 'flowbite-react'

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
const usernameRegex = /^[a-zA-Z0-9]{3,20}$/

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isEmailValid, setIsEmailValid] = useState(null)
  const [isPasswordValid, setIsPasswordValid] = useState(null)
  const [isUsernameValid, setIsUsernameValid] = useState(null)
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(null)
  const [touchedFields, setTouchedFields] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const handleChange = (e) => {
    try {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      if (name === 'userName') {
        setIsUsernameValid(usernameRegex.test(value))
      } else if (name === 'email') {
        setIsEmailValid(emailRegex.test(value))
      } else if (name === 'password') {
        const isValid = passwordRegex.test(value)
        setIsPasswordValid(isValid)
        setDoPasswordsMatch(value === formData.confirmPassword)
      } else if (name === 'confirmPassword') {
        setDoPasswordsMatch(value === formData.password)
      }
    } catch (error) {
      console.error('Error handling input change:', error)
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }))

    if (name === 'email') {
      setIsEmailValid(emailRegex.test(formData.email))
    } else if (name === 'password') {
      setIsPasswordValid(passwordRegex.test(formData.password))
      setDoPasswordsMatch(formData.password === formData.confirmPassword)
    } else if (name === 'confirmPassword') {
      setDoPasswordsMatch(formData.password === formData.confirmPassword)
    }
  }

  const canSubmit = () => {
    return (
      isEmailValid &&
      isPasswordValid &&
      doPasswordsMatch &&
      isUsernameValid
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit()) {
      alert('Please check your input')
      return
    }

    try {
      await axios.post(`http://localhost:4500/api/auth/register`, formData)
      alert('User registered successfully')
      setFormData({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      navigate('/signIn')
    } catch (error) {
      console.error('Error registering user:', error)
      alert('Error registering user')
    }
  }

  const isFormValid = () => {
    const { userName, email, password, confirmPassword } = formData
    const isEveryFieldFilled = userName && email && password && confirmPassword
    const isEmailValid = emailRegex.test(email)
    const doPasswordsMatch = password === confirmPassword
    const isPasswordValid = passwordRegex.test(password)

    return (
      isEveryFieldFilled && isEmailValid && doPasswordsMatch && isPasswordValid
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
        New User Registration
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          gap: '10px',
        }}
      >
        <label
          htmlFor="userName"
          className={`${isUsernameValid ? 'text-green-700' : 'text-black-700'} block mb-2 text-sm font-medium`}
        >
          Username
        </label>
        <TextInput
          id="userName"
          name="userName"
          type="text"
          value={formData.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          color={isUsernameValid === null ? 'gray' : isUsernameValid ? 'green' : 'red'}
          placeholder="Username"
        />
        {touchedFields.userName && isUsernameValid === false && (
          <p className="mt-2 text-sm text-red-600">
            <span className="font-medium">Oops!</span> Username must be
            alphanumeric and 3-20 characters long.
          </p>
        )}

        <label
          htmlFor="email"
          className={`${isEmailValid ? 'text-green-700' : 'text-black-700'} block mb-2 text-sm font-medium`}
        >
          Email
        </label>
        <TextInput
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          color={isEmailValid === null ? 'gray' : isEmailValid ? 'green' : 'red'}
          placeholder="Email"
        />
        {touchedFields.email && isEmailValid === false && (
          <p className="mt-2 text-sm text-red-600">
            <span className="font-medium">Oops!</span> Please enter a valid
            email address.
          </p>
        )}

        <label
          htmlFor="password"
          className={`${isPasswordValid ? 'text-green-700' : 'text-black-700'} block mb-2 text-sm font-medium`}
        >
          Password
        </label>
        <TextInput
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          color={isPasswordValid === null ? 'gray' : isPasswordValid ? 'green' : 'red'}
          placeholder="Password"
        />
        {touchedFields.password && isPasswordValid === false && (
          <p className="mt-2 text-sm text-red-600">
            <span className="font-medium">Oops!</span> Password does not meet the requirements.
          </p>
        )}
        <div style={{ fontStyle: 'italic', fontSize: '10px' }}>
          <p>Password requirements:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Length is 8-30 characters</li>
            <li>Includes a special character (@$!%*?&)</li>
            <li>Contains a number</li>
          </ul>
        </div>
        <label
          htmlFor="confirmPassword"
          className={`${doPasswordsMatch ? 'text-green-700' : 'text-black-700'} block mb-2 text-sm font-medium`}
        >
          Confirm Password
        </label>
        <TextInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          color={doPasswordsMatch === null ? 'gray' : doPasswordsMatch ? 'green' : 'red'}
          placeholder="Confirm Password"
        />
        {touchedFields.confirmPassword && doPasswordsMatch === false && (
          <div className="text-red-500 text-sm mt-2">
            <span className="font-medium">Oops!</span> Passwords do not match.
          </div>
        )}

        <Button
          type="submit"
          data-testid="registerBtn"
          disabled={!isFormValid()}
          className={`w-full ${isFormValid() ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
        >
          Register
        </Button>
      </form>
    </div>
  )
}

export default Register