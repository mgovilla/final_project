import React, { useCallback } from 'react';
import { BoldExtension, ItalicExtension } from 'remirror/extensions';
import { EditorComponent, Remirror, useActive, useChainedCommands, useCommands, useHelpers, useKeymap, useRemirror } from '@remirror/react';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg'
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

// Menu component to render above the editing window
export const Menu = () => {
    // Access the commands and the activity status of the editor.
    const chain = useChainedCommands();
    const active = useActive();
    const { toggleBold } = useCommands();

    return (
        <button onClick={() => chain.toggleBold().focus().run()} 
                disabled={toggleBold.enabled() === false} 
                style={{ fontWeight: active.bold() ? 'bold' : undefined }}>
            B
        </button>
    );
};

function Editor() {
    const { manager, state } = useRemirror({
        extensions: () => [new BoldExtension(), new ItalicExtension()],
    });

    return (
        <div className="remirror-theme">
            <Remirror manager={manager} initialContent={state} hooks={hooks}>
                <EditorComponent />
                <Menu />
            </Remirror>
        </div>
    );
}

export default Editor