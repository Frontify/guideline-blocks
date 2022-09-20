/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

export const useIsEditing = (view: EditorView, isEditing: boolean) => {
    useExtension(view, () => EditorView.editable.of(isEditing), [isEditing]);
};
