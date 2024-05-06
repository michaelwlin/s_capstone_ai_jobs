import { useState } from 'react'
import { Button, Modal, FileInput, Label, Spinner } from 'flowbite-react'
import { FaUpload } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getCSRFToken } from '../../api/csrfToken.js'
import useAuth from '../../hooks/useAuth.js'
import config from '../../clientConfig.js';

const UploadModal = ({ openModal, setOpenModal }) => {
  const navigate = useNavigate()
  const [inputFile, setInputFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { auth } = useAuth()

  const onClickUpload = () => {
    parseResume(inputFile)
  }

  const parseResume = async (file) => {
    const csrfToken = getCSRFToken()
    const validFile = validateFileType(file)
    if (!validFile) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('userID', auth.userId)

      const res = await axios.post(
        `${config.API_URL}/upload_resume`, {
        withCredentials: true // Add this line to include cookies
      },
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrfToken,
          },
        },
      )

      if (res) {
        setLoading(false)
        setOpenModal(false)
        navigate(0)
      }
    } catch (err) {
      setLoading(false)
      setError('Error uploading file')
    }
  }

  const validateFileType = (file) => {
    const fileType = file.type
    if (
      fileType !== 'application/pdf' &&
      fileType !==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      setError('Invalid file type. Please upload a PDF or .docx file')
      return false
    } else {
      return true
    }
  }

  const handleInputFile = (e) => {
    clearUpload()
    const file = e.target.files[0]
    setInputFile(file)
  }

  const clearUpload = () => {
    setInputFile(null)
    setError('')
  }

  const cancelUpload = () => {
    clearUpload()
    setOpenModal(false)
  }

  const isLoading = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner size="xl" className="mr-2" />
        <p>Uploading...please wait</p>
      </div>
    )
  }

  const fileUploader = () => {
    if (!inputFile) {
      return (
        <>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            .docx or PDF
          </p>
        </>
      )
    } else {
      return (
        <>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {inputFile.name}
          </p>
          <p className="mb-4 text-sm text-red-500 dark:text-red-400">{error}</p>
        </>
      )
    }
  }

  const labelColor = error ? 'failure' : 'gray'

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Upload Resume</Modal.Header>
      <Modal.Body>
        <div className="flex w-full items-center justify-center">
          {loading && isLoading()}
          {!loading && (
            <Label
              htmlFor="dropzone-file"
              color={labelColor}
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <FaUpload className="uploadIcon" />
                {fileUploader()}
              </div>
              <FileInput
                id="dropzone-file"
                className="hidden"
                onChange={handleInputFile}
              />
            </Label>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={onClickUpload}
          disabled={!inputFile || loading || error}
        >
          Upload
        </Button>
        <Button color="gray" onClick={cancelUpload}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UploadModal
