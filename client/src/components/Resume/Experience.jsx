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
  const [experience, setExperience] = useState(resumeExperience || [])

  useEffect(() => {
    setExperienceHeight((prevHeight) => {
      const calculatedHeight =
        resumeExperience && resumeExperience.length
          ? resumeExperience.length * 290
          : prevHeight
      return calculatedHeight
    })
  }, [resumeExperience, experienceHeight, setExperienceHeight])

  useEffect(() => {
    setExperience(resumeExperience || [])
  }, [resumeExperience])

  return (
    <div>
      {experience && experience.length > 0 ? (
        experience.map((exp, index) => (
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
