import { TextEditorBlock } from 'react-web-editor'
import { useState } from 'react'

const EducationItem = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  educationTop,
  educationItem,
}) => {
  const [degree, setDegree] = useState(educationItem?.degree || 'Degree')
  const [school, setSchool] = useState(
    educationItem?.school_university || 'School/University',
  )
  const [dates, setDates] = useState(educationItem?.dates || 'Dates')
  const [location, setLocation] = useState(
    educationItem?.location || 'Location',
  )

  return (
    <div>
      <TextEditorBlock
        key={`education-${school}`}
        width={parentStyle.width}
        top={educationTop}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={school}
        initialFontColor={'black'}
        initialFontSize={parentStyle.textFontSize}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        key={`education-${degree}`}
        width={parentStyle.width}
        top={educationTop}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={degree}
        initialFontColor={'black'}
        initialFontSize={parentStyle.textFontSize}
        initialFontName={'roboto'}
      />

      <TextEditorBlock
        key={`education-${dates}`}
        width={parentStyle.width}
        top={educationTop}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={`${dates}, ${location}`}
        initialFontColor={'black'}
        initialFontSize={parentStyle.textFontSize}
        initialFontName={'roboto'}
      />
    </div>
  )
}

export default EducationItem
