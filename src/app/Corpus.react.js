// Copyright 2015-present Greg Hurrell. All rights reserved.
// Licensed under the terms of the MIT license.

'use strict';

import React from 'react';
import ipc from 'ipc';

import Actions from './Actions';
import NoteView from './NoteView.react';
import NoteList from './NoteList.react';
import OmniBar from './OmniBar.react';
import SplitView from './SplitView.react';
import Viewport from './Viewport.react';

export default class Corpus extends React.Component {
  componentDidMount() {
    ipc.on('next', () => Actions.nextNote());
    ipc.on('previous', () => Actions.previousNote());
    ipc.on('rename', () => Actions.requestRename());
    ipc.on('search', () => Actions.focusOmniBar());
  }

  componentWillUnmount() {
    ipc.removeAllListeners('next');
    ipc.removeAllListeners('previous');
    ipc.removeAllListeners('rename');
    ipc.removeAllListeners('search');
  }

  render() {
    return (
      <Viewport>
        <OmniBar />
        <SplitView>
          <NoteList />
          <NoteView />
        </SplitView>
      </Viewport>
    );
  }
}
