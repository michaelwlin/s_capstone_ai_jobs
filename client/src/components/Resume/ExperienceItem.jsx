import { useState, useEffect, useRef } from 'react'
import { TextEditorBlock } from 'react-web-editor'
import { GPTMenuOption } from './index'

const ExperienceItem = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  experienceTop,
  experienceItem,
  index,
}) => {
  const [position, setPosition] = useState(
    experienceItem?.position || 'Position',
  )
  const [company, setCompany] = useState(experienceItem?.name || 'Company Name')
  const [date, setDate] = useState(experienceItem?.dates || 'Date')
  const [description, setDescription] = useState(
    experienceItem?.company_or_role_description || 'Company Description',
  )
  const [achievements, setAchievements] = useState(
    experienceItem?.accomplishments || [
      'Job Achievements',
      'Job Achievements',
      'Job Achievements',
    ],
  )
  const [location, setLocation] = useState(
    experienceItem?.location || 'Location',
  )

  return (
    <div className="experience-item-container">
      <TextEditorBlock
        key={`experience-company-${index}`}
        width={parentStyle.width}
        top={experienceTop}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={company}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        key={`experience-position-${index}`}
        width={parentStyle.width}
        top={experienceTop}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={position}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        key={`experience-date-location-${index}`}
        width={parentStyle.width}
        top={experienceTop}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={`${date}, ${location}`}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        key={`experience-description-${index}`}
        width={parentStyle.width}
        top={experienceTop}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={description}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <div className="container achievements">
        {achievements &&
          achievements.map((achievement, index) => (
            <TextEditorBlock
              key={`experience-achievement-${index}`}
              width={parentStyle.width}
              top={experienceTop}
              height={30}
              left={defaultLeft}
              parentStyle={parentStyle}
              unit={parentStyle.unit}
              initialText={`• ${achievement}`}
              initialFontColor={'black'}
              initialFontSize={0.17}
              initialFontName={'roboto'}
              customMenuOptions={() => <GPTMenuOption />}
            />
          ))}
      </div>
    </div>
  )
}

export default ExperienceItem
