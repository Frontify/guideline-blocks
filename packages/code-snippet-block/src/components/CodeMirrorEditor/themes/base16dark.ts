/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/golf1052/base16-generator as reference for the colors

const alto = '#D8D8D8',
    scorpion = '#585858',
    appleBlossom = '#AB4642',
    diSerria = '#DC9656',
    manhattan = '#F7CA88',
    springWood = '#F8F8F2',
    bouquet = '#BA8BAF',
    glacier = '#7CAFC2',
    waikawaGray = '#6272a4',
    olivine = '#A1B56C',
    highlightBackground = '#282828',
    background = '#181818',
    tooltipBackground = '#181818',
    selection = '#383838',
    cursor = '#d8d8d8';

export const base16DarkTheme = EditorView.theme(
    {
        '&': {
            color: springWood,
            backgroundColor: background,
        },

        '.cm-content': {
            caretColor: cursor,
        },

        '&.cm-focused .cm-cursor': { borderLeftColor: cursor, borderLeftWidth: '2px' },
        '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
            backgroundColor: selection,
        },

        '.cm-panels': { backgroundColor: background, color: springWood },

        '.cm-button': {
            backgroundImage: 'none',
            color: springWood,
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
            color: springWood,
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
                color: springWood,
            },
        },
    },
    { dark: true }
);

export const base16DarkHighlightStyle = HighlightStyle.define([
    {
        tag: [t.keyword, t.compareOperator, t.updateOperator, t.attributeName, t.definitionOperator],
        color: bouquet,
    },
    { tag: [t.string], color: olivine },
    { tag: [t.attributeName, t.namespace], color: manhattan },
    {
        tag: [
            t.number,
            t.name,
            t.deleted,
            t.macroName,
            t.atom,
            t.changed,
            t.bool,
            t.null,
            t.processingInstruction,
            t.inserted,
        ],
        color: diSerria,
    },
    {
        tag: [t.function(t.variableName), t.function(t.propertyName), t.typeName, t.punctuation, t.className],
        color: glacier,
    },
    {
        tag: [t.propertyName, t.variableName, t.name, t.tagName],
        color: appleBlossom,
    },
    {
        tag: [t.regexp, t.content, t.paren, t.bracket, t.contentSeparator, t.separator],
        color: alto,
    },
    { tag: [t.meta, t.comment], fontStyle: 'italic', color: scorpion },
    { tag: t.self, fontStyle: 'italic', color: bouquet },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: scorpion, textDecoration: 'underline' },
    { tag: t.url, color: scorpion, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: bouquet },
    { tag: t.invalid, textDecoration: 'underline', color: appleBlossom },
]);

export const base16Dark: Extension = [base16DarkTheme, base16DarkHighlightStyle];
