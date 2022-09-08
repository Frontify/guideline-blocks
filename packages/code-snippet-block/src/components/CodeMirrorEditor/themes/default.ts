/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';

const basicTheme = EditorView.theme(
    {
        '&.cm-editor': {
            border: 'var(--editor-border)',
            padding: 'var(--editor-padding)',
            borderRadius: 'var(--editor-border-radius)',
        },
    },
    { dark: false }
);

export const defaultTheme: Extension = [basicTheme];
