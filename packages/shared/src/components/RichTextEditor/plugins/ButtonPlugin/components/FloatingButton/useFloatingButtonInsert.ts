/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    HTMLPropsAs,
    focusEditor,
    getPluginOptions,
    getSelectionBoundingClientRect,
    useComposedRef,
    useEditorRef,
    useHotkeys,
    useOnClickOutside,
} from '@udecode/plate';
import { useEffect } from 'react';
import { useFocused } from 'slate-react';
import { ButtonPlugin, ELEMENT_BUTTON } from '../../createButtonPlugin';
import { triggerFloatingButtonInsert } from '../../utils/triggerFloatingButtonInsert';
import {
    FloatingButtonProps,
    floatingButtonActions,
    floatingButtonSelectors,
    useFloatingButtonEscape,
    useFloatingButtonSelectors,
    useVirtualFloatingButton,
} from './';

export const useFloatingButtonInsert = ({ floatingOptions, ...props }: FloatingButtonProps): HTMLPropsAs<'div'> => {
    const editor = useEditorRef();
    const focused = useFocused();
    const mode = useFloatingButtonSelectors().mode();
    const open = useFloatingButtonSelectors().isOpen(editor.id);

    const { triggerFloatingButtonHotkeys } = getPluginOptions<ButtonPlugin>(editor, ELEMENT_BUTTON);

    useHotkeys(
        triggerFloatingButtonHotkeys,
        (e) => {
            e.preventDefault();

            triggerFloatingButtonInsert(editor, {
                focused,
            });
        },
        {
            enableOnContentEditable: true,
        },
        [focused]
    );

    const ref = useOnClickOutside(
        (event) => {
            const isClickedWithinModal = (event.target as HTMLElement).closest('.link-tree-container');
            if (floatingButtonSelectors.mode() === 'insert' && !isClickedWithinModal) {
                floatingButtonActions.hide();
                focusEditor(editor, editor.selection ?? undefined);
            }
        },
        {
            disabled: !open,
        }
    );

    const { update, style, floating } = useVirtualFloatingButton({
        open: open && mode === 'insert',
        getBoundingClientRect: getSelectionBoundingClientRect,
        whileElementsMounted: undefined,
        ...floatingOptions,
    });

    // wait for update before focusing input
    useEffect(() => {
        if (open) {
            update();
        }
        floatingButtonActions.updated(open);
    }, [open, update]);

    useFloatingButtonEscape();

    return {
        style: {
            ...style,
            zIndex: 1,
        },
        ...props,
        ref: useComposedRef<HTMLElement | null>(props.ref, floating, ref),
    };
};
