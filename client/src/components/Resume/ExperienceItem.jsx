import { useState } from 'react'
import { TextEditorBlock } from 'react-web-editor'
import { GPTMenuOption, SuggestionModal } from './index'

const ExperienceItem = ({
  parentStyle,
  defaultLeft,
  experienceTop,
  experienceItem,
  index,
}) => {
  const [showModalLoading, setModalLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
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
  const [suggestions, setSuggestions] = useState({
    originalText: '',
    suggestedChanges: '',
    header: '', // Header to be used for modal
    acceptChanges: () => { }, //Takes a function to set the value
  })

  const setAchievement = (index, value) => {
    const newAchievements = [...achievements]
    newAchievements[index] = value
    setAchievements(newAchievements)
  }

  return (
    <div className="experience-item-container">
      <SuggestionModal
        suggestions={suggestions}
        showModal={showModal}
        setShowModal={setShowModal}
        setSuggestions={setSuggestions}
        loading={showModalLoading}
      />
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
        initialFontSize={parentStyle.textFontSize}
        initialFontName={'roboto'}
        customClasses={'font-bold'}
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
        initialFontSize={parentStyle.textFontSize}
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
        initialFontSize={parentStyle.textFontSize}
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
        initialFontSize={parentStyle.textFontSize}
        initialFontName={'roboto'}
        customMenuOptions={() => (
          <GPTMenuOption
            value={description}
            setValue={setDescription}
            setShowModal={setShowModal}
            setSuggestions={setSuggestions}
            setModalLoading={setModalLoading}
          />
        )}
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
              initialFontSize={parentStyle.textFontSize}
              initialFontName={'roboto'}
              customMenuOptions={() => (
                <GPTMenuOption
                  value={achievement}
                  valueIndex={index}
                  setValue={setAchievement}
                  setShowModal={setShowModal}
                  setSuggestions={setSuggestions}
                  setModalLoading={setModalLoading}
                />
              )}
            />
          ))}
      </div>
    </div>
  )
}

export default ExperienceItem
