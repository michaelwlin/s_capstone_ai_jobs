import { TextEditorBlock } from 'react-web-editor'
import { useState } from 'react'
import { GPTMenuOption } from './index'

const ProjectItem = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  projectsTop,
  projectItem,
}) => {
  const [projectName, setProjectName] = useState(
    projectItem?.name || 'Project Name',
  )
  const [projectDescription, setProjectDescription] = useState(
    projectItem?.description || [
      'Achievements',
      'Achievements',
      'Achievements',
    ],
  )

  return (
    <div>
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
      {projectDescription.map((description, index) => {
        return (
          <TextEditorBlock
            key={index}
            width={parentStyle.width}
            top={projectsTop}
            height={30}
            left={defaultLeft}
            parentStyle={parentStyle}
            unit={parentStyle.unit}
            initialText={`• ${description}`}
            initialFontColor={'black'}
            initialFontSize={parentStyle.textFontSize}
            initialFontName={'roboto'}
            customMenuOptions={() => <GPTMenuOption />}
          />
        )
      })}
    </div>
  )
}

export default ProjectItem
