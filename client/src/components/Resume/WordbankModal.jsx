import { Modal, Button, Spinner, Accordion } from 'flowbite-react'
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
    setDone(false)
    generateWordBank(resume)
  }

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
        setAdjectives(response.data.adjectives)
        setVerbs(response.data.verbs)
        setLoading(false)
        setDone(true)
      }
    } catch (error) {
      console.error('Error getting wordbank', error)
    }
  }
  return (
    <div id="toast-bottom-right" class="fixed flex items-center w-full max-w-md space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
  <div class="flex flex-col w-full">
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>
          <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
            <button type="button" class="mx-1.5 my-1.5 items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" onClick={() => setOpenModal(false)}>
              <span class="sr-only">Close</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
            <h2>AI Wordbank</h2>
          </div>
        </Accordion.Title>
        <Accordion.Content>
          <div className="space-y-6 border-b border-gray-200 dark:border-gray-700">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Unlock your potential with our AI-powered wordbank feature that dynamically generates verbs and adjectives tailored to your resume, ensuring each word resonates with your unique skills and experiences.
            </p>
            {loading ? <Spinner size="xl" className="mr-2" /> : ''}
            {done ? (
              <p className="text-indigo-800 font-bold">
                MatchIQ found {adjectives.length} adjective(s) and {verbs.length} verb(s) for you to try out!
              </p>
            ) : (
              ''
            )}
            <hr></hr>
            {done ? (
              <h2>
                <strong>Adjectives</strong>
              </h2>
            ) : (
              ''
            )}
            {loading ? '' : adjectives.map((adj) => <li>{adj}</li>)}
            {done ? (
              <h2>
                <strong>Verbs</strong>
              </h2>
            ) : (
              ''
            )}
            {loading ? '' : verbs.map((verb) => <li>{verb}</li>)}
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button onClick={onClickGenerate}>
                {done ? 'Generate Again' : 'Generate'}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                {done ? 'Finish' : 'Later'}
              </Button>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  </div>
</div>


  )
}

export default WordbankModal
