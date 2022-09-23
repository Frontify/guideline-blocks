/* (c) Copyright Frontify Ltd., all rights reserved. */

import { highlightActiveLineGutter } from '@codemirror/gutter';
import { EditorView, highlightActiveLine } from '@codemirror/view';

import { addExtensionIf } from '../utils';
import { useExtension } from './useExtension';

export const useHighlightActiveLine = (view: EditorView, isEditing: boolean) => {
    useExtension(view, () => addExtensionIf(isEditing, [highlightActiveLine(), highlightActiveLineGutter()]), [
        isEditing,
    ]);
};
