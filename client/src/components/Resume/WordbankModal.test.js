import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import WordbankModal from './WordbankModal'

jest.mock('axios')

describe('WordbankModal', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const openModal = true
  const setOpenModal = jest.fn()
  const resume = 'test resume'

  const renderComponent = () => {
    render(<WordbankModal openModal={openModal} setOpenModal={setOpenModal} resume={resume} />)
  }

  test('renders the modal and its elements correctly', () => {
    renderComponent()

    expect(screen.getByText('AI Wordbank')).toBeTruthy()
    expect(screen.getByText('Generate')).toBeTruthy()
    expect(screen.getByText('Later')).toBeTruthy()
  })

  describe('when there are no errors', () => {
    test('generates the wordbank correctly', async () => {
      const mockResponse = {
        data: {
          adjectives: ['adjective1', 'adjective2'],
          verbs: ['verb1', 'verb2'],
        },
      }

      axios.post.mockResolvedValue(mockResponse)

      renderComponent()

      fireEvent.click(screen.getByText('Generate'))

      await waitFor(() => {
        expect(screen.getByText('MatchIQ found 2 adjective(s) and 2 verb(s) for you to try out!')).toBeTruthy()
        expect(screen.getByText('adjective1')).toBeTruthy()
        expect(screen.getByText('adjective2')).toBeTruthy()
        expect(screen.getByText('verb1')).toBeTruthy()
        expect(screen.getByText('verb2')).toBeTruthy()
      })

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'http://localhost:8000/api/wordbank',
          { resume_text: JSON.stringify(resume) },
          { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
        )
      })
    })
  })

  describe('when there is an error', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
        console.error.mockRestore()
    })

    test('handles the error correctly', async () => {
      axios.post.mockRejectedValue(new Error('error'))

      renderComponent()

      fireEvent.click(screen.getByText('Generate'))

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith('Error getting wordbank', expect.any(Error))
      })
    })
  })
})
