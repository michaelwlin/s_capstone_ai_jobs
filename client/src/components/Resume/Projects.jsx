import { ProjectItem } from './index'

const Projects = (parentStyle, defaultLeft, childSpacer, projectsTop) => {
  return (
    <div>{ProjectItem(parentStyle, defaultLeft, childSpacer, projectsTop)}</div>
  )
}

export default Projects
