/* (c) Copyright Frontify Ltd., all rights reserved. */

import { HTMLPropsAs, LinkRootProps, useElementProps } from '@udecode/plate';
import React, { MouseEvent } from 'react';
import { TLinkElement } from '../types';
import { getTextStyleCssProperties } from '@frontify/fondue';

const useLink = (props: LinkRootProps): HTMLPropsAs<'a'> => {
    const _props = useElementProps<TLinkElement, 'a'>({
        ...props,
        elementToAttributes: (element) => ({
            href: element.url || element.chosenLink?.searchResult?.link || '',
            target: element.target || '_blank',
        }),
    });

    return {
        ..._props,
        // quick fix: hovering <a> with href loses the editor focus
        onMouseOver: (e: MouseEvent) => {
            e.stopPropagation();
        },
    };
};

export const LinkMarkupElementNode = (props: LinkRootProps) => {
    const htmlProps = useLink(props);
    const { attributes, children } = props;

    return (
        <a {...attributes} href={htmlProps.href} target={htmlProps.target} style={getTextStyleCssProperties('link')}>
            {children}
        </a>
    );
};
