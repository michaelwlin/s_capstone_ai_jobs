import { useEffect, useState } from 'react'
import { EditableBoard } from 'react-web-editor'
import { Sidebar } from 'flowbite-react'
import { IoMdAddCircle } from 'react-icons/io'
import { FaUpload, FaSpellCheck, FaHistory } from 'react-icons/fa'
import { BiSolidCustomize } from 'react-icons/bi'
import axios from 'axios'
import {
  Header,
  Summary,
  Experience,
  Education,
  Skills,
  Projects,
  UploadModal,
} from '../components/Resume/index.js'

const Resume = () => {
  const defaultLeft = 20
  const parentWidth = 1150
  const parentStyle = {
    parentWidth: parentWidth,
    width: parentWidth - defaultLeft,
    height: 1754,
    unit: 'px',
  }
  const childSpacer = 5
  const summaryTop = 30 + 90 + 30
  const skillsTop = summaryTop + 80

  const [openModal, setOpenModal] = useState(false)
  const [resume, setResume] = useState({})
  const [signedIn, setSignedIn] = useState(false)
  const [skillsHeight, setSkillsHeight] = useState(140)
  const [experienceHeight, setExperienceHeight] = useState(260)
  const [projectsHeight, setProjectsHeight] = useState(170)

  const experienceTop = () => {
    return skillsTop + skillsHeight
  }

  const projectsTop = () => {
    return experienceTop() + experienceHeight
  }

  const educationTop = () => {
    return projectsTop() + projectsHeight
  }

  const getUserResume = async () => {
    try {
      //TODO: only call when signed in
      const res = await axios.get(
        'http://localhost:4000/api/users/65e6aa83c0bce2ba3047c638',
      )
      if (res && res.data.resume.length === 0) {
        return
      }
      setResume(res.data.resume[0])
      setSignedIn(true)
    } catch (error) {
      console.error('There was an error fetching the resume data:', error)
    }
  }

  console.log(resume)

  useEffect(() => {
    getUserResume()
  }, [])

  return (
    <div className="resume mx-5 mb-20 container min-h-max flex flex-row gap-1">
      {openModal && (
        <UploadModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <Sidebar style={{ minHeight: parentStyle.height }}>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={IoMdAddCircle}>
              Add Section
            </Sidebar.Item>
            <Sidebar.Item icon={FaUpload} onClick={() => setOpenModal(true)}>
              Upload Resume
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={FaSpellCheck}>
              AI Proof Read
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={FaHistory}>
              History
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={BiSolidCustomize}>
              Tailor for Job
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="resume-wrapper">
        <EditableBoard
          className="resume-board"
          width={parentStyle.parentWidth}
          height={parentStyle.height}
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
            experienceTop={experienceTop()}
            resumeExperience={resume.experience}
            experienceHeight={experienceHeight}
            setExperienceHeight={setExperienceHeight}
          />
          <Projects
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            projectsTop={projectsTop()}
            resumeProjects={resume.selected_projects}
            projectsHeight={projectsHeight}
            setProjectsHeight={setProjectsHeight}
          />
          <Education
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            educationTop={educationTop()}
            resumeEducation={resume.education}
          />
        </EditableBoard>
      </div>
    </div>
  )
}

export default Resume
