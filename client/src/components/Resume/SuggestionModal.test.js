import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SuggestionModal from './SuggestionModal'

describe('SuggestionModal', () => {
  const setShowModal = jest.fn()
  const setSuggestions = jest.fn()
  const acceptChanges = jest.fn()

  const suggestions = {
    originalText: 'Original text',
    suggestedChanges: 'Suggested changes',
    header: 'Header',
    acceptChanges,
  }

  const renderComponent = (showModal, loading) => {
    render(
      <SuggestionModal
        suggestions={suggestions}
        showModal={showModal}
        setShowModal={setShowModal}
        setSuggestions={setSuggestions}
        loading={loading}
      />
    )
  }

  test('renders the modal and its elements correctly', () => {
    renderComponent(true, false)

    expect(screen.getByText('Header')).toBeTruthy()
    expect(screen.getByText('Original text')).toBeTruthy()
    expect(screen.getByText('Suggested changes')).toBeTruthy()
    expect(screen.getByText('Accept Changes')).toBeTruthy()
    expect(screen.getByText('Cancel')).toBeTruthy()
  })

  test('closes the modal and resets the suggestions when the Cancel button is clicked', () => {
    renderComponent(true, false)

    fireEvent.click(screen.getByText('Cancel'))

    expect(setShowModal).toHaveBeenCalledWith(false)
    expect(setSuggestions).toHaveBeenCalledWith({
      originalText: '',
      suggestedChanges: '',
      header: '',
      acceptChanges: expect.any(Function),
    })
  })

  test('accepts the changes and closes the modal when the Accept Changes button is clicked', () => {
    renderComponent(true, false)

    fireEvent.click(screen.getByText('Accept Changes'))

    expect(acceptChanges).toHaveBeenCalled()
    expect(setShowModal).toHaveBeenCalledWith(false)
  })

  test('displays a loading spinner when loading', () => {
    renderComponent(true, true)

    expect(screen.getByText('Generating...please wait')).toBeTruthy()
  })
})
