/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/golf1052/base16-generator as reference for the colors

const silver = '#B8B8B8',
    appleBlossom = '#AB4642',
    diSerria = '#DC9656',
    mineShaft = '#383838',
    manhattan = '#F7CA88',
    bouquet = '#BA8BAF',
    glacier = '#7CAFC2',
    waikawaGray = '#6272a4',
    olivine = '#A1B56C',
    highlightBackground = '#e8e8e8',
    background = '#f8f8f8',
    tooltipBackground = '#f8f8f8',
    selection = '#d8d8d8',
    cursor = '#383838';

export const base16LightTheme = EditorView.theme(
    {
        '&': {
            color: mineShaft,
            backgroundColor: background,
        },

        '.cm-content': {
            caretColor: cursor,
        },

        '&.cm-focused .cm-cursor': { borderLeftColor: cursor, borderLeftWidth: '2px' },
        '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
            backgroundColor: selection,
        },

        '.cm-panels': { backgroundColor: background, color: mineShaft },

        '.cm-button': {
            backgroundImage: 'none',
            color: mineShaft,
        },

        '.cm-button:active': {
            backgroundImage: `linear-gradient(${background}, ${highlightBackground})`,
        },

        '.cm-searchMatch': {
            backgroundColor: highlightBackground,
        },
        '.cm-searchMatch.cm-searchMatch-selected': {
            backgroundColor: 'rgba(255, 184, 108, 0.6)',
        },

        '.cm-activeLine': { backgroundColor: highlightBackground },
        '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

        '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: highlightBackground,
            outline: '1px solid rgba(255, 184, 108, 0.6)',
        },

        '.cm-gutters': {
            backgroundColor: background,
            color: waikawaGray,
            border: 'none',
        },

        '.cm-activeLineGutter': {
            backgroundColor: highlightBackground,
        },

        '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: mineShaft,
        },

        '.cm-tooltip': {
            border: 'none',
            backgroundColor: tooltipBackground,
        },
        '.cm-tooltip .cm-tooltip-arrow:before': {
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
        },
        '.cm-tooltip .cm-tooltip-arrow:after': {
            borderTopColor: tooltipBackground,
            borderBottomColor: tooltipBackground,
        },
        '.cm-tooltip-autocomplete': {
            '& > ul > li[aria-selected]': {
                backgroundColor: highlightBackground,
                color: mineShaft,
            },
        },
    },
    { dark: false }
);

export const base16LightHighlightStyle = HighlightStyle.define([
    {
        tag: [t.keyword, t.attributeName, t.definitionOperator, t.punctuation],
        color: bouquet,
    },
    { tag: [t.string], color: olivine },
    { tag: [t.attributeName, t.namespace], color: manhattan },
    {
        tag: [t.number, t.name, t.deleted, t.macroName, t.changed, t.bool, t.null, t.processingInstruction, t.inserted],
        color: diSerria,
    },
    {
        tag: [t.function(t.variableName), t.function(t.propertyName), t.typeName, t.className],
        color: glacier,
    },
    {
        tag: [t.propertyName, t.variableName, t.name, t.tagName],
        color: appleBlossom,
    },
    {
        tag: [
            t.regexp,
            t.content,
            t.paren,
            t.bracket,
            t.contentSeparator,
            t.separator,
            t.updateOperator,
            t.compareOperator,
            t.atom,
        ],
        color: mineShaft,
    },
    { tag: [t.meta, t.comment], color: silver },
    { tag: t.self, fontStyle: 'italic', color: bouquet },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: silver, textDecoration: 'underline' },
    { tag: t.url, color: silver, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: bouquet },
    { tag: t.invalid, textDecoration: 'underline', color: appleBlossom },
]);

export const base16Light: Extension = [base16LightTheme, base16LightHighlightStyle];
