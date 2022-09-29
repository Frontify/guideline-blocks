/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { lineNumbers } from '@codemirror/gutter';

import { addExtensionIf } from '../utils';
import { useExtension } from './useExtension';

export const useLineNumber = (view: EditorView, withRowNumbers: boolean) => {
    useExtension(view, () => addExtensionIf(withRowNumbers, lineNumbers()), [withRowNumbers]);
};
