import { TextEditorBlock } from 'react-web-editor'
import { useState } from 'react'

const Summary = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  summaryTop,
  resumeSummary,
}) => {
  const [summary, setSummary] = useState(resumeSummary)

  return (
    <div>
      <TextEditorBlock
        width={parentStyle.width}
        top={summaryTop}
        height={40}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'SUMMARY'}
        initialFontColor={'black'}
        initialFontSize={0.2}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={summaryTop + 30}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'Summary Description'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
    </div>
  )
}

export default Summary
