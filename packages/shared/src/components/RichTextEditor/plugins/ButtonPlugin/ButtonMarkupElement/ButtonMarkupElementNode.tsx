/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonStyles } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/TextStylePlugin/TextStyles';
import { DesignTokens } from '@frontify/fondue/dist/components/RichTextEditor/types';
import { HTMLPropsAs, PlateRenderElementProps, Value, useElementProps } from '@udecode/plate';
import React, { CSSProperties, HTMLAttributeAnchorTarget, ReactElement, ReactNode, useState } from 'react';
import { useGuidelineDesignTokens } from '../../../../../hooks';
import { RichTextButtonStyle, TButtonElement } from '../types';

export type ButtonRootProps = PlateRenderElementProps<Value, TButtonElement> & HTMLPropsAs<'a'>;

const useButton = (props: ButtonRootProps): HTMLPropsAs<'a'> & { buttonStyle: RichTextButtonStyle } => {
    const _props = useElementProps<TButtonElement, 'a'>({
        ...props,
        elementToAttributes: (element) => ({
            url: element.href,
            buttonStyle: element.buttonStyle || 'primary',
            target: element.target || '_blank',
        }),
    });

    return {
        ...(_props as HTMLPropsAs<'a'> & { buttonStyle: RichTextButtonStyle }),
        // quick fix: hovering <a> with href loses the editor focus
        onMouseOver: (e) => {
            e.stopPropagation();
        },
    };
};

export const ButtonMarkupElementNode = (props: ButtonRootProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const { href, target, buttonStyle } = useButton(props);
    const { attributes, children } = props;

    return (
        <HoverableButtonLink
            attributes={attributes}
            href={href}
            target={target}
            styles={designTokens ? getButtonStyle(designTokens, buttonStyle) : undefined}
        >
            {children}
        </HoverableButtonLink>
    );
};

export const getButtonStyle = (designTokens: DesignTokens, buttonStyle: RichTextButtonStyle) => {
    let styles;
    const design = designTokens as Partial<Record<ButtonStyles, CSSProperties & { hover: CSSProperties }>>;
    switch (buttonStyle) {
        case 'primary':
            styles = design.buttonPrimary;
            break;
        case 'secondary':
            styles = design.buttonSecondary;
            break;
        case 'tertiary':
            styles = design.buttonTertiary;
            break;
    }
    return { ...styles, cursor: 'pointer', display: 'inline-block', margin: '10px 0' };
};

type Props = {
    attributes: ButtonRootProps['attributes'];
    children: ReactNode;
    styles?: CSSProperties & { hover?: CSSProperties };
    href?: string;
    target?: HTMLAttributeAnchorTarget;
};

const HoverableButtonLink = ({
    attributes,
    styles = { hover: {} },
    children,
    href = '#',
    target,
}: Props): ReactElement => {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            {...attributes}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            href={href}
            target={target}
            style={hovered ? { ...styles, ...styles.hover } : styles}
        >
            {children}
        </a>
    );
};
