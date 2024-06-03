import { MenuOption, DropDown } from 'react-web-editor'
import axios from 'axios'
import config from '../../clientConfig';

const AI_COMMANDS = [{ id: 'improve', label: 'Improve' }]

const enhance = async (value) => {
  try {
    const response = await axios.post(
      `${config.DJANGO_URL}/enhance`,
      {
        resume_text: JSON.stringify(value),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      },
    )

    if (response.data) {
      const enhancements_array = response.data.enhancements.map(
        (enhancement) => {
          return enhancement.new_element
        },
      )
      const combinedString = enhancements_array.join(' ')
      return combinedString
    }
  } catch (error) {
    console.error('Error enhancing text', error)
  }
}

const GPTMenuOption = ({
  value,
  valueIndex = null,
  setValue,
  setShowModal,
  setSuggestions,
  setModalLoading,
}) => {
  const onClick = async (e) => {
    try {
      switch (e.target.id) {
        case 'improve':
          setShowModal(true)
          setModalLoading(true)
          const enhancedText = await enhance(value)
          setSuggestions({
            originalText: value,
            suggestedChanges: enhancedText,
            header: 'Suggested Enhancements',
            acceptChanges: () =>
              valueIndex
                ? setValue(valueIndex, enhancedText)
                : setValue(enhancedText),
          })
          setModalLoading(false)
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
