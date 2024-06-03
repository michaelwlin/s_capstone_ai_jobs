import { Button, Label, TextInput, Accordion } from 'flowbite-react'
import { useState } from 'react'
import axios from 'axios'
import config from '../../clientConfig';

const QuickSearchModal = ({ openModal, setOpenModal, resume }) => {
  const [inputFile, setInputFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [done, setDone] = useState(false)
  const [jobs, setJobs] = useState([])

  const onClickGenerate = () => {
    setDone(false)
    generateWordBank(resume)
  }

  const onClickFind = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/jobs?keyword=${keyword}&location=${location}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',

        },
        credentials: 'include', // Include cookies in the request and response
      },)
      if (response.data) {
        setJobs(response.data.jobs)
      }
    } catch (error) {
      console.error('Error getting jobs', error)
    }
  }

  const onClickScore = async (jobIdx) => {
    let thisJobIdx = jobIdx['idx']
    let job = jobs[thisJobIdx]

    setLoading(true)
    try {
      const response = await axios.post(
        `${config.DJANGO_URL}/get_score`,
        {
          resume_text: JSON.stringify(resume),
          job_desc: job['description'],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        },
      )
      if (response.data) {
        var score = {
          score: response.data.score,
          reasoning: response.data.reasoning,
        }
        const old_jobs = [...jobs]
        old_jobs[thisJobIdx]['score'] = score
        setJobs(old_jobs)
      }
    } catch (error) {
      console.error('Error getting score', error)
    }
    setLoading(false)
  }

  const generateWordBank = async (resume) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${config.DJANGO_URL}/match`,
        {
          resume_text: JSON.stringify(resume),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        },
      )
      if (response.data) {
      }
    } catch (error) {
      console.error('Error getting wordbank', error)
    }
  }
  return (
    <div
      id="toast-bottom-right"
      className="fixed flex items-center w-full max-w-md p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
      role="alert"
    >
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <h2>AI Scorer</h2>
          <button
            type="button"
            className="mx-1.5 my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-interactive"
            aria-label="Close"
            onClick={() => setOpenModal(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-2 p-4">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Unlock your perfect match with this scoring feature. After finding
            your desired job through a quick search, our AI-powered feature
            swiftly analyzes your resume and skills, delivering instant scores
            for job postings, offering insights about how to futher develop your
            resume or skillsets.
          </p>
          <form className="flex max-w-md flex-col gap-4">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="keyword" value="Keyword" />
              </div>
              <TextInput
                id="keyword"
                data-testid="test-keyword"
                type="text"
                placeholder="Software Engineer"
                required
                onChange={(e) => setKeyword(e.target.value)}
                helperText={
                  <>
                    Search with a keyword. ie: Engineer, Marketing Specialist,
                    Backend, Database Administrator, etc.
                  </>
                }
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="location" value="Location" />
              </div>
              <TextInput
                id="location"
                data-testid="test-location"
                type="text"
                placeholder="Los Angeles, CA"
                required
                onChange={(e) => setLocation(e.target.value)}
                helperText={
                  <>
                    Search with a location. ie: San Francisco, New York, Los
                    Angeles, etc.
                  </>
                }
              />
            </div>
            <Button onClick={onClickFind}>Quick Search</Button>
          </form>
          <div className="scrollable-quick-search-content">
            {jobs.length > 0 ? (
              <Accordion collapseAll>
                {jobs.map((job, idx) => (
                  <Accordion.Panel key={`job-${idx}`}>
                    <Accordion.Title>
                      {job.title} - {job.company} ({job.location})
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="scrollable-content">
                        <p className="mb-3">
                          {'score' in job ? (
                            <Button
                              gradientMonochrome="purple"
                              className="float-right mb-3"
                            >
                              Matching Score: {job.score.score} <br></br>
                              Reasoning: {job.score.reasoning}
                            </Button>
                          ) : (
                            <Button
                              pill
                              gradientMonochrome="purple"
                              className="float-right mb-3"
                              onClick={() => onClickScore({ idx })}
                            >
                              Get MatchIQ Score
                            </Button>
                          )}
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                          {job.description}
                        </p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                ))}
              </Accordion>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickSearchModal
