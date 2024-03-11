import { TextEditorBlock } from 'react-web-editor'
import { useState, useEffect } from 'react'
import { ProjectItem } from './index'

const Projects = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  projectsTop,
  resumeProjects,
  projectsHeight,
  setProjectsHeight,
}) => {
  const [projects, setProjects] = useState(resumeProjects || [])

  useEffect(() => {
    setProjectsHeight(() => {
      const calculatedHeight =
        resumeProjects && resumeProjects.length
          ? resumeProjects.length * 12
          : projectsHeight
      return calculatedHeight
    })
  }, [resumeProjects, projectsHeight, setProjectsHeight])

  useEffect(() => {
    setProjects(resumeProjects || [])
  }, [resumeProjects])

  return (
    <div className="projects-container">
      <TextEditorBlock
        key={`projects-header-${projectsTop}`}
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
        customClasses={'font-bold'}
      />
      {projects && projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectItem
            key={`projects-${index}`}
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            projectsTop={projectsTop + index * 25}
            projectItem={project}
          />
        ))
      ) : (
        <ProjectItem
          key={`projects-default-${projectsTop}`}
          parentStyle={parentStyle}
          defaultLeft={defaultLeft}
          childSpacer={childSpacer}
          projectsTop={projectsTop}
        />
      )}
    </div>
  )
}

export default Projects
