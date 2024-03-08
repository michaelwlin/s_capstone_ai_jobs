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
    setExperienceHeight((prevHeight) => {
      const calculatedHeight =
        resumeExperience && resumeExperience.length
          ? experienceTop + 90 + resumeExperience.length * 700
          : experienceTop

      return calculatedHeight
    })
  }, [resumeExperience, experienceTop, experienceHeight, setExperienceHeight])

  useEffect(() => {
    setExperience(resumeExperience || [])
  }, [resumeExperience])

  return (
    <div className="container experience">
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop}
        height={40}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'EXPERIENCE'}
        initialFontColor={'black'}
        initialFontSize={0.2}
        initialFontName={'roboto'}
      />
      {experience && experience.length > 0 ? (
        experience.map((exp, index) => (
          <ExperienceItem
            key={index}
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            experienceTop={experienceTop + 90 + index * 230}
            experienceItem={exp}
          />
        ))
      ) : (
        <>
          <TextEditorBlock
            width={parentStyle.width}
            top={experienceTop}
            height={40}
            left={defaultLeft}
            parentStyle={parentStyle}
            unit={parentStyle.unit}
            initialText={'EXPERIENCE'}
            initialFontColor={'black'}
            initialFontSize={0.2}
            initialFontName={'roboto'}
          />
          <ExperienceItem
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            experienceTop={experienceTop + 40}
          />
        </>
      )}
    </div>
  )
}

export default Experience
