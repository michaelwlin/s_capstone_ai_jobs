import { EducationItem } from './index'
import { useState } from 'react'

const Education = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  educationTop,
  resumeEducation,
}) => {
  const [education, setEducation] = useState(resumeEducation || [])
  return (
    <div>
      {education.length > 0 ? (
        education.map((edu, index) => (
          <EducationItem
            key={index}
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            educationTop={educationTop + index * 60}
            educationItem={edu}
          />
        ))
      ) : (
        <EducationItem
          parentStyle={parentStyle}
          defaultLeft={defaultLeft}
          childSpacer={childSpacer}
          educationTop={educationTop}
        />
      )}
    </div>
  )
}

export default Education
