import { ProjectItem } from './index'

const Projects = ({ parentStyle, defaultLeft, childSpacer, projectsTop }) => {
  return (
    <div>
      <ProjectItem
        parentStyle={parentStyle}
        defaultLeft={defaultLeft}
        childSpacer={childSpacer}
        projectsTop={projectsTop}
      />
    </div>
  )
}

export default Projects
