import { fireEvent, render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { jest } from '@jest/globals'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import FetchData from './FetchData'

jest.mock('axios')
const mockAlert = jest.fn()

beforeAll(() => {
    window.axios = axios
    window.alert = mockAlert
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('FetchData', () => {
    // Test fetch data component renders
    // Test shows progress bar when loading
    // Test shows jobs when loaded
    // Handles error for fetchdata

    // Describe jobs
    // Test should render job listings
    // Test should render job details when job listing clicked

    // Describe select component
    // Test should render select component without errors
    // Test should call onChange when first option selected 
    // Test should call onChange when second option selected
    // Test should call onChange when third option selected

    // Describe filters
    // Test should have employment type dropdown
    // Test should have seniority level dropdown
    // Test should have skills dropdown
    // Test should filter jobs based on selected filters
    // Test should trigger filter application when apply button clicked
    // Test should show alert when no jobs match filters
})


