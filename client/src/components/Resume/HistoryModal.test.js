import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import HistoryModal from './HistoryModal'

jest.mock('axios')
jest.mock('../../hooks/useAuth')

const mockAuth = {
  auth: {
    isAuthenticated: true,
    user: 'test',
    userId: '1',
  },
}

describe('HistoryModal', () => {
  beforeEach(() => {
    useAuth.mockReturnValue(mockAuth)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const openModal = true
  const setOpenModal = jest.fn()

  const renderComponent = () => {
    render(
      <Router>
        <HistoryModal openModal={openModal} setOpenModal={setOpenModal} />
      </Router>,
    )
  }

  test('renders the modal and its elements correctly', () => {
    renderComponent()

    expect(screen.getByText('Resume Versions')).toBeTruthy()
    expect(screen.getByText('Close')).toBeTruthy()
  })

  describe('when there are no errors', () => {
    test('fetches and displays resumes correctly', async () => {
      const mockResumes = [
        { _id: '1', date_added: '2023-05-16T12:00:00Z' },
        { _id: '2', date_added: '2023-05-17T12:00:00Z' },
      ]

      axios.get.mockImplementation(() =>
        Promise.resolve({
          data: {
            resume: mockResumes,
          },
        }),
      )

      renderComponent()

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith(
          `http://localhost:4000/api/users/${mockAuth.auth.userId}`,
        )
      })
      await waitFor(() => {
        expect(screen.getByText('Resume 1')).toBeTruthy()
        expect(screen.getByText('Resume 2')).toBeTruthy()
      })
    })
  })

  describe('when there are errors', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
      console.error.mockRestore()
    })

    test('handles errors when fetching resumes', async () => {
      axios.get.mockRejectedValue(new Error('error'))

      renderComponent()

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith(
          'There was an error fetching the resume data:',
          expect.any(Error),
        )
      })
    })
  })

  test('closes the modal when the Close button is clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Close'))

    expect(setOpenModal).toHaveBeenCalledWith(false)
  })
})
