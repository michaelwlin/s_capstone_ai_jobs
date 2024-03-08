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
    setProjectsHeight((prevHeight) => {
      const calculatedHeight =
        resumeProjects && resumeProjects.length
          ? resumeProjects.length * 210
          : prevHeight
      return calculatedHeight
    })
  }, [resumeProjects, projectsHeight, setProjectsHeight])

  useEffect(() => {
    setProjects(resumeProjects || [])
  }, [resumeProjects])

  return (
    <div>
      {projects && projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectItem
            key={index}
            parentStyle={parentStyle}
            defaultLeft={defaultLeft}
            childSpacer={childSpacer}
            projectsTop={projectsTop + index * 70}
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
