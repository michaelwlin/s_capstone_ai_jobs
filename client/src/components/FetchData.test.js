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
    const renderComponent = async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <FetchData />
                </MemoryRouter>
            );
        });
    }

    test('renders FetchData component', async () => {
        console.error = jest.fn();
        await renderComponent();
    })

    // Test shows progress bar when loading
    // test('shows progress bar when loading', async () => {
    //     await renderComponent();
    //     expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    // })

    // Test shows jobs when loaded
    
    // Handles error for fetchdata
    test('handles error for fetchdata', async () => {
        axios.get.mockRejectedValueOnce(new Error());       // Mock axios get request to return an error
        console.error = jest.fn();                          // Mock console.error to prevent error from being displayed
        await renderComponent();                
        expect(console.error).toHaveBeenCalledTimes(1); 
    })

    // Describe jobs
    // Test should render job listings
    // Test should render job details when job listing clicked

    // Describe filters
    // Test should have employment type dropdown
    // Test should have seniority level dropdown
    // Test should have skills dropdown
    // Test should filter jobs based on selected filters
    // Test should trigger filter application when apply button clicked
    // Test should show alert when no jobs match filters
})


