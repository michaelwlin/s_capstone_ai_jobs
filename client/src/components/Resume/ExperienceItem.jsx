import { useState } from 'react'
import { TextEditorBlock } from 'react-web-editor'
import { GPTMenuOption } from './index'

const ExperienceItem = ({
  parentStyle,
  defaultLeft,
  childSpacer,
  experienceTop,
}) => {
  return (
    <div>
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop}
        height={40}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'EXPERIENCE'}
        initialFontColor={'black'}
        initialFontSize={0.2}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop + 30}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'Title'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop + 60}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'Company Name'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop + 90}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'Date, Location'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop + 120}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'Company Description'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop + 150}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'• Job Achievements'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
        customMenuOptions={() => <GPTMenuOption />}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop + 180}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'• Job Achievements'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
        customMenuOptions={() => <GPTMenuOption />}
      />
      <TextEditorBlock
        width={parentStyle.width}
        top={experienceTop + 210}
        height={30}
        left={defaultLeft}
        parentStyle={parentStyle}
        unit={parentStyle.unit}
        initialText={'• Job Achievements'}
        initialFontColor={'black'}
        initialFontSize={0.17}
        initialFontName={'roboto'}
        customMenuOptions={() => <GPTMenuOption />}
      />
    </div>
  )
}

export default ExperienceItem
