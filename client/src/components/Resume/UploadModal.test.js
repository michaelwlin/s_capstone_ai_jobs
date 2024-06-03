import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import UploadModal from './UploadModal'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('axios')
jest.mock('../../hooks/useAuth')

const mockAuth = {
  auth: {
    isAuthenticated: true,
    user: 'test',
    userId: '1',
  },
}

describe('UploadModal', () => {
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
        <UploadModal openModal={openModal} setOpenModal={setOpenModal} />
      </Router>,
    )
  }

  test('renders the modal and its elements correctly', () => {
    renderComponent()

    expect(screen.getByText('Upload Resume')).toBeTruthy()
    expect(screen.getByText('Upload')).toBeTruthy()
    expect(screen.getByText('Cancel')).toBeTruthy()
  })

  describe('when there are no errors', () => {
    test('uploads the resume correctly', async () => {
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' })

      axios.post.mockImplementation(() => {
        return Promise.resolve({
          data: {
            resume: mockFile,
          },
        });
      });

      renderComponent()

      const fileInput = screen.getByTestId('dropzone-file');
      fireEvent.change(fileInput, { target: { files: [mockFile] } })

      fireEvent.click(screen.getByText('Upload'))

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeTruthy()
      })

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `http://localhost:8000/api/upload_resume`,
          expect.any(FormData),
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': null,
            },
          },
        )
      })
    })
  })

  describe('when there is an error', () => {
    test('displays an error message', async () => {
      // Mock axios.post to reject with an error
      axios.post.mockRejectedValue(new Error('Error uploading file'));
  
      renderComponent()
  
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' })
      const fileInput = screen.getByTestId('dropzone-file');
      fireEvent.change(fileInput, { target: { files: [mockFile] } })
  
      fireEvent.click(screen.getByText('Upload'))
  
      // Wait for the error message to be displayed
      await waitFor(() => {
        expect(screen.getByText('Error uploading file')).toBeTruthy()
      })
    })

    test('displays an error message when the file type is invalid', async () => {
      renderComponent()

      const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' })
      const fileInput = screen.getByTestId('dropzone-file');
      fireEvent.change(fileInput, { target: { files: [mockFile] } })

      fireEvent.click(screen.getByText('Upload'))

      await waitFor(() => {
        expect(screen.getByText('Invalid file type. Please upload a PDF or .docx file')).toBeTruthy()
      })
    })
  })
  
  test('closes the modal when the Cancel button is clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Cancel'))

    expect(setOpenModal).toHaveBeenCalledWith(false)
  })
})