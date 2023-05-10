/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getButtonClassNames, getHotkeyByPlatform, getTooltip } from '@frontify/fondue';
import {
    BlockToolbarButtonProps,
    ToolbarButton,
    focusEditor,
    isRangeInSameBlock,
    someNode,
    useEventPlateId,
    usePlateEditorState,
} from '@udecode/plate';
import React from 'react';
import { triggerFloatingButton } from '../utils';

export interface LinkToolbarButtonProps extends BlockToolbarButtonProps {
    /**
     * Default onMouseDown is getting the link url by calling this promise before inserting the image.
     */
    getLinkUrl?: (prevUrl: string | null) => Promise<string | null>;
}

export const ButtonToolbarButton = ({ id, type, ...props }: LinkToolbarButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(id));
    const isEnabled = !!isRangeInSameBlock(editor, {
        at: editor.selection,
    });

    const isLink = !!editor?.selection && someNode(editor, { match: { type } });

    return (
        <ToolbarButton
            tooltip={getTooltip(
                isEnabled
                    ? `Button\n${getHotkeyByPlatform('Ctrl+Shift+K')}`
                    : 'Buttons can only be set for a single text block.'
            )}
            classNames={getButtonClassNames(isEnabled)}
            active={isLink}
            onMouseDown={async (event) => {
                if (!editor) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();

                focusEditor(editor, editor.selection ?? editor.prevSelection ?? undefined);

                setTimeout(() => {
                    triggerFloatingButton(editor, { focused: true });
                }, 0);
            }}
            {...props}
        />
    );
};
