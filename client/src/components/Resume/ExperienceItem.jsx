import { useState } from 'react'
import { TextEditorBlock } from 'react-web-editor'
import { GPTMenuOption } from './index'

const ExperienceItem = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  experienceTop,
  experienceItem,
}) => {
  const [position, setPosition] = useState(
    experienceItem?.position || 'Position',
  )
  const [company, setCompany] = useState(experienceItem?.name || 'Company Name')
  const [date, setDate] = useState(experienceItem?.dates || 'Date')
  const [description, setDescription] = useState(
    experienceItem?.company_description || 'Company Description',
  )
  const [achievements, setAchievements] = useState(
    experienceItem?.description || [
      'Job Achievements',
      'Job Achievements',
      'Job Achievements',
    ],
  )
  const [location, setLocation] = useState(
    experienceItem?.location || 'Location',
  )

  return (
    <div>
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop}
        height={40}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'EXPERIENCE'}
        initialFontColor={'black'}
        initialFontSize={0.2}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop + 30}
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
        width={parentStyle.width}
        top={experienceTop + 60}
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
        width={parentStyle.width}
        top={experienceTop + 90}
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
        width={parentStyle.width}
        top={experienceTop + 120}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={description}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      {achievements.map((achievement, index) => (
        <TextEditorBlock
          key={index}
          width={parentStyle.width}
          top={experienceTop + 150 + 30 * index}
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
  )
}

export default ExperienceItem
