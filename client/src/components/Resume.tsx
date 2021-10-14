import React, { useEffect, useContext, useCallback } from 'react'
import { Remirror, useRemirrorContext } from '@remirror/react-core';
import { ThemeProvider } from "@remirror/react-components";
import { useRemirror, EditorComponent } from "@remirror/react-core";
import { AllStyledComponent } from "@remirror/styles/emotion";
import { ResumeContext } from '../pages/Context';
import { fetcher } from '../util/endpoint';
import { wysiwygPreset } from 'remirror/extensions';
import useSWR from 'swr';

const hooks = [
    () => {
        const { setContent } = useRemirrorContext();
        const { resume } = useContext(ResumeContext)
        const { data: modules, error } = useSWR(`/resumes/${resume._id}/modules`, fetcher('GET'))

        useEffect(() => {
            if (!modules || error) return

            if (modules && !error) {
                let mergedContent = (modules as Array<models.Module>).sort((a, b) => a.type - b.type).map(m => m.content.content).flat()
                setContent({ type: "doc", content: mergedContent })
            }

        }, [setContent, error, modules])
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