/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TElement } from '@udecode/plate';
import { reactCssPropsToCss } from '../utlis/reactCssPropsToCss';
import { CSSProperties } from 'react';
export const buttonNode = (
    node: TElement,
    children: string,
    defaultClassNames: string,
    styles: Record<string, CSSProperties & { hover?: CSSProperties }>
) => {
    const buttonTypeString = (node.buttonType as string) ?? 'primary';
    const buttonType = `button${buttonTypeString.charAt(0).toUpperCase()}${buttonTypeString.slice(1)}`;
    const buttonStyle = styles[buttonType];

    const defaultStyles = reactCssPropsToCss(buttonStyle);
    return `<a href="${node.url}"
                target="${node.target ?? '_blank'}"
                style="${defaultStyles}"
                class="${defaultClassNames}"
                onmouseenter="this.setAttribute('style', '${defaultStyles} ${reactCssPropsToCss(buttonStyle.hover)}');"
                onmouseleave="this.setAttribute('style', '${reactCssPropsToCss(buttonStyle)}');"
                >${children}</a>`;
};
