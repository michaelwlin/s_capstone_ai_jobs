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

  const [header, setHeader] = useState(resumeHeader)
  const [name, setName] = useState(header?.name || 'Name')
  const [role, setRole] = useState(header?.title || 'Role')
  const [phone, setPhone] = useState(header?.phone_number || '• Phone')
  const [email, setEmail] = useState(header?.email || '• Email')
  const [linkedin, setLinkedin] = useState(
    header?.linkedin_url || '• LinkedIn/Portfolio',
  )

  useEffect(() => {
    setHeader(resumeHeader || {})
    setName(resumeHeader?.name || 'Name')
    setRole(resumeHeader?.title || 'Role')
    setPhone(resumeHeader?.phone_number || '• Phone')
    setEmail(resumeHeader?.email || '• Email')
    setLinkedin(resumeHeader?.linkedin_url || '• LinkedIn/Portfolio')
  }, [resumeHeader])

  console.log(header, name)

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
          initialFontColor={'black'}
          initialFontSize={defaultFontSize}
          initialFontName={'roboto'}
        />
      </div>
    </div>
  )
}

export default Header
