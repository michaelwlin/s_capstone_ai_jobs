import { fireEvent, render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { jest } from '@jest/globals'
import '@testing-library/jest-dom'
import LandingPage from './LandingPage'
import { BrowserRouter } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import axios from 'axios'

jest.mock('../hooks/useAuth')
jest.mock('axios')

const unauthenticatedUser = {
  auth: {
    isAuthenticated: false,
    user: null,
    loading: false,
  },
}

const authenticatedUser = {
  auth: {
    isAuthenticated: true,
    user: 'test',
    userId: 1,
    loading: false,
  },
}

const mockSkills = ['JavaScript', 'Python']

beforeAll(() => {
  window.axios = axios
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('LandingPage', () => {
  let keywordInput, locationInput, submitBtn

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    )
    keywordInput = screen.getByLabelText('keyword')
    locationInput = screen.getByLabelText('location')
    submitBtn = screen.getByTestId('searchBtn')
  }

  describe('component elements', () => {
    beforeEach(() => {
      useAuth.mockReturnValue(unauthenticatedUser)
    })

    test('should have a keyword input', () => {
      renderComponent()
      expect(keywordInput).toBeInTheDocument()
    })

    test('should have a location input', () => {
      renderComponent()
      expect(locationInput).toBeInTheDocument()
    })

    test('should have a submit button', () => {
      renderComponent()
      expect(submitBtn).toBeInTheDocument()
    })
  })

  describe('when user is unauthenticated', () => {
    beforeEach(() => {
      useAuth.mockReturnValue(unauthenticatedUser)
    })

    test('should have a login button', async () => {
      renderComponent()
      const signInBtn = screen.getByRole('button', { name: 'Sign In' })
      fireEvent.click(signInBtn)

      await waitFor(() => expect(window.location.pathname).toContain('/signin'))
    })

    test('user should be able to search by keyword and location', async () => {
      renderComponent()

      fireEvent.change(keywordInput, {
        target: { value: 'Software Developer' },
      })
      fireEvent.change(locationInput, { target: { value: 'New York' } })
      userEvent.click(keywordInput)
      userEvent.click(locationInput)

      expect(await keywordInput).toHaveValue('Software Developer')
      expect(await locationInput).toHaveValue('New York')

      userEvent.click(submitBtn)

      await waitFor(() => {
        expect(window.location.href).toContain('/search-results')
      })
    })
  })

  describe('when user is authenticated', () => {
    beforeEach(async () => {
      useAuth.mockReturnValue(authenticatedUser)
      axios.get.mockResolvedValueOnce({ data: mockSkills })
    })

    test('user should be able to see search with skills functionality', async () => {
      renderComponent()

      await act(async () => {
        expect(axios.get).toHaveBeenCalledWith(
          `http://localhost:4000/api/users/${authenticatedUser.auth.userId}/skills`,
        )
      })

      const skillsCheckbox = await screen.findByLabelText(
        /Check here to enhance search with your skills:/,
      )
      expect(skillsCheckbox).toBeInTheDocument()
    })

    test('should be able to upload resume', async () => {
      renderComponent()

      const uploadResumeBtn = await screen.findByRole('button', {
        name: 'Upload Resume',
      })

      expect(uploadResumeBtn).toBeInTheDocument()

      fireEvent.click(uploadResumeBtn)

      await waitFor(() => expect(window.location.pathname).toContain('/resume'))
    })

    test('user should be able to search by keyword and location', async () => {
      renderComponent()

      fireEvent.change(keywordInput, {
        target: { value: 'Software Developer' },
      })
      fireEvent.change(locationInput, { target: { value: 'New York' } })
      userEvent.click(keywordInput)
      userEvent.click(locationInput)

      expect(await keywordInput).toHaveValue('Software Developer')
      expect(await locationInput).toHaveValue('New York')

      userEvent.click(submitBtn)

      await waitFor(() => {
        expect(window.location.href).toContain('/search-results')
      })
    })
  })
})
