import { ProjectItem } from './index'
import { useState } from 'react'

const Projects = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  projectsTop,
  resumeProjects,
}) => {
  const [projects, setProjects] = useState(resumeProjects || [])

  return (
    <div>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectItem
            key={index}
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            projectsTop={projectsTop + index * 60}
            projectItem={project}
          />
        ))
      ) : (
        <ProjectItem
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
