/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/laggardkernel/vscode-theme-onelight as reference for the colors

const mandy = '#E45649',
    mediumRedViolet = '#A626A4',
    stone = '#7d8799',
    whiskey = '#d19a66',
    ghost = '#C9D1D9',
    fruitSalad = '#50A14F',
    royalBlue = '#4078F2',
    lochmara = '#0184BC',
    chelseaGem = '#986801',
    tuna = '#383A42',
    highlightBackground = '#F6F8FA',
    darkBackground = '#f6f8fa',
    background = '#fafafa',
    tooltipBackground = '#0d1117',
    selection = '#528bff',
    cursor = '#c9d1d9';

export const oneLightTheme = EditorView.theme(
    {
        '&': {
            color: ghost,
            backgroundColor: background,
        },

        '.cm-content': {
            caretColor: cursor,
        },

        '&.cm-focused .cm-cursor': { borderLeftColor: cursor },
        '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
            backgroundColor: selection,
        },

        '.cm-panels': { backgroundColor: darkBackground, color: tuna },

        '.cm-panels-top': { borderBottom: 'none' },

        '.cm-searchMatch': {
            backgroundColor: '#ffdf5d',
            outline: '1px solid #79c0ff4c',
        },
        '.cm-searchMatch.cm-searchMatch-selected': {
            backgroundColor: '#ffdf5d66',
        },
        '.cm-button': {
            backgroundImage: 'none',
        },

        '.cm-button:active': {
            backgroundImage: `linear-gradient(${royalBlue}, ${lochmara})`,
        },

        '.cm-activeLine': { backgroundColor: highlightBackground },
        '.cm-selectionMatch': { backgroundColor: royalBlue },

        '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: background,
            outline: '1px solid #515a6b',
        },

        '.cm-gutters': {
            backgroundColor: background,
            color: stone,
            border: 'none',
        },

        '.cm-activeLineGutter': {
            backgroundColor: highlightBackground,
        },

        '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#484f58',
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
                color: ghost,
            },
        },
    },
    { dark: false }
);

export const oneLightHighlightStyle = HighlightStyle.define([
    { tag: t.keyword, color: mediumRedViolet },
    { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: mandy },
    { tag: [t.function(t.variableName), t.labelName], color: mandy },
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
    { tag: [t.definition(t.name), t.separator, t.function(t.propertyName)], color: royalBlue },
    {
        tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
        color: chelseaGem,
    },
    {
        tag: [
            t.definitionOperator,
            t.punctuation,
            t.operatorKeyword,
            t.logicOperator,
            t.url,
            t.escape,
            t.regexp,
            t.link,
            t.special(t.string),
        ],
        color: lochmara,
    },
    { tag: [t.bracket, t.operator], color: tuna },
    { tag: [t.meta, t.comment], color: stone },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: stone, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: mandy },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
    { tag: [t.processingInstruction, t.string, t.inserted], color: fruitSalad },
]);

export const oneLight: Extension = [oneLightTheme, oneLightHighlightStyle];
