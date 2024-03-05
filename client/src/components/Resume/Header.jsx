import { TextEditorBlock } from 'react-web-editor'
import { useState, useEffect } from 'react'

const Header = ({ parentStyle, defaultLeft, childSpacer, resumeHeader }) => {
  const nameTop = 30
  const nameHeight = 40
  const defaultFontSize = 0.17

  const relativeWidth = (numberOfChildren) => {
    return (
      (parentStyle.width - defaultLeft - childSpacer * numberOfChildren) /
      numberOfChildren
    )
  }
  const relativeLeft = (firstChild, width, index = 1) => {
    return firstChild + (width + childSpacer) * index
  }

  const [name, setName] = useState(resumeHeader?.name || 'Name')
  const [role, setRole] = useState(resumeHeader?.title || 'Role')
  const [phone, setPhone] = useState(resumeHeader?.phone_number || '• Phone')
  const [email, setEmail] = useState(resumeHeader?.email || '• Email')
  const [linkedin, setLinkedin] = useState(
    resumeHeader?.linkedin_url || '• LinkedIn/Portfolio',
  )

  useEffect(() => {
    setName(resumeHeader?.name || 'Name')
    setRole(resumeHeader?.title || 'Role')
    setPhone(resumeHeader?.phone_number || '• Phone')
    setEmail(resumeHeader?.email || '• Email')
    setLinkedin(resumeHeader?.linkedin_url || '• LinkedIn/Portfolio')
  }, [resumeHeader])

  return (
    <div className="header text-center">
      <TextEditorBlock
        width={parentStyle.width}
        top={nameTop}
        height={nameHeight}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={name}
        onChange={(e) => setName(e.target.initialText)}
        initialFontColor={'black'}
        initialFontSize={0.3}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={nameTop + nameHeight + 10}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={role}
        onChange={(e) => setRole(e.target.initialText)}
        initialFontColor={'black'}
        initialFontSize={defaultFontSize}
        initialFontName={'roboto'}
      />
      <div>
        <TextEditorBlock
          width={relativeWidth(3)}
          top={nameTop + nameHeight + 40}
          height={30}
          left={defaultLeft}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={phone}
          onChange={(e) => setPhone(e.target.initialText)}
          initialFontColor={'black'}
          initialFontSize={defaultFontSize}
          initialFontName={'roboto'}
        />
        <TextEditorBlock
          width={relativeWidth(3)}
          top={nameTop + nameHeight + 40}
          height={20}
          left={relativeLeft(defaultLeft, relativeWidth(3))}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={email}
          onChange={(e) => setEmail(e.target.initialText)}
          initialFontColor={'black'}
          initialFontSize={defaultFontSize}
          initialFontName={'roboto'}
        />
        <TextEditorBlock
          width={relativeWidth(3)}
          top={nameTop + nameHeight + 40}
          height={20}
          left={relativeLeft(defaultLeft, relativeWidth(3), 2)}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={linkedin}
          onChange={(e) => setLinkedin(e.target.initialText)}
          initialFontColor={'black'}
          initialFontSize={defaultFontSize}
          initialFontName={'roboto'}
        />
      </div>
    </div>
  )
}

export default Header
