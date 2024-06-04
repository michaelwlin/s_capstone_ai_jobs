import { TextEditorBlock } from 'react-web-editor'
import { useState } from 'react'
import { GPTMenuOption, SuggestionModal } from './index'

const ProjectItem = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  projectsTop,
  projectItem,
}) => {
  const [showModalLoading, setModalLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [projectName, setProjectName] = useState(
    projectItem?.name || 'Project Name',
  )
  const [projectAchievements, setProjectAchievements] = useState(
    projectItem?.description || [
      'Achievements',
      'Achievements',
      'Achievements',
    ],
  )
  const [suggestions, setSuggestions] = useState({
    originalText: '',
    suggestedChanges: '',
    header: '', // Header to be used for modal
    acceptChanges: () => { }, //Takes a function to set the value
  })

  const setProjectAchievement = (index, value) => {
    const newAchievements = [...projectAchievements]
    newAchievements[index] = value
    setProjectAchievements(newAchievements)
  }

  return (
    <div className="projects-item-container">
      <SuggestionModal
        suggestions={suggestions}
        showModal={showModal}
        setShowModal={setShowModal}
        setSuggestions={setSuggestions}
        loading={showModalLoading}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={projectsTop}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={projectName}
        initialFontColor={'black'}
        initialFontSize={parentStyle.textFontSize}
        initialFontName={'roboto'}
      />
      {projectAchievements.map((achievement, index) => {
        return (
          <TextEditorBlock
            key={index}
            width={parentStyle.width}
            top={projectsTop}
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
                setValue={setProjectAchievement}
                setShowModal={setShowModal}
                setSuggestions={setSuggestions}
                setModalLoading={setModalLoading}
              />
            )}
          />
        )
      })}
    </div>
  )
}

export default ProjectItem
