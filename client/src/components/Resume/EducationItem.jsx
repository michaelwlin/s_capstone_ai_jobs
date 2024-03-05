import { TextEditorBlock } from 'react-web-editor'

const EducationItem = (parentStyle, defaultLeft, childSpacer, educationTop) => {
  return (
    <div>
      <TextEditorBlock
        width={parentStyle.width}
        top={educationTop}
        height={40}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'EDUCATION'}
        initialFontColor={'black'}
        initialFontSize={0.2}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={educationTop + 30}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'Degree'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={educationTop + 60}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'School/University'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={educationTop + 90}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'Dates, Location'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
    </div>
  )
}

export default EducationItem
