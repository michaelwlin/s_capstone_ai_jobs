import { ExperienceItem } from './index'

const Experience = (parentStyle, defaultLeft, childSpacer, experienceTop) => {
  return (
    <div>
      {ExperienceItem(parentStyle, defaultLeft, childSpacer, experienceTop)}
    </div>
  )
}

export default Experience
