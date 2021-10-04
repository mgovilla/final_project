import 'remirror/styles/all.css';

import React, { useCallback } from 'react';
import { BoldExtension, ItalicExtension } from 'remirror/extensions';
import { Remirror, useHelpers, useKeymap, useRemirror } from '@remirror/react';

// Hooks can be added to the context without the need for creating custom components
const hooks = [
  () => {
    const { getJSON } = useHelpers();

    const handleSaveShortcut = useCallback(
      (props) => {
        const { state } = props;
        console.log(getJSON(state));

        return true; // Prevents any further key handlers from being run.
      },
      [getJSON],
    );

    // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
    useKeymap('Mod-s', handleSaveShortcut);
  },
];

function App() {
  const { manager, state } = useRemirror({
    extensions: () => [new BoldExtension(), new ItalicExtension()],
  });

  return (
    <div className="App">
      <div className="remirror-theme">
        <Remirror manager={manager} initialContent={state} hooks={hooks}>

        </Remirror>
      </div>
    </div>
  );
}
export default App;