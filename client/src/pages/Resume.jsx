import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { EditableBoard } from 'react-web-editor'
import axios from 'axios'
import generatePDF, { Margin } from 'react-to-pdf'
import useAuth from '../hooks/useAuth.js'
import {
  Header,
  Summary,
  Experience,
  Education,
  Skills,
  Projects,
  UploadModal,
  ResumeSidebar,
  HistoryModal,
  WordbankModal,
  EnhanceModal,
  QuickSearchModal,
} from '../components/Resume/index.js'
import config from '../clientConfig.js';

const Resume = () => {
  let { _id } = useParams()
  const boardRef = useRef(null)

  const defaultLeft = 20
  const parentWidth = 1150
  const childSpacer = 5
  const summaryTop = 50
  const skillsTop = summaryTop + 20

  const [boardHeight, setBoardHeight] = useState(1754)
  const [parentStyle, setParentStyle] = useState({
    parentWidth: parentWidth,
    width: parentWidth - defaultLeft,
    height: boardHeight,
    unit: 'px',
    headerFontSize: 0.24,
    textFontSize: 0.2,
  })

  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openHistoryModal, setOpenHistoryModal] = useState(false)
  const [resume, setResume] = useState({})
  const { auth } = useAuth()
  const [skillsHeight, setSkillsHeight] = useState(100)
  const [experienceHeight, setExperienceHeight] = useState(250)
  const [projectsHeight, setProjectsHeight] = useState(20)
  const [openWordBankModal, setOpenWordBankModal] = useState(false)
  const [openEnhanceModal, setOpenEnhanceModal] = useState(false)
  const [openQSModal, setOpenQSModal] = useState(false)

  const experienceTop = skillsTop + skillsHeight
  const projectsTop = experienceTop + experienceHeight
  const educationTop = projectsTop + projectsHeight

  const saveAsPdf = () => {
    const printRef = boardRef.current.children[0]
    return generatePDF(() => printRef, {
      method: 'save',
      filename: 'resume.pdf',
      resolution: 10,
      page: { margin: Margin.MEDIUM },
      overrides: {
        pdf: {
          compress: false,
        },
      },
    })
  }

  useEffect(() => {
    const getUserResume = async () => {
      try {
        const res = await axios.get(
          `${config.API_URL}/users/${auth.userId}`, {
          withCredentials: true // Add this line to include cookies
        })

        if (res && res.data.resume.length === 0) {
          return
        }
        setResume(
          _id
            ? res.data.resume.find((r) => r._id === _id)['resume_data']
            : res.data.resume.pop()['resume_data'],
        )
      } catch (error) {
        //TODO: add error handling
        console.error('There was an error fetching the resume data:', error)
      }
    }
    getUserResume()
  }, [_id])

  useEffect(() => {
    setTimeout(() => {
      setBoardHeight((prevHeight) => {
        const calculatedHeight = boardRef.current
          ? boardRef.current.scrollHeight + 20
          : prevHeight
        return calculatedHeight
      })
    }, 1000)
  }, [resume, boardRef, boardRef.current?.scrollHeight])

  return (
    <div className="resume mx-5 mb-20 min-h-full flex flex-row gap-1">
      {openUploadModal && (
        <UploadModal
          openModal={openUploadModal}
          setOpenModal={setOpenUploadModal}
        />
      )}
      {openHistoryModal && (
        <HistoryModal
          openModal={openHistoryModal}
          setOpenModal={setOpenHistoryModal}
        />
      )}
      <ResumeSidebar
        boardHeight={boardHeight}
        setOpenUploadModal={setOpenUploadModal}
        setOpenHistoryModal={setOpenHistoryModal}
        saveAsPdf={saveAsPdf}
        setOpenWordBankModal={setOpenWordBankModal}
        setOpenEnhanceModal={setOpenEnhanceModal}
        setOpenQSModal={setOpenQSModal}
      />
      <div className="resume-wrapper" ref={boardRef}>
        <EditableBoard
          key={`resume-board-${boardHeight}`}
          className="resume-board"
          width={parentStyle.parentWidth}
          height={boardHeight}
          unit={parentStyle.unit}
          backgroundColor={'#fff'}
        >
          <Header
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            resumeHeader={resume.header}
          />
          <Summary
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            summaryTop={summaryTop}
            resumeSummary={resume.summary}
          />
          <Skills
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            skillsTop={skillsTop}
            resumeSkills={resume.skills}
            skillsHeight={skillsHeight}
            setSkillsHeight={setSkillsHeight}
          />
          <Experience
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            experienceTop={experienceTop}
            resumeExperience={resume.experience}
            experienceHeight={experienceHeight}
            setExperienceHeight={setExperienceHeight}
          />
          <Projects
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            projectsTop={projectsTop}
            resumeProjects={resume.selected_projects}
            projectsHeight={projectsHeight}
            setProjectsHeight={setProjectsHeight}
          />
          <Education
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            educationTop={educationTop}
            resumeEducation={resume.education}
          />
        </EditableBoard>
      </div>
      {openEnhanceModal && (
        <EnhanceModal
          openModal={openEnhanceModal}
          setOpenModal={setOpenEnhanceModal}
          resume={resume}
        />
      )}
      {openWordBankModal && (
        <WordbankModal
          openModal={openWordBankModal}
          setOpenModal={setOpenWordBankModal}
          resume={resume}
        />
      )}
      {openQSModal && (
        <QuickSearchModal
          openModal={openQSModal}
          setOpenModal={setOpenQSModal}
          resume={resume}
        />
      )}
    </div>
  )
}

export default Resume
