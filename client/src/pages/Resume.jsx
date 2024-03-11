import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { EditableBoard } from 'react-web-editor'
import axios from 'axios'
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
} from '../components/Resume/index.js'

const Resume = () => {
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
  })
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openHistoryModal, setOpenHistoryModal] = useState(false)
  const [resume, setResume] = useState({})
  const [signedIn, setSignedIn] = useState(false)
  const [skillsHeight, setSkillsHeight] = useState(100)
  const [experienceHeight, setExperienceHeight] = useState(250)
  const [projectsHeight, setProjectsHeight] = useState(20)

  const experienceTop = skillsTop + skillsHeight
  const projectsTop = experienceTop + experienceHeight
  const educationTop = projectsTop + projectsHeight

  let { _id } = useParams()

  const getUserResume = async () => {
    try {
      //TODO: only call when signed in
      const res = await axios.get(
        'http://localhost:4000/api/users/65e6aa83c0bce2ba3047c638',
      )
      if (res && res.data.resume.length === 0) {
        return
      }
      setResume(
        _id
          ? res.data.resume.find((r) => r._id === _id)['resume_data']
          : res.data.resume.pop()['resume_data'],
      )
      setSignedIn(true)
    } catch (error) {
      console.error('There was an error fetching the resume data:', error)
    }
  }

  useEffect(() => {
    getUserResume()
  }, [skillsTop])

  useEffect(() => {
    setTimeout(() => {
      setBoardHeight((prevHeight) => {
        const calculatedHeight = boardRef.current
          ? boardRef.current.scrollHeight + 20
          : prevHeight
        return calculatedHeight
      })
    }, 1)
  }, [boardRef, boardRef.current?.scrollHeight])

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
    </div>
  )
}

export default Resume
