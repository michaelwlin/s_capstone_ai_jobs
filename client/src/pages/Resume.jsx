import { useState } from 'react'
import { EditableBoard, TextEditorBlock } from 'react-web-editor'
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
  const parentStyle = {
    parentWidth: 1240,
    width: 1240 - defaultLeft,
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
    <div className="resume container mx-auto max-h-max">
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
