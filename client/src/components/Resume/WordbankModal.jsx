import { Modal, Button, Spinner} from 'flowbite-react'
import { useState } from 'react'
import axios from 'axios'

const WordbankModal = ({ openModal, setOpenModal, resume }) => {
  const [inputFile, setInputFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [adjectives, setAdjectives] = useState([])
  const [verbs, setVerbs] = useState([])
  const [done, setDone] = useState(false)

  const onClickGenerate = () => {
    setDone(false);
    generateWordBank(resume);
  }

  // const stringifyResume = (resume) => {
  //   let resultString = "";

  //   for (const key in resume) {
  //     if (Object.hasOwnProperty.call(resume, key)) {
  //       const value = resume[key];
  //       if (typeof value === 'object' && value !== null) {
  //         resultString += stringifyResume(value) + " ";
  //       } else {
  //         resultString += value + " ";
  //       }
  //     }
  //   }

  //   return resultString;
  // }

  const generateWordBank = async (resume) => {
    setLoading(true)
    try {
      const response = await axios.post(
        'http://localhost:8000/api/wordbank',
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
        setAdjectives(response.data.adjectives);
        setVerbs(response.data.verbs)
        setLoading(false)
        setDone(true)
      }
    } catch (error) {
      console.error('Error getting wordbank', error)
    }

  }
  return (
    <Modal show={openModal} position={'bottom-right'} backdropClasses={'bg-blue-500 dark:bg-blue-400'} onClose={() => setOpenModal(false)}>
      <Modal.Header>AI Wordbank</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Unlock your potential with our AI-powered wordbank feature that dynamically generates verbs and
            adjectives tailored to your resume, ensuring each word resonates with your unique skills and experiences.
          </p>
          {loading ? <Spinner size="xl" className="mr-2" /> : ''}
          {done ? <h2>Adjectives</h2> : ''}
          {loading ? '': adjectives.map((adj) =>
            <li>{adj}</li>
          )}
          {done ? <h2>Verbs</h2> : ''}
          {loading ? '': verbs.map((verb) =>
            <li>{verb}</li>
          )}
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

export default WordbankModal
