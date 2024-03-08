import { EducationItem } from './index'
import { useState, useEffect } from 'react'

const Education = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  educationTop,
  resumeEducation,
}) => {
  console.log('edu', resumeEducation)

  return (
    <div>
      {resumeEducation && resumeEducation.length > 0 ? (
        resumeEducation.map((edu, index) => (
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
          key={'edu-item'}
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
