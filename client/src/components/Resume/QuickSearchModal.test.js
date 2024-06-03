import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import QuickSearchModal from './QuickSearchModal'
import config from '../clientConfig';

jest.mock('axios')

const mockLocationState = { keyword: 'Software Engineer', location: 'Los Angeles, CA' }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: mockLocationState,
  }),
}))

describe('QuickSearchModal', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const openModal = true
  const setOpenModal = jest.fn()
  const resume = 'test resume'

  const renderComponent = () => {
    render(
      <QuickSearchModal openModal={openModal} setOpenModal={setOpenModal} resume={resume} />,
    )
  }

  test('renders the modal and its elements correctly', () => {
    renderComponent()

    expect(screen.getByText('AI Scorer')).toBeTruthy()
    expect(screen.getByTestId('test-keyword')).toBeTruthy()
    expect(screen.getByTestId('test-location')).toBeTruthy()
    expect(screen.getByText('Quick Search')).toBeTruthy()
  })

  test('closes the modal correctly', () => {
    renderComponent()
    fireEvent.click(screen.getByLabelText('Close'))
    expect(setOpenModal).toHaveBeenCalledWith(false)

  })

  describe('when there are no errors', () => {
    const mockResponse = {
      data: {
        jobs: [
          {
            title: 'Job 1',
            company: 'Company 1',
            location: 'Location 1',
            description: 'Description 1',
          },
          {
            title: 'Job 2',
            company: 'Company 2',
            location: 'Location 2',
            description: 'Description 2',
          },
        ],
      },
    }

    test('QuickSearch fetches jobs and displays them when clicked', async () => {
      axios.get.mockResolvedValue(mockResponse)
      renderComponent()

      fireEvent.click(screen.getByText('Quick Search'))

      await waitFor(() => {
        expect(screen.getByText('Job 1 - Company 1 (Location 1)')).toBeTruthy()
        expect(screen.getByText('Description 1')).toBeTruthy()
        expect(screen.getByText('Job 2 - Company 2 (Location 2)')).toBeTruthy()
        expect(screen.getByText('Description 2')).toBeTruthy()
      })

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith(
          `${config.API_URL}/jobs?keyword=&location=`,, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
  
            },
            credentials: 'include', // Include cookies in the request and response
          },
        )
      })
    })

    test('gets MatchIQ Score when button is clicked', async () => {
      renderComponent()

      const mockScoreResponse = {
        data: {
          score: '90',
          reasoning: 'High match',
        },
      }

      axios.get.mockResolvedValue(mockResponse)
      axios.post.mockResolvedValue(mockScoreResponse)

      fireEvent.click(screen.getByText('Quick Search'))

      await waitFor(() => {
        expect(screen.getByText('Job 1 - Company 1 (Location 1)')).toBeTruthy()
      })

      const scoreButtons = screen.getAllByText('Get MatchIQ Score')
      fireEvent.click(scoreButtons[0])

      await waitFor(() => {
        expect(screen.getByText(/Matching Score: 90/i)).toBeTruthy()
        expect(screen.getByText(/Reasoning: High match/i)).toBeTruthy()
      })

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'http://localhost:8000/api/get_score',
          {
            resume_text: JSON.stringify(resume),
            job_desc: 'Description 1',
          },
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          }
        )
      })
    })
  })

  describe('when there are errors', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => { })
    })

    afterEach(() => {
      console.error.mockRestore()
    })

    test('handles the error correctly when getting jobs', async () => {
      axios.get.mockRejectedValue(new Error('Error getting jobs'))

      renderComponent()

      fireEvent.click(screen.getByText('Quick Search'))

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith('Error getting jobs', expect.any(Error))
      })
    })

    test('handles the error correctly when getting the score', async () => {
      const mockResponse = {
        data: {
          jobs: [
            {
              title: 'Job 1',
              company: 'Company 1',
              location: 'Location 1',
              description: 'Description 1',
            },
            {
              title: 'Job 2',
              company: 'Company 2',
              location: 'Location 2',
              description: 'Description 2',
            },
          ],
        },
      }

      axios.post.mockRejectedValue(new Error('Error getting score'))

      renderComponent()
      axios.get.mockResolvedValue(mockResponse)
      fireEvent.click(screen.getByText('Quick Search'))

      await waitFor(() => {
        expect(screen.getByText('Job 1 - Company 1 (Location 1)')).toBeTruthy()
      })

      const scoreButtons = screen.getAllByText('Get MatchIQ Score')

      fireEvent.click(scoreButtons[0])

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith('Error getting score', expect.any(Error))
      })
    })
  })
})