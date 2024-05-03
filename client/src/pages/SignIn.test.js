import SignIn from "./SignIn";
import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "../context/AuthProvider";

describe('SignIn', () => {
  let userNameInput,
    passwordInput,
    loginBtn

  const renderComponent = () => {
    render(
        <BrowserRouter>
            <AuthProvider value={{ validateToken: jest.fn() }}>
            <SignIn />
            </AuthProvider>
        </BrowserRouter>
    );
    userNameInput = screen.getByLabelText('Username')
    passwordInput = screen.getByLabelText('Password')
    loginBtn = screen.getByTestId('loginBtn')
  }

  describe('login inputs', () => {
    test('should have a username input', () => {
      renderComponent()
      expect(userNameInput).toBeInTheDocument()
    })

    test('should have a password input', () => {
      renderComponent()
      expect(passwordInput).toBeInTheDocument()
    })

    test('should have a login button', () => {
      renderComponent()
      expect(loginBtn).toBeInTheDocument()
    })
  })
  
  describe('login functionality', () => {
    test('button should be able to submit the login form', async () => {
      // Mocks the fetch function
      global.fetch = jest.fn(() =>
        Promise.resolve({ 
        ok: false,      // indicates a failed login attempt
        })
      );
      renderComponent()

      // Simulate user entering details and submitting the form
      await act(async () => {
        userEvent.type(userNameInput, 'testuser')
        userEvent.type(passwordInput, 'Test123@')
        fireEvent.click(loginBtn)
      })

      // Fetch should be called twice: once for the initial validation and once for the login attempt
      expect(fetch).toHaveBeenCalledTimes(2)

      // Clean up the mock to ensure that it doesn't affect other tests
      global.fetch.mockRestore();
    })


    test('should display an error message when login fails', async () => {
      global.fetch = jest.fn(() =>
          Promise.resolve({ 
          ok: false,      // indicates a failed login attempt
          })
      );
      renderComponent()

      await act(async () => {
          userEvent.type(userNameInput, 'testuser')
          userEvent.type(passwordInput, 'Test')
          fireEvent.click(loginBtn)
      })

      const errorMessage = await screen.findByText('Login failed. Please check your username and password.')
      expect(errorMessage).toBeInTheDocument()

      global.fetch.mockRestore();
    })

    test('should display a success message when login is successful', async () => {
      global.fetch = jest.fn(() =>
          Promise.resolve({ 
          ok: true,      // indicates a successful login attempt
          })
      );
      renderComponent()

      await act(async () => {
          userEvent.type(userNameInput, 'testuser')
          userEvent.type(passwordInput, 'Test123@')
          fireEvent.click(loginBtn)
      })

      const successMessage = await screen.findByText('Login successful')
      expect(successMessage).toBeInTheDocument()

      global.fetch.mockRestore();
    })
  })
})