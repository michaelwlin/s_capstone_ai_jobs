import { TextEditorBlock } from 'react-web-editor'
import { useState } from 'react'

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
        height={40}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'SELECTED PROJECTS'}
        initialFontColor={'black'}
        initialFontSize={0.2}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={projectsTop + 30}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={projectName}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      {projectDescription.map((description, index) => {
        return (
          <TextEditorBlock
            key={index}
            width={parentStyle.width}
            top={projectsTop + 30 + 30 * (index + 1)}
            height={30}
            left={defaultLeft}
            parentStyle={parentStyle}
            unit={parentStyle.unit}
            initialText={`• ${description}`}
            initialFontColor={'black'}
            initialFontSize={0.17}
            initialFontName={'roboto'}
          />
        )
      })}
    </div>
  )
}

export default ProjectItem
