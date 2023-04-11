/* (c) Copyright Frontify Ltd., all rights reserved. */

import { HTMLPropsAs, UseVirtualFloatingOptions, createComponentAs, createElementAs } from '@udecode/plate';
import { useFloatingButtonEdit } from './useFloatingButtonEdit';
import { useFloatingButtonInsert } from './useFloatingButtonInsert';
import { FloatingButtonEditButton } from './FloatingButtonEditButton';
import { UnlinkButton } from './UnlinkButton';

export type FloatingButtonProps = HTMLPropsAs<'div'> & {
    floatingOptions?: UseVirtualFloatingOptions;
};

export const FloatingButtonEditRoot = createComponentAs<FloatingButtonProps>((props) => {
    const htmlProps = useFloatingButtonEdit(props);

    if (htmlProps.style?.display === 'none') {
        return null;
    }

    return createElementAs('div', htmlProps);
});

export const FloatingButtonInsertRoot = createComponentAs<FloatingButtonProps>((props) => {
    const htmlProps = useFloatingButtonInsert(props);

    if (htmlProps.style?.display === 'none') {
        return null;
    }
    return createElementAs('div', htmlProps);
});

export const FloatingButton = {
    EditRoot: FloatingButtonEditRoot,
    InsertRoot: FloatingButtonInsertRoot,
    EditButton: FloatingButtonEditButton,
    UnlinkButton,
};
