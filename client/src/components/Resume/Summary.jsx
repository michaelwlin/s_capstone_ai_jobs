import { TextEditorBlock } from 'react-web-editor'
import { useState, useEffect } from 'react'

const Summary = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  summaryTop,
  resumeSummary,
}) => {
  const [summary, setSummary] = useState(
    resumeSummary?.toString() || 'Summary Description',
  )

  useEffect(() => {
    setSummary(resumeSummary?.toString() || 'Summary Description')
  }, [resumeSummary])

  return (
    <div className="container">
      <TextEditorBlock
        width={parentStyle.width}
        top={summaryTop}
        height={40}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'SUMMARY'}
        initialFontColor={'black'}
        initialFontSize={parentStyle.headerFontSize}
        initialFontName={'roboto'}
        customClasses={'font-bold'}
      />
      <TextEditorBlock
        key={`summary-${summary}`}
        width={parentStyle.width}
        top={summaryTop}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={summary}
        initialFontColor={'black'}
        initialFontSize={parentStyle.textFontSize}
        initialFontName={'roboto'}
      />
    </div>
  )
}

export default Summary
