import React, { useEffect, useContext, useCallback } from 'react'
import { Remirror, useRemirrorContext } from '@remirror/react-core';
import { ThemeProvider } from "@remirror/react-components";
import { useRemirror, EditorComponent } from "@remirror/react-core";
import { AllStyledComponent } from "@remirror/styles/emotion";
import { ResumeContext } from '../pages/Context';
import { EndPoint } from '../util/endpoint';
import { useHelpers } from '@remirror/react-core';
import { wysiwygPreset } from 'remirror/extensions';

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
                    let modules = await EndPoint.getModules(data[0]._id)
                    let mergedContent = (modules as Array<any>).map(m => m.content.content).flat()
                    console.log()
                    setContent({type: "doc", content: mergedContent})
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
    var extensions = useCallback(() => [...wysiwygPreset()], []);
    const { manager, state, onChange } = useRemirror({
        extensions
    });

    return (
        <AllStyledComponent>
            <ThemeProvider>
                <Remirror manager={manager} hooks={hooks} editable={false} state={state} onChange={onChange}>
                    <EditorComponent />
                </Remirror>
            </ThemeProvider>
        </AllStyledComponent>
    );
}