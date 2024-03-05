import { EducationItem } from './index'

const Education = ({ parentStyle, defaultLeft, childSpacer, educationTop }) => {
  return (
    <div>
      <EducationItem
        parentStyle={parentStyle}
        defaultLeft={defaultLeft}
        childSpacer={childSpacer}
        educationTop={educationTop}
      />
    </div>
  )
}

export default Education
