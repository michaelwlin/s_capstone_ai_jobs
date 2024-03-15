import { useState } from 'react'
import { Button, Modal, FileInput, Label, Spinner } from 'flowbite-react'
import { FaUpload } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getCSRFToken } from '../../api/csrfToken.js'
import useAuth from '../../hooks/useAuth.js'

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

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('userID', auth.userId)

      const res = await axios.post(
        'https://matchiq-django-48494c1c8d6c.herokuapp.com/api/upload_resume',
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
      //TODO: display error message
      setError('Error uploading file')
    }
  }

  const handleInputFile = (e) => {
    const file = e.target.files[0]
    setInputFile(file)
  }

  const cancelUpload = () => {
    setInputFile(null)
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
        </>
      )
    }
  }

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Upload Resume</Modal.Header>
      <Modal.Body>
        <div className="flex w-full items-center justify-center">
          {loading && isLoading()}
          {!loading && (
            <Label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
        <Button onClick={onClickUpload} disabled={!inputFile || loading}>
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
