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

        // Shields the editor from typography inherited from the guideline theme. The colour has to be
        // the selected scheme's own foreground: `initial` would resolve to black and make every dark
        // scheme unreadable, while leaving it out lets the guideline's body colour bleed in.
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
