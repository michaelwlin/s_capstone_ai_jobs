import { EducationItem } from './index'

const Education = (parentStyle, defaultLeft, childSpacer, educationTop) => {
  return (
    <div>
      {EducationItem(parentStyle, defaultLeft, childSpacer, educationTop)}
    </div>
  )
}

export default Education
