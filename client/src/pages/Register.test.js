import { fireEvent, render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { jest } from '@jest/globals'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import Register from './Register'

jest.mock('axios')
const mockAlert = jest.fn()

beforeAll(() => {
  window.axios = axios
  window.alert = mockAlert
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Register', () => {
  let userNameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    registerBtn

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    )
    userNameInput = screen.getByLabelText('Username')
    emailInput = screen.getByLabelText('Email')
    passwordInput = screen.getByLabelText('Password')
    confirmPasswordInput = screen.getByLabelText('Confirm Password')
    registerBtn = screen.getByTestId('registerBtn')
  }

  describe('registration inputs', () => {
    test('should have a username input', () => {
      renderComponent()
      expect(userNameInput).toBeInTheDocument()
    })

    test('should have an email input', () => {
      renderComponent()
      expect(emailInput).toBeInTheDocument()
    })

    test('should have a password input', () => {
      renderComponent()
      expect(passwordInput).toBeInTheDocument()
    })

    test('should have a confirm password input', () => {
      renderComponent()
      expect(confirmPasswordInput).toBeInTheDocument()
    })

    test('should have a submit button', () => {
      renderComponent()
      expect(registerBtn).toBeInTheDocument()
    })
  })

  describe('when form is filled in correctly', () => {
    test('user should be able to register an account', async () => {
      renderComponent()

      fireEvent.change(userNameInput, {
        target: { value: 'testuser' },
      })
      fireEvent.change(emailInput, {
        target: { value: 'test@gmail.com' },
      })
      fireEvent.change(passwordInput, {
        target: { value: 'Test123@' },
      })
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'Test123@' },
      })

      expect(await userNameInput).toHaveValue('testuser')
      expect(await emailInput).toHaveValue('test@gmail.com')
      expect(await passwordInput).toHaveValue('Test123@')
      expect(await confirmPasswordInput).toHaveValue('Test123@')

      userEvent.click(registerBtn)

      await act(async () => {
        expect(axios.post).toHaveBeenCalledWith(
          `http://localhost:4500/api/auth/register`,
          {
            userName: 'testuser',
            email: 'test@gmail.com',
            password: 'Test123@',
            confirmPassword: 'Test123@',
          },
        )
      })

      expect(mockAlert).toHaveBeenCalledWith('User registered successfully')

      await waitFor(() => {
        expect(window.location.href).toContain('/signIn')
      })
    })
  })

  describe('when form is not filled in correctly', () => {
    test('user should not be able to register an account', async () => {
      renderComponent()

      fireEvent.change(userNameInput, {
        target: { value: 'testuser' },
      })
      fireEvent.change(emailInput, {
        target: { value: 'email' },
      })
      fireEvent.change(passwordInput, {
        target: { value: 'test123' },
      })
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'test123' },
      })

      expect(await userNameInput).toHaveValue('testuser')
      expect(await emailInput).toHaveValue('email')
      expect(await passwordInput).toHaveValue('test123')
      expect(await confirmPasswordInput).toHaveValue('test123')

      userEvent.click(registerBtn)
      expect(axios.post).not.toHaveBeenCalled()
    })
  })
})
