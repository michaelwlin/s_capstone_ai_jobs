import { ExperienceItem } from './index'

const Experience = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  experienceTop,
}) => {
  return (
    <div>
      <ExperienceItem
        parentStyle={parentStyle}
        defaultLeft={defaultLeft}
        childSpacer={childSpacer}
        experienceTop={experienceTop}
      />
    </div>
  )
}

export default Experience
