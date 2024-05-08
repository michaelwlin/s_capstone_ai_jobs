import Summary from './Summary'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

const initialProps = {
  parentStyle: {
    parentWidth: 1150,
    width: 1150 - 20,
    height: 1754,
    unit: 'px',
    headerFontSize: 0.24,
    textFontSize: 0.2,
  },
  defaultLeft: 20,
  childSpacer: 5,
  summaryTop: 50,
  resumeSummary: 'Summary Description',
}

jest.mock('./index', () => ({
  GPTMenuOption: jest.fn(),
  SuggestionModal: jest.fn(),
}))

const renderComponent = (props) => {
  render(
    <Summary
      parentStyle={props.parentStyle}
      defaultLeft={props.defaultLeft}
      childSpacer={props.childSpacer}
      summaryTop={props.summaryTop}
      resumeSummary={props.resumeSummary}
    />,
  )
}

describe('Summary', () => {
  test('renders correctly with initial props', () => {
    renderComponent(initialProps)
    expect(screen.getByText('SUMMARY')).toBeInTheDocument()
    expect(screen.getByText(initialProps.resumeSummary)).toBeInTheDocument()
  })

  test('suggestionmodal is not visible by default', () => {
    renderComponent(initialProps)
    expect(screen.queryByText('SuggestionModal')).not.toBeInTheDocument()
  })

  test('updates components when props change', () => {
    renderComponent({ ...initialProps, resumeSummary: 'New Summary' })
    expect(screen.getByText('New Summary')).toBeInTheDocument()
  })
})
