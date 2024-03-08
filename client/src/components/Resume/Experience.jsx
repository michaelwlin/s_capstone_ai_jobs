import { ExperienceItem } from './index'
import { useState, useEffect } from 'react'

const Experience = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  experienceTop,
  resumeExperience,
  experienceHeight,
  setExperienceHeight,
}) => {
  useEffect(() => {
    const calculatedHeight =
      resumeExperience && resumeExperience.length
        ? resumeExperience.length * 300
        : experienceHeight

    setExperienceHeight(calculatedHeight)
  }, [resumeExperience, experienceHeight, setExperienceHeight])

  return (
    <div>
      {resumeExperience && resumeExperience.length > 0 ? (
        resumeExperience.map((exp, index) => (
          <ExperienceItem
            key={index}
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            experienceTop={experienceTop + index * 60}
            experienceItem={exp}
          />
        ))
      ) : (
        <ExperienceItem
          parentStyle={parentStyle}
          defaultLeft={defaultLeft}
          childSpacer={childSpacer}
          experienceTop={experienceTop}
        />
      )}
    </div>
  )
}

export default Experience
