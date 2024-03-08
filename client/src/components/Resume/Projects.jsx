import { ProjectItem } from './index'
import { useState, useEffect } from 'react'

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
    const height =
      projects && projects.length ? projects.length * 190 : projectsHeight

    setProjectsHeight((prevHeight) => {
      if (height !== prevHeight) {
        return height
      }
      return prevHeight
    })
  }, [projects, projectsHeight, setProjectsHeight])

  useEffect(() => {
    setProjects(resumeProjects || [])
  }, [resumeProjects])

  console.log('projects', projects)

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
