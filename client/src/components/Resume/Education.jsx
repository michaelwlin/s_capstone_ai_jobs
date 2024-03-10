import { EducationItem } from './index'
import { useState, useEffect } from 'react'
import { TextEditorBlock } from 'react-web-editor'

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
    <div className="education-container">
      <TextEditorBlock
        key={`education-header-${educationTop}`}
        width={parentStyle.width}
        top={educationTop}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'EDUCATION'}
        initialFontColor={'black'}
        initialFontSize={0.2}
        initialFontName={'roboto'}
        customClasses={'font-bold'}
      />
      {educations.length > 0 ? (
        educations.map((education, index) => (
          <EducationItem
            key={`education-${index}`}
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            educationTop={educationTop + index * 20}
            educationItem={education}
          />
        ))
      ) : (
        <EducationItem
          key={`education-default-${educationTop}`}
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
