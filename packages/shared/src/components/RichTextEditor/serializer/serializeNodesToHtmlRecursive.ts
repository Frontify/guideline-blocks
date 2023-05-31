/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_CHECK_ITEM,
    MappedMentionableItems,
    OL_STYLES,
    UL_CLASSES,
    alignmentClassnames,
    getColumnBreakClasses,
    getOrderedListClasses,
    justifyClassNames,
    merge,
} from '@frontify/fondue';
import {
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_MENTION,
    ELEMENT_OL,
    ELEMENT_UL,
    TDescendant,
    TElement,
    isText,
} from '@udecode/plate';
import { serializeLeafToHtml } from './utlis/serializeLeafToHtml';
import { reactCssPropsToCss } from './utlis/reactCssPropsToCss';
import { CSSProperties } from 'react';
import { buttonNode } from './nodes/button';
import { linkNode } from './nodes/link';
import { defaultNode } from './nodes/default';
import { checkItemNode } from './nodes/checkItemNode';
import { mentionHtmlNode } from './nodes/mentionHtmlNode';
import { ELEMENT_BUTTON } from '../plugins';

const countNodesOfType = (nodes: TDescendant[], type: string): number => {
    return nodes.reduce((acc, node) => {
        if (node.type === type) {
            acc++;
        }
        if (node.children) {
            return acc + countNodesOfType(node.children as TDescendant[], type);
        }
        return acc;
    }, 0);
};

type NestingCount = {
    [type: string]: number;
};

type SerializeNodeToHtmlRecursiveOptions = {
    mappedMentionable?: MappedMentionableItems;
    nestingCount?: NestingCount;
};

export const serializeNodeToHtmlRecursive = (
    node: TDescendant,
    styles: Record<string, CSSProperties & { hover?: CSSProperties }>,
    { mappedMentionable, nestingCount = {} }: SerializeNodeToHtmlRecursiveOptions
): string => {
    if (isText(node)) {
        return serializeLeafToHtml(node);
    }

    const rootNestingCount = nestingCount[node.type] || countNodesOfType([node], node.type);
    let children = '';
    for (const element of node.children) {
        children += serializeNodeToHtmlRecursive(element, styles, {
            nestingCount: {
                ...nestingCount,
                [element.type as string]: rootNestingCount,
            },
            mappedMentionable,
        });
    }

    const htmlMapper = MapNodeTypesToHtml[node.type];
    if (typeof htmlMapper !== 'undefined') {
        return htmlMapper({
            classNames: getClassNames(node.breakAfterColumn as string | undefined, node.align as string | undefined),
            children,
            rootNestingCount,
            node,
            mappedMentionable,
            styles,
        });
    } else {
        return defaultNode(
            node,
            children,
            styles[node.type],
            getClassNames(node.breakAfterColumn as string | undefined, node.align as string | undefined)
        );
    }
};

type Arguments = {
    classNames: string;
    children: string;
    rootNestingCount: number;
    node: TElement;
    mappedMentionable?: MappedMentionableItems;
    styles: Record<string, CSSProperties & { hover?: CSSProperties }>;
};

const MapNodeTypesToHtml: { [key: string]: ({ ...args }: Arguments) => string } = {
    [ELEMENT_UL]: (args) => `<ul class="${UL_CLASSES} ${args.classNames}">${args.children}</ul>`,
    [ELEMENT_OL]: ({ classNames, children, node, rootNestingCount }) => {
        const nestingLevel = Math.max(rootNestingCount - countNodesOfType([node], ELEMENT_OL), 0);
        return `<ol class="${getOrderedListClasses(nestingLevel)} ${classNames}" style="${reactCssPropsToCss(
            OL_STYLES
        )}">${children}</ol>`;
    },
    [ELEMENT_LI]: ({ classNames, children, node, styles }) =>
        `<li class="${classNames} ${LI_CLASSNAMES}" style="${reactCssPropsToCss(
            getLiStyles(node, styles)
        )}">${children}</li>`,
    [ELEMENT_LIC]: ({ classNames, children, node }) =>
        `<p class="${classNames} ${getLicElementClassNames(node)}"><span>${children}</span></p>`,
    [ELEMENT_LINK]: ({ node, children, classNames, styles }) => linkNode(node, children, classNames, styles),
    [ELEMENT_BUTTON]: ({ node, children, classNames, styles }) => buttonNode(node, children, classNames, styles),
    [ELEMENT_CHECK_ITEM]: ({ node, children, classNames, styles }) => checkItemNode(node, children, classNames, styles),
    [ELEMENT_MENTION]: ({ node, mappedMentionable }) => mentionHtmlNode(node, { mentionable: mappedMentionable }),
};

const getClassNames = (breakAfterColumn?: string, align?: string) => {
    const breakWordsClass = 'tw-break-words';
    const columnBreakClasses =
        breakAfterColumn === 'active' ? 'tw-break-after-column tw-break-inside-avoid-column' : '';
    const alignClass = align ? alignmentClassnames[align] : '';
    return merge([alignClass, breakWordsClass, columnBreakClasses]);
};

const LI_CLASSNAMES = '[&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline';
const getLicElementClassNames = (element: TElement) =>
    merge([
        getColumnBreakClasses(element),
        element.align ? justifyClassNames[element.align as string] : 'tw-justify-start',
        'tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]',
    ]);

export const getLiStyles = (element: TElement, styles: Record<string, CSSProperties>): CSSProperties => {
    return {
        ...styles[getDeepestTextStyle(element)],
        counterIncrement: 'count',
    };
};

const getDeepestTextStyle = (node: TElement): string => {
    let textStyle;

    if (node.type === 'a') {
        textStyle = node.children[0].textStyle;
    } else if (node.children) {
        for (const childNode of node.children) {
            const deepestTextStyle = getDeepestTextStyle(childNode as TElement);
            if (deepestTextStyle && (!textStyle || deepestTextStyle.startsWith(textStyle))) {
                textStyle = deepestTextStyle;
            }
        }
    } else {
        textStyle = node.textStyle;
    }

    return textStyle as string;
};
