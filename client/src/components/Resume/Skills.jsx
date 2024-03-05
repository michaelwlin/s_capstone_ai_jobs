import { TextEditorBlock } from 'react-web-editor'
import { useState } from 'react'

const Skills = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  skillsTop,
  resumeSkills,
}) => {
  const [skills, setSkills] = useState(resumeSkills)
  const [languages, setLanguages] = useState(
    'Languages, Frameworks & Testing: ',
  )
  const [databases, setDatabases] = useState('Databases: ')
  const [other, setOther] = useState('Other: ')

  const formattedSkills = () => {
    if (!resumeSkills) return ''
    return resumeSkills.toString().split(',').join(' • ')
  }

  const defaultSkills = () => {
    if (!resumeSkills) {
      return (
        <>
          <TextEditorBlock
            width={parentStyle.width}
            top={skillsTop + 30}
            height={30}
            left={defaultLeft}
            parentStyle={parentStyle}
            unit={parentStyle.unit}
            initialText={languages}
            initialFontColor={'black'}
            initialFontSize={0.17}
            initialFontName={'roboto'}
          />
          <TextEditorBlock
            width={parentStyle.width}
            top={skillsTop + 60}
            height={30}
            left={defaultLeft}
            parentStyle={parentStyle}
            unit={parentStyle.unit}
            initialText={databases}
            initialFontColor={'black'}
            initialFontSize={0.17}
            initialFontName={'roboto'}
          />
          <TextEditorBlock
            width={parentStyle.width}
            top={skillsTop + 90}
            height={30}
            left={defaultLeft}
            parentStyle={parentStyle}
            unit={parentStyle.unit}
            initialText={other}
            initialFontColor={'black'}
            initialFontSize={0.17}
            initialFontName={'roboto'}
          />
        </>
      )
    }
  }

  return (
    <div>
      <TextEditorBlock
        width={parentStyle.width}
        top={skillsTop}
        height={40}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'SKILLS'}
        initialFontColor={'black'}
        initialFontSize={0.2}
        initialFontName={'roboto'}
      />

      {resumeSkills ? (
        <TextEditorBlock
          width={parentStyle.width}
          top={skillsTop + 30}
          height={30}
          left={defaultLeft}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={formattedSkills()}
          initialFontColor={'black'}
          initialFontSize={0.17}
          initialFontName={'roboto'}
        />
      ) : (
        defaultSkills()
      )}
    </div>
  )
}

export default Skills
