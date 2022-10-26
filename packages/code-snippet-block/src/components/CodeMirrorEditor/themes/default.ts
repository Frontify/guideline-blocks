/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';

const basicTheme = EditorView.theme(
    {
        '.cm-header-panel': {
            color: '#969898',
        },
    },
    { dark: false }
);

export const defaultTheme: Extension = [basicTheme];
