import GPTMenuOption from './GPTMenuOption'
import { MenuOption, DropDown } from 'react-web-editor'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'

jest.mock('axios')

describe('GPTMenuOption', () => {
  const mockSetValue = jest.fn()
  const mockSetShowModal = jest.fn()
  const mockSetSuggestions = jest.fn()
  const mockSetModalLoading = jest.fn()
  const mockValue = 'mock value'
  const mockEnhancedText = 'Enhanced resume text'

  const renderComponent = () => {
    render(
      <GPTMenuOption
        value={mockValue}
        setValue={mockSetValue}
        setShowModal={mockSetShowModal}
        setSuggestions={mockSetSuggestions}
        setModalLoading={mockSetModalLoading}
      />,
    )
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders without errors', () => {
    expect(renderComponent).toBeTruthy()
    expect(MenuOption).toBeTruthy()
    expect(DropDown).toBeTruthy()
  })

  describe('when dropdown is clicked', () => {
    test('should show Improve option', async () => {
      renderComponent()
      const dropdown = screen.getByText('Select AI Functionality')
      await fireEvent.click(dropdown)
      expect(screen.getByText('Improve')).toBeTruthy()
    })

    describe('when improve is clicked', () => {
      describe('when there are no errors', () => {
        test('should call enhance API and show suggestions', async () => {
          axios.post.mockResolvedValue({
            data: {
              enhancements: [
                { new_element: 'Enhanced' },
                { new_element: 'resume' },
                { new_element: 'text' },
              ],
            },
          })

          renderComponent()
          fireEvent.click(screen.getByText('Select AI Functionality'))
          fireEvent.click(screen.getByText('Improve'))

          expect(mockSetShowModal).toHaveBeenCalled()
          expect(mockSetModalLoading).toHaveBeenCalled()

          await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
              'http://localhost:8000/api/enhance',
              { resume_text: JSON.stringify(mockValue) },
              {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
              },
            )
          })

          await waitFor(() => {
            expect(mockSetSuggestions).toHaveBeenCalledWith({
              originalText: mockValue,
              suggestedChanges: mockEnhancedText,
              header: 'Suggested Enhancements',
              acceptChanges: expect.any(Function),
            })
          })

          expect(mockSetModalLoading).toHaveBeenCalledWith(false)
        })
      })

      describe('when there are errors', () => {
        beforeEach(() => {
          jest.spyOn(console, 'error').mockImplementation(() => {})
        })

        afterEach(() => {
          console.error.mockRestore()
        })

        test('handles errors in the enhance function gracefully', async () => {
          axios.post.mockRejectedValue(new Error('Network Error'))

          renderComponent()

          fireEvent.click(screen.getByText('Select AI Functionality'))
          fireEvent.click(screen.getByText('Improve'))

          expect(mockSetShowModal).toHaveBeenCalledWith(true)
          expect(mockSetModalLoading).toHaveBeenCalledWith(true)

          await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
              'http://localhost:8000/api/enhance',
              { resume_text: JSON.stringify(mockValue) },
              {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
              },
            )
          })

          await waitFor(() => {
            expect(mockSetModalLoading).toHaveBeenCalledWith(false)
          })

          expect(console.error).toHaveBeenCalledWith(
            'Error enhancing text',
            expect.any(Error),
          )
        })
      })
    })
  })
})
