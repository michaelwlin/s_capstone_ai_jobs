import Results from './Results'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FetchData from '../components/FetchData'
import '@testing-library/jest-dom'

const mockLocationState = { keyword: 'Engineer', location: 'New York' }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({
    state: mockLocationState,
  })),
}))

jest.mock('../components/FetchData', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div>Mocked FetchData</div>),
  }
})

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Results />
    </BrowserRouter>,
  )
}

describe('Results', () => {
  test('renders without errors', () => {
    expect(renderComponent).toBeTruthy()
  })

  test('displays the correct heading', () => {
    renderComponent()
    const heading = screen.getByText(/Results for "Engineer" in "New York"/)
    expect(heading).toBeInTheDocument()
  })

  test('renders FetchData component with correct props', () => {
    const mockLocationState = { keyword: 'Engineer', location: 'New York' }
    render(
      <BrowserRouter>
        <Results location={{ state: mockLocationState }} />
      </BrowserRouter>,
    )
    expect(FetchData).toHaveBeenCalledWith(
      { keyword: 'Engineer', location: 'New York' },
      expect.anything(),
    )
  })
})
