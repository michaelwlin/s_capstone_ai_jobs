import { TextEditorBlock } from 'react-web-editor'
import { useState, useEffect, useMemo } from 'react'

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

  const defaultValues = useMemo(() => {
    return {
      name: 'Name',
      title: 'Role',
      phone_number: '• Phone',
      email: '• Email',
      linkedin_url: '• LinkedIn/Portfolio',
    }
  }, [])

  const [header, setHeader] = useState({
    ...defaultValues,
    ...resumeHeader,
  })

  useEffect(() => {
    setHeader({
      ...defaultValues,
      ...resumeHeader,
    })
  }, [defaultValues, resumeHeader])

  return (
    <div className="header text-center">
      <TextEditorBlock
        key={`name-${header.name}`}
        width={parentStyle.width}
        top={nameTop}
        height={nameHeight}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={header.name}
        initialFontColor={'black'}
        initialFontSize={0.3}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        key={`title-${header.title}`}
        width={parentStyle.width}
        top={nameTop + nameHeight + 10}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={header.title}
        initialFontColor={'black'}
        initialFontSize={defaultFontSize}
        initialFontName={'roboto'}
      />
      <div>
        <TextEditorBlock
          key={`phone-${header.phone_number}`}
          width={relativeWidth(3)}
          top={nameTop + nameHeight + 40}
          height={30}
          left={defaultLeft}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={header.phone_number}
          initialFontColor={'black'}
          initialFontSize={defaultFontSize}
          initialFontName={'roboto'}
        />
        <TextEditorBlock
          key={`email-${header.email}`}
          width={relativeWidth(3)}
          top={nameTop + nameHeight + 40}
          height={20}
          left={relativeLeft(defaultLeft, relativeWidth(3))}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={header.email}
          initialFontColor={'black'}
          initialFontSize={defaultFontSize}
          initialFontName={'roboto'}
        />
        <TextEditorBlock
          key={`linkedin-${header.linkedin_url}`}
          width={relativeWidth(3)}
          top={nameTop + nameHeight + 40}
          height={20}
          left={relativeLeft(defaultLeft, relativeWidth(3), 2)}
          parentStyle={parentStyle}
          unit={parentStyle.unit}
          initialText={header.linkedin_url}
          initialFontColor={'black'}
          initialFontSize={defaultFontSize}
          initialFontName={'roboto'}
        />
      </div>
    </div>
  )
}

export default Header
