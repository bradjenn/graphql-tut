import * as React from 'react';

import CreateLink from './CreateLink'
import LinkList from './LinkList';

import '../styles/App.css';

const App: React.SFC = () => (
  <div>
    <LinkList />
    <CreateLink />
  </div>
)

export default App;
