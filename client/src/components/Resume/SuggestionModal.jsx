import { Button, Modal } from 'flowbite-react'
const SuggestionModal = ({
  suggestions,
  showModal,
  setShowModal,
  setSuggestions,
}) => {
  const closeModal = () => {
    setShowModal(false)
    setSuggestions({
      originalText: '',
      suggestedChanges: '',
      header: '',
      acceptChanges: () => {},
    })
  }

  const acceptChanges = () => {
    suggestions.acceptChanges()
    closeModal()
  }

  console.log('triggered')
  return (
    <Modal
      id="suggestion-modal"
      dismissible
      show={showModal}
      onClose={closeModal}
    >
      <Modal.Header>{suggestions.header}</Modal.Header>
      <Modal.Body>
        <div className="text-lg font-bold">Before:</div>
        <div className="flex w-full items-center justify-center">
          {suggestions.originalText}
        </div>
        <div className="mt-10 text-lg font-bold">After:</div>
        <div className="flex w-full items-center justify-center">
          {suggestions.suggestedChanges}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={acceptChanges}>Accept Changes</Button>
        <Button color="gray" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SuggestionModal
