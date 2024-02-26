import { useState } from 'react'
import { Button, Modal, FileInput, Label } from 'flowbite-react'
import { FaUpload } from 'react-icons/fa'

const UploadModal = ({ openModal, setOpenModal }) => {
  const [inputFile, setInputFile] = useState(null)

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Upload Resume</Modal.Header>
      <Modal.Body>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <FaUpload className="uploadIcon" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                docx. or PDF
              </p>
            </div>
            <FileInput id="dropzone-file" className="hidden" />
          </Label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpenModal(false)}>Upload</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UploadModal
