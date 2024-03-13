import { MenuOption, DropDown } from 'react-web-editor'

const AI_COMMANDS = [
  { id: 'paraphrase', label: 'Paraphrase' },
  { id: 'improve', label: 'Improve' },
  { id: 'shorten', label: 'Shorten' },
  { id: 'wordbank', label: 'Word Bank' },
]

const paraphrase = () => {
  //call API endpoint to paraphrase
}

const GPTMenuOption = () => {
  const onClick = (e) => {
    switch (e.target.id) {
      case 'paraphrase':
        console.log('Paraphrase')
        break
      case 'improve':
        console.log('Improve')
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
