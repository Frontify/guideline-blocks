/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_BUTTON, TButtonElement } from '@frontify/fondue';
import { PlateEditor, getAboveNode } from '@udecode/plate';

export const getLinkNode = (editor: PlateEditor, cb: (link: TButtonElement) => string): string => {
    const linkNode = getAboveNode<TButtonElement>(editor, { match: { type: ELEMENT_BUTTON } });

    if (!Array.isArray(linkNode)) {
        return '';
    }

    return cb(linkNode[0]);
};
