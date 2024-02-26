import { MenuOption, DropDown } from 'react-web-editor'

const AI_COMMANDS = [
  { id: 'paraphrase', label: 'Paraphrase' },
  { id: 'improve', label: 'Improve' },
  { id: 'shorten', label: 'Shorten' },
  { id: 'wordbank', label: 'Word Bank' },
]

const GPTMenuOption = () => {
  console.log('GPTMenuOption rendered.')

  const onClick = () => {
    console.log('Button clicked.') // Add more logs or debug info
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
