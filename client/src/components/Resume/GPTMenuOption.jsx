import { MenuOption, DropDown } from 'react-web-editor'
import axios from 'axios'

const AI_COMMANDS = [
  { id: 'improve', label: 'Improve' },
  { id: 'proofread', label: 'Proofread' },
  { id: 'shorten', label: 'Shorten' },
  { id: 'wordbank', label: 'Word Bank' },
]

const enhance = async (value) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/enhance',
      {
        resume_text: JSON.stringify(value),
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    )
    console.log(response.data, response.data.enhancements)
    if (response.data) {
      const enhancements_array = response.data.enhancements.map(
        (enhancement) => {
          return enhancement.new_element
        },
      )
      const combinedString = enhancements_array.join(' ')
      console.log('combined string', combinedString)
      return combinedString
    }
  } catch (error) {
    console.error('Error enhancing text', error)
  }
}

const GPTMenuOption = ({ value, setValue, setShowModal, setSuggestions }) => {
  const onClick = async (e) => {
    try {
      switch (e.target.id) {
        case 'improve':
          const enhancedText = await enhance(value)
          // const enhancedText =
          //   // 'Create software solutions in accordance with the software development life cycle by documenting information requirements, engaging with users, analyzing systems flow, data usage, work processes, and addressing problematic areas. Assess operational feasibility through analysis, problem definition, requirement evaluation, solution development, and proposed solutions. Create comprehensive documentation, flowcharts, layouts, diagrams, charts, code comments, and maintain clean code. Define system specifications and standards prior to the installation of product solutions. Perform system analysis and suggest improvements to policies and procedures. Provide mentorship and foster the growth of junior and mid-level software engineers.'
          setSuggestions({
            originalText: value,
            suggestedChanges: enhancedText,
            header: 'Suggested Enhancements',
            acceptChanges: () => setValue(enhancedText),
          })
          setShowModal(true)
          break
        case 'proofread':
          console.log('proofread')
          break
        case 'shorten':
          console.log('Shorten')
          break
        case 'wordbank':
          console.log('Word Bank')
          break
        default:
          break
      }
    } catch (error) {
      console.error('Error handling menu option:', error)
    }
  }

  return (
    <>
      <MenuOption name={'AI Commands'}>
        <DropDown
          items={AI_COMMANDS}
          onClick={onClick}
          label={'Select AI Functionality'}
        />
      </MenuOption>
    </>
  )
}

export default GPTMenuOption
