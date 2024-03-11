import { TextEditorBlock } from 'react-web-editor'
import { useState, useEffect } from 'react'

const Skills = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  skillsTop,
  resumeSkills,
  skillsHeight,
  setSkillsHeight,
}) => {
  const [skills, setSkills] = useState(resumeSkills || [])
  const [languages, setLanguages] = useState(
    'Languages, Frameworks & Testing: ',
  )
  const [databases, setDatabases] = useState('Databases: ')
  const [other, setOther] = useState('Other: ')

  const formattedSkills = () => {
    if (!skills) return ''
    return skills.toString().split(',').join(' • ')
  }

  useEffect(() => {
    setSkillsHeight(() => {
      const calculatedHeight =
        resumeSkills && resumeSkills.length
          ? resumeSkills.length * 1
          : skillsHeight
      return calculatedHeight
    })
  }, [resumeSkills, skillsHeight, setSkillsHeight])

  useEffect(() => {
    setSkills(resumeSkills || [])
  }, [resumeSkills])

  const defaultSkills = () => {
    return (
      <>
        <TextEditorBlock
          key={'skills-languages'}
          width={parentStyle.width}
          top={skillsTop + 30}
          height={30}
          left={defaultLeft}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={languages}
          onChange={(e) => setLanguages(e.target.initialText)}
          initialFontColor={'black'}
          initialFontSize={0.17}
          initialFontName={'roboto'}
        />
        <TextEditorBlock
          key={'skills-databases'}
          width={parentStyle.width}
          top={skillsTop + 60}
          height={30}
          left={defaultLeft}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={databases}
          onChange={(e) => setDatabases(e.target.initialText)}
          initialFontColor={'black'}
          initialFontSize={0.17}
          initialFontName={'roboto'}
        />
        <TextEditorBlock
          key={'skills-other'}
          width={parentStyle.width}
          top={skillsTop + 90}
          height={30}
          left={defaultLeft}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={other}
          onChange={(e) => setOther(e.target.initialText)}
          initialFontColor={'black'}
          initialFontSize={0.17}
          initialFontName={'roboto'}
        />
      </>
    )
  }

  return (
    <div className="skills-container">
      <TextEditorBlock
        key={'skills-header'}
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
        customClasses={'font-bold'}
      />

      {skills.length > 0 ? (
        <TextEditorBlock
          key={'formatted-skills'}
          width={parentStyle.width}
          top={skillsTop}
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
