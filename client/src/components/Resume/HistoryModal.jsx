import { Modal, Button, Table } from 'flowbite-react'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth.js'
import config from '../../clientConfig.js';

const HistoryModal = ({ openModal, setOpenModal }) => {
  const [resumes, setResumes] = useState([])
  const { auth } = useAuth()
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  const formattedDate = (date) =>
    new Date(date).toLocaleDateString('en-us', dateOptions)

  useEffect(() => {
    const getAllResumes = async () => {
      try {
        const res = await axios.get(
          `${config.API_URL}/users/${auth.userId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }},
        )

        if (res && res.data.resume.length === 0) {
          return
        }
        setResumes(res.data.resume)
      } catch (error) {
        console.error('There was an error fetching the resume data:', error)
      }
    }

    getAllResumes()
  }, [auth.userId])

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Resume Versions</Modal.Header>
      <Modal.Body>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Resume</Table.HeadCell>
              <Table.HeadCell>Date Uploaded</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Select Version</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {resumes.map((resume, index) => (
                <Table.Row
                  key={`resume-${index}`}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Resume {index + 1}
                  </Table.Cell>
                  <Table.Cell>{formattedDate(resume.date_added)}</Table.Cell>
                  <Table.Cell>
                    <NavLink
                      reloadDocument
                      to={`/resume/${resume._id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setOpenModal(false)}
                    >
                      Select Version
                    </NavLink>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOpenModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default HistoryModal
