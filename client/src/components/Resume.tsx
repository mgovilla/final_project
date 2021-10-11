import React, { useEffect, useContext } from 'react'
import { Remirror, useRemirrorContext } from '@remirror/react-core';
import { ThemeProvider } from "@remirror/react-components";
import { useRemirror, EditorComponent } from "@remirror/react-core";
import { AllStyledComponent } from "@remirror/styles/emotion";
import { ResumeContext } from '../pages/Context';
import { EndPoint } from '../util/endpoint';
import { useHelpers } from '@remirror/react-core';

const DOC = {
    type: 'doc',
    content: [
        {
            type: 'paragraph',  
            content: [
                {
                    type: 'text',
                    text: 'New content',
                },
            ],
        },
    ],
};

const hooks = [
    () => {
        const { setContent } = useRemirrorContext();
        const { data } = useContext(ResumeContext)

        useEffect(() => {
            async function getData() {
                if (data) {
                    let m = await EndPoint.getModules(data[0]._id)
                    console.log(m[0].content)
                    setContent(m[0].content)
                }
            }
            // get the module from the db
            getData()

        }, [setContent, data])
    }
]

// Combination Component ->
//      takes in a list of prose mirror contents
//      combines them into a single document
//      renders a view-only version
export default function Resume() {
    const { manager, state, setState } = useRemirror();

    return (
        <AllStyledComponent>
            <ThemeProvider>
                <Remirror manager={manager} hooks={hooks} editable={false} state={state} onChange={() => setState(state)}>
                    <EditorComponent />
                </Remirror>
            </ThemeProvider>
        </AllStyledComponent>
    );
}