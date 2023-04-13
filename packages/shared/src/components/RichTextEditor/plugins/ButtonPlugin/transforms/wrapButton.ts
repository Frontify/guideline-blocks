/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, WrapNodesOptions, getPluginType, wrapNodes } from '@udecode/plate';
import { ELEMENT_BUTTON, RichTextButtonStyle, TButtonElement } from '../';

export interface WrapButtonOptions<V extends Value = Value> extends WrapNodesOptions<V> {
    url: string;
    buttonStyle?: RichTextButtonStyle;
    target?: string;
}

/**
 * Wrap a button node with split.
 */
export const wrapButton = <V extends Value>(
    editor: PlateEditor<V>,
    { url, buttonStyle, target, ...options }: WrapButtonOptions<V>
) => {
    wrapNodes<TButtonElement, Value>(
        editor,
        {
            type: getPluginType(editor, ELEMENT_BUTTON),
            url,
            buttonStyle,
            target,
            children: [],
        },
        { split: true, ...options } as WrapNodesOptions
    );
};
