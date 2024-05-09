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
    <div id="toast-bottom-right" class="fixed flex items-center w-full max-w-md p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
      <div class="flex flex-col w-full">
        <div class="flex items-center justify-between">
          <h2>AI Refiner</h2>
          <button type="button" class="mx-1.5 my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" onClick={() => setOpenModal(false)}>
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={onClickGenerate}>
            {done ? 'Generate Again' : 'Generate'}
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            {done ? 'Finish' : 'Later'}
          </Button>
        </div>
      </div>
    </div>



    
  )
}

export default EnhanceModal
