import { Modal, Button, Spinner, Label, TextInput, Accordion } from 'flowbite-react'
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
    setDone(false);
    generateWordBank(resume);
  }


  const onClickFind = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/jobs?keyword=${keyword}&location=${location}`, {
        withCredentials: true // Add this line to include cookies
      })
      if (response.data) {
        setJobs(response.data.jobs)
      }
    } catch (error) {
      console.error('Error getting jobs', error)
    }
  }

  const onClickScore = async (jobIdx) => {

    let thisJobIdx = jobIdx['idx'];
    let job = jobs[thisJobIdx]


    setLoading(true)
    try {
      const response = await axios.post(
        `${config.API_URL}/get_score`,
        {
          resume_text: JSON.stringify(resume),
          job_desc: job['description']
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )
      if (response.data) {
        var score = {
          "score": response.data.score,
          "reasoning": response.data.reasoning
        }
        const old_jobs = [...jobs]
        old_jobs[thisJobIdx]['score'] = score;
        setJobs(old_jobs);
      }
    } catch (error) {
      console.error('Error getting wordbank', error)
    }
    setLoading(false)


  }

  const generateWordBank = async (resume) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${config.API_URL}/match`,
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

      }
    } catch (error) {
      console.error('Error getting wordbank', error)
    }
  }
  return (
    <Modal show={openModal} position={'bottom-right'} backdropClasses={'bg-blue-500 dark:bg-blue-400'} onClose={() => setOpenModal(false)}>
      <Modal.Header>AI Scorer</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Unlock your perfect match with this scoring feature. After finding your desired job through a quick search, our AI-powered feature swiftly analyzes your resume and skills,
            delivering instant scores for job postings, offering insights about how to futher develop your resume or skillsets.
          </p>
          <form className="flex max-w-md flex-col gap-4">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="keyword" value="Keyword" />
              </div>
              <TextInput
                id="keyword"
                type="text"
                placeholder="Software Engineer"
                required
                onChange={e => setKeyword(e.target.value)}
                helperText={
                  <>
                    Search with a keyword. ie: Engineer, Marketing Specialist, Backend, Database Administrator, etc.
                  </>
                }
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="keyword" value="Keyword" />
              </div>
              <TextInput
                id="keyword"
                type="text"
                placeholder="Los Angeles, CA"
                required
                onChange={e => setLocation(e.target.value)}
                helperText={
                  <>
                    Search with a location. ie: San Francisco, New York, Los Angeles, etc.
                  </>
                }
              />
            </div>
            <Button onClick={onClickFind}>Quick Search</Button>
          </form>
          {jobs.length > 0 ?
            <Accordion collapseAll>
              {
                jobs.map((job, idx) =>
                  <Accordion.Panel>
                    <Accordion.Title>{job.title} - {job.company} ({job.location})</Accordion.Title>
                    <Accordion.Content>
                      <p className='mb-3'>
                        {'score' in job ?
                          <Button gradientMonochrome='purple' className='float-right mb-3'>Matching Score: {job.score.score} <br></br>Reasoning: {job.score.reasoning}</Button>

                          :

                          <Button pill gradientMonochrome='purple' className='float-right mb-3' onClick={() => onClickScore({ idx })}>Get MatchIQ Score</Button>
                        }
                      </p>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {job.description}
                      </p>
                    </Accordion.Content>
                  </Accordion.Panel>
                )
              }
            </Accordion>
            : ''}
        </div>
        <div>

        </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}

export default QuickSearchModal
