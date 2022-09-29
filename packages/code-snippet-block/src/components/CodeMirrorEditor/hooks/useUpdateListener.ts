/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

export const useUpdateListener = (view: EditorView, callback: (value: string) => void) => {
    useExtension(view, () =>
        EditorView.updateListener.of((update) => {
            if (!update.docChanged) {
                return;
            }
            callback(update.state.doc.toString());
        })
    );
};
