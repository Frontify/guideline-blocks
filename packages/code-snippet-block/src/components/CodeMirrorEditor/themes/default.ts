/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';

const basicTheme = EditorView.theme({}, { dark: false });

export const defaultTheme: Extension = [basicTheme];
