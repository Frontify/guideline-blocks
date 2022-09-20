/* (c) Copyright Frontify Ltd., all rights reserved. */

import './codeMirrorEditor.css';

import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { ReactElement, useEffect, useRef, useState } from 'react';

import { basicSetup } from './extensions';
import { useHeaderPanel, useIsEditing, useLanguage, useLineNumber, useTheme, useUpdateListener } from './hooks';

import { CodeMirrorEditorProps, CodeMirrorEditorStyle } from '../../types';

export const CodeMirrorEditor = ({
    theme,
    isEditing = false,
    language = 'html',
    border = 'none',
    padding = 'none',
    borderRadius = 'none',
    withHeading = false,
    withRowNumbers = false,
    initValue = '',
    onChange,
}: CodeMirrorEditorProps): ReactElement => {
    const editorRef = useRef<HTMLElement>(null);
    const [view, setView] = useState<EditorView>(new EditorView());

    useLanguage(view, language);
    useHeaderPanel(view, language, withHeading);
    useTheme(view, theme);
    useLineNumber(view, withRowNumbers);
    useUpdateListener(view, onChange);
    useIsEditing(view, isEditing);

    useEffect(() => {
        if (editorRef.current === null) {
            return;
        }

        const state = EditorState.create({ doc: initValue, extensions: basicSetup });

        view.destroy();

        setView(
            new EditorView({
                state,
                parent: editorRef.current,
            })
        );
        return () => {
            view.destroy();
            setView(new EditorView());
        };
    }, []);

    const style: CodeMirrorEditorStyle = {
        '--editor-border': border,
        '--editor-padding': padding,
        '--editor-border-radius': borderRadius,
    };

    return <section data-test-id="code-snippet-block" style={style} ref={editorRef} />;
};
