import { TextEditorBlock } from 'react-web-editor'
import { useState, useEffect } from 'react'

const Header = ({ parentStyle, defaultLeft, childSpacer, resumeHeader }) => {
  const nameTop = 30
  const nameHeight = 40

  const relativeWidth = (numberOfChildren) => {
    return (
      (parentStyle.width - defaultLeft - childSpacer * numberOfChildren) /
      numberOfChildren
    )
  }
  const relativeLeft = (firstChild, width, index = 1) => {
    return firstChild + (width + childSpacer) * index
  }

  const [headerName, setHeaderName] = useState(resumeHeader?.name || 'Name')
  const [headerRole, setHeaderRole] = useState(resumeHeader?.title || 'Role')
  const [headerPhone, setHeaderPhone] = useState(
    resumeHeader?.phone_number || '• Phone',
  )
  const [headerEmail, setHeaderEmail] = useState(
    resumeHeader?.email || '• Email',
  )
  const [headerLinkedin, setHeaderLinkedin] = useState(
    resumeHeader?.linkedin_url || '• LinkedIn/Portfoli URL',
  )

  useEffect(() => {
    setHeaderName(resumeHeader?.name || 'Name')
    setHeaderRole(resumeHeader?.title || 'Role')
    setHeaderEmail(resumeHeader?.email || '• Email')
    setHeaderPhone(resumeHeader?.phone_number || '• Phone')
    setHeaderLinkedin(resumeHeader?.linkedin_url || '• LinkedIn/Portfolio URL')
  }, [resumeHeader])

  return (
    <div className="header text-center">
      <TextEditorBlock
        key={`name-${headerName}`}
        width={parentStyle.width}
        top={nameTop}
        height={nameHeight}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={headerName}
        initialFontColor={'black'}
        initialFontSize={0.3}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        key={`title-${headerRole}`}
        width={parentStyle.width}
        top={nameTop + 10}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={headerRole}
        initialFontColor={'black'}
        initialFontSize={parentStyle.textFontSize}
        initialFontName={'roboto'}
      />
      <div className="flex flex-row">
        <TextEditorBlock
          customClasses={'grow'}
          key={`phone-${headerPhone}`}
          width={relativeWidth(3)}
          top={nameTop + 10}
          height={30}
          left={defaultLeft}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={headerPhone}
          initialFontColor={'black'}
          initialFontSize={parentStyle.textFontSize}
          initialFontName={'roboto'}
        />
        <TextEditorBlock
          key={`email-${headerEmail}`}
          width={relativeWidth(3)}
          top={nameTop + 10}
          height={30}
          left={0}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={headerEmail}
          initialFontColor={'black'}
          initialFontSize={parentStyle.textFontSize}
          initialFontName={'roboto'}
        />
        <TextEditorBlock
          key={`linkedin-${headerLinkedin}`}
          width={relativeWidth(3)}
          top={nameTop + 10}
          height={30}
          left={0}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={headerLinkedin}
          initialFontColor={'black'}
          initialFontSize={parentStyle.textFontSize}
          initialFontName={'roboto'}
        />
      </div>
    </div>
  )
}

export default Header
