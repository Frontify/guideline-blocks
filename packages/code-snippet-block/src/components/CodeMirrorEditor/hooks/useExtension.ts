/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Compartment, Extension, StateEffect } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { useEffect, useMemo } from 'react';

export const useExtension = (view: EditorView, extensionCreator: () => Extension, dependencies?: unknown[]) => {
    const compartment = useMemo(() => new Compartment(), []);
    const extension = useMemo(extensionCreator, [extensionCreator, dependencies]);

    useEffect(() => {
        if (!compartment.get(view.state)) {
            view.dispatch({ effects: StateEffect.appendConfig.of(compartment.of(extension)) });
        } else {
            view.dispatch({ effects: compartment.reconfigure(extension) });
        }
    }, [view, extension, compartment]);
};
