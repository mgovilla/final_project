import React, { useEffect } from 'react'
import { Remirror } from '@remirror/react-core';
import { ThemeProvider } from "@remirror/react-components";
import { useRemirror, EditorComponent } from "@remirror/react-core";
import { AllStyledComponent } from "@remirror/styles/emotion";
import { EditorState } from '@remirror/core-types';

const testData:any = {
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "attrs": {
                "dir": null,
                "ignoreBidiAutoUpdate": null
            },
            "content": [
                {
                    "type": "text",
                    "text": "this is a test with some content"
                }
            ]
        }
    ]
}

// Combination Component ->
//      takes in a list of prose mirror contents
//      combines them into a single document
//      renders a view-only version
export default function Resume(props: { resume: Resume }) {
    const { manager, state, setState } = useRemirror({
        content: props.resume.content
    });

    useEffect(() => {
        setState(testData)
    }, [])

    return (
        <AllStyledComponent>
            <ThemeProvider>
                <Remirror manager={manager} editable={false} state={state} onChange={() => setState(state)}>
                    <EditorComponent />
                </Remirror>
            </ThemeProvider>
        </AllStyledComponent>
    );
}