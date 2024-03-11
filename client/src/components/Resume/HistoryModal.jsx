import { Modal, Button } from 'flowbite-react'
const HistoryModal = ({ openModal, setOpenModal }) => {
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Resume Versions</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center justify-center">
          <p>History of resume versions</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default HistoryModal
