import { TextEditorBlock, useDraggable } from 'react-web-editor'

const Header = (parentStyle, defaultLeft, childSpacer) => {
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

  return (
    <div className="header text-center">
      <TextEditorBlock
        width={parentStyle.width}
        top={nameTop}
        height={nameHeight}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'Name'}
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
        initialText={'Role'}
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
          initialText={'• Phone'}
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
          initialText={'• Email'}
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
          initialText={'• LinkedIn/Portfolio'}
          initialFontColor={'black'}
          initialFontSize={defaultFontSize}
          initialFontName={'roboto'}
        />
      </div>
    </div>
  )
}

export default Header
