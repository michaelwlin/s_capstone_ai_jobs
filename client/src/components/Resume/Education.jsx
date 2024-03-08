import { EducationItem } from './index'
import { useState, useEffect } from 'react'

const Education = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  educationTop,
  resumeEducation,
}) => {
  const [educations, setEducations] = useState(resumeEducation || [])

  useEffect(() => {
    setEducations(resumeEducation || [])
  }, [resumeEducation])

  return (
    <div>
      {educations.length > 0 ? (
        educations.map((education, index) => (
          <EducationItem
            key={index}
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            educationTop={educationTop + index * 60}
            educationItem={education}
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
