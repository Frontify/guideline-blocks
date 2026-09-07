/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { langs } from '@uiw/codemirror-extensions-langs';
import { type Extension } from '@uiw/react-codemirror';
import { useMemo } from 'react';

import { themeForegrounds } from '../themeForegrounds';
import { type Language, type Theme } from '../types';

export const useCodeMirrorExtensions = (selectedLanguage: Language, selectedTheme: Theme): Extension[] =>
    useMemo(() => {
        const extensions: Extension[] = [];

        if (selectedLanguage !== 'plain' && Object.keys(langs).includes(selectedLanguage)) {
            extensions.push(langs[selectedLanguage]());
        }

        // Prevent inherited typography from overriding CodeMirror token styling.
        extensions.push(
            EditorView.theme({
                '&.cm-editor': {
                    letterSpacing: 'normal',
                },
                '.cm-content, .cm-line': {
                    letterSpacing: 'normal',
                    color: themeForegrounds[selectedTheme],
                },
            })
        );

        return extensions;
    }, [selectedLanguage, selectedTheme]);
