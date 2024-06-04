import { ExperienceItem } from './index'
import { useState, useEffect } from 'react'
import { TextEditorBlock } from 'react-web-editor'

const Experience = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  experienceTop,
  resumeExperience,
  experienceHeight,
  setExperienceHeight,
}) => {
  const [experience, setExperience] = useState(resumeExperience || [])

  useEffect(() => {
    setExperienceHeight(() => {
      const calculatedHeight =
        resumeExperience && resumeExperience.length
          ? resumeExperience.length * 25
          : experienceHeight
      return calculatedHeight
    })
  }, [resumeExperience, experienceHeight, setExperienceHeight])

  useEffect(() => {
    setExperience(resumeExperience || [])
  }, [resumeExperience])

  const defaultExperience = () => {
    return (
      <ExperienceItem
        parentStyle={parentStyle}
        defaultLeft={defaultLeft}
        childSpacer={childSpacer}
        experienceTop={experienceTop + 40}
      />
    )
  }

  return (
    <div className="container experience">
      <TextEditorBlock
        key={`experience-header-${experienceTop}`}
        width={parentStyle.width}
        top={experienceTop}
        height={40}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'EXPERIENCE'}
        initialFontColor={'black'}
        initialFontSize={parentStyle.headerFontSize}
        initialFontName={'roboto'}
        customClasses={'font-bold'}
      />
      {experience.length > 0
        ? experience.map((exp, index) => (
          <ExperienceItem
            key={`experience-item-${index}`}
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            experienceTop={experienceTop + index * 25}
            experienceItem={exp}
            index={index}
          />
        ))
        : defaultExperience()}
    </div>
  )
}

export default Experience
