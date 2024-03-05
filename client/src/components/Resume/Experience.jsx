import { ExperienceItem } from './index'
import { useState } from 'react'

const Experience = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  experienceTop,
  resumeExperience,
}) => {
  const [experience, setExperience] = useState(resumeExperience || [])

  return (
    <div>
      {experience.length > 0 ? (
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
