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
        width={parentStyle.width}
        top={educationTop}
        height={40}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'EDUCATION'}
        initialFontColor={'black'}
        initialFontSize={0.2}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={educationTop + 30}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={degree}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={educationTop + 60}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={school}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={educationTop + 90}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={`${dates}, ${location}`}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
    </div>
  )
}

export default EducationItem
