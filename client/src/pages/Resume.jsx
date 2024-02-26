import { useState } from 'react'
import { EditableBoard } from 'react-web-editor'
import { Sidebar } from 'flowbite-react'
import { IoMdAddCircle } from 'react-icons/io'
import { FaUpload, FaSpellCheck, FaHistory } from 'react-icons/fa'
import { BiSolidCustomize } from 'react-icons/bi'
import {
  Header,
  Summary,
  Experience,
  Education,
  Skills,
  Projects,
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
  const experienceTop = skillsTop + 140
  const projectsTop = experienceTop + 260
  const educationTop = projectsTop + 170

  return (
    <div className="resume mx-5 container min-h-max flex flex-row gap-1">
      <Sidebar style={{ minHeight: parentStyle.height }}>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={IoMdAddCircle}>
              Add Section
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={FaUpload}>
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
          {Header(parentStyle, defaultLeft, childSpacer)}
          {Summary(parentStyle, defaultLeft, childSpacer, summaryTop)}
          {Skills(parentStyle, defaultLeft, childSpacer, skillsTop)}
          {Experience(parentStyle, defaultLeft, childSpacer, experienceTop)}
          {Projects(parentStyle, defaultLeft, childSpacer, projectsTop)}
          {Education(parentStyle, defaultLeft, childSpacer, educationTop)}
        </EditableBoard>
      </div>
    </div>
  )
}

export default Resume
