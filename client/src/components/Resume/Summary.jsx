import { TextEditorBlock } from 'react-web-editor'
import { useState, useEffect } from 'react'
import { GPTMenuOption, SuggestionModal } from './index'

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
  const [showModalLoading, setModalLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [suggestions, setSuggestions] = useState({
    originalText: '',
    suggestedChanges: '',
    header: '', // Header to be used for modal
    acceptChanges: () => {}, //Takes a function to set the value
  })

  useEffect(() => {
    setSummary(resumeSummary?.toString() || 'Summary Description')
  }, [resumeSummary])

  return (
    <div className="container">
      <SuggestionModal
        suggestions={suggestions}
        showModal={showModal}
        setShowModal={setShowModal}
        setSuggestions={setSuggestions}
        loading={showModalLoading}
      />
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
        customMenuOptions={() => (
          <GPTMenuOption
            value={summary}
            setValue={setSummary}
            setShowModal={setShowModal}
            setSuggestions={setSuggestions}
            setModalLoading={setModalLoading}
          />
        )}
      />
    </div>
  )
}

export default Summary
