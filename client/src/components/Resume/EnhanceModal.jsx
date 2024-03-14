import { Modal, Button, Spinner } from 'flowbite-react'
import { useState } from 'react'
import axios from 'axios'

const EnhanceModal = ({ openModal, setOpenModal, resume }) => {
  const [inputFile, setInputFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [enhancements, setEnhancements] = useState([])
  const [done, setDone] = useState(false)

  const onClickGenerate = () => {
    setDone(false)
    generateWordBank(resume)
  }

  const generateWordBank = async (resume) => {
    setLoading(true)
    try {
      const response = await axios.post(
        'http://localhost:8000/api/enhance',
        {
          resume_text: JSON.stringify(resume),
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )
      if (response.data) {
        var enhancements = response.data.enhancements
        setEnhancements(enhancements)
        setLoading(false)
        setDone(true)
      }
    } catch (error) {
      console.error('Error getting wordbank', error)
    }
  }
  return (
    <Modal
      show={openModal}
      position={'bottom-right'}
      backdropClasses={'bg-blue-500 dark:bg-blue-400'}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>AI Refiner</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Elevate your resume with our AI-powered Refiner feature. Dynamically
            analyzing your resume, it generates tailored enhancements, ensuring
            every word resonates with your unique skills and experiences.
          </p>
          {loading ? <Spinner size="xl" className="mr-2" /> : ''}
          {done ? (
            <p className="text-indigo-800 font-bold">
              MatchIQ found {enhancements.length} refinement(s) for you to try
              out!
            </p>
          ) : (
            ''
          )}
          <hr></hr>
          {loading
            ? ''
            : enhancements.map((enhancement) => (
                <div>
                  <p className="pb-1">
                    <h3 className="text-gray-500 font-medium">Original</h3>
                    <li className="list-none">{enhancement.original}</li>
                  </p>
                  <p>
                    <h3 className="text-indigo-800 font-medium">
                      MatchIQ Suggestion
                    </h3>
                    <li className="list-none">{enhancement.new_element}</li>
                  </p>
                </div>
              ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClickGenerate}>
          {done ? 'Generate Again' : 'Generate'}
        </Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          {done ? 'Finish' : 'Later'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EnhanceModal
