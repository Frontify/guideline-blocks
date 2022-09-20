/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/wesbos/cobalt2-vscode as reference for the colors

const white = '#ffffff',
    supernova = '#FFC600',
    orangePeel = '#FF9D00',
    kournikova = '#FFEE80',
    azureRadiance = '#0088FF',
    mintGreen = '#A5FF90',
    brinkPink = '#FF628C',
    solitude = '#E1EFFF',
    mauve = '#FB94FF',
    aquamarine = '#80FFBB',
    anakiwa = '#9EFFFF',
    highlightBackground = '#1F4662',
    background = '#193549',
    tooltipBackground = '#193549',
    selection = '#0050A4',
    cursor = '#ffc600';

export const cobaltTheme = EditorView.theme(
    {
        '&': {
            color: white,
            backgroundColor: background,
        },

        '.cm-content': {
            caretColor: cursor,
        },

        '&.cm-focused .cm-cursor': { borderLeftColor: cursor, borderLeftWidth: '2px' },
        '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
            backgroundColor: selection,
        },

        '.cm-panels': { backgroundColor: background, color: white },

        '.cm-button': {
            backgroundImage: 'none',
            color: white,
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
            color: white,
            border: 'none',
        },

        '.cm-activeLineGutter': {
            backgroundColor: highlightBackground,
        },

        '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: white,
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
                color: white,
            },
        },
    },
    { dark: true }
);

export const cobaltHighlightStyle = HighlightStyle.define([
    {
        tag: [
            t.keyword,
            t.compareOperator,
            t.updateOperator,
            t.attributeName,
            t.definitionOperator,
            t.attributeName,
            t.namespace,
            t.function(t.variableName),
            t.punctuation,
            t.className,
        ],
        color: supernova,
    },
    { tag: [t.atom], color: kournikova },
    { tag: [t.string], color: mintGreen },
    { tag: [t.function(t.keyword)], color: mauve },
    {
        tag: [t.number, t.name, t.deleted, t.macroName, t.bool, t.changed, t.null, t.processingInstruction, t.inserted],
        color: brinkPink,
    },
    {
        tag: [t.function(t.propertyName), t.typeName],
        color: orangePeel,
    },
    { tag: [t.typeName], color: aquamarine },
    { tag: [t.definition(t.propertyName), t.tagName], color: anakiwa },
    {
        tag: [t.propertyName, t.variableName, t.name],
        color: solitude,
    },
    {
        tag: [t.regexp, t.content, t.paren, t.bracket, t.contentSeparator, t.separator],
        color: solitude,
    },
    { tag: [t.meta, t.comment], fontStyle: 'italic', color: azureRadiance },
    { tag: t.self, fontStyle: 'italic', color: mauve },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: azureRadiance, textDecoration: 'underline' },
    { tag: t.url, color: azureRadiance, textDecoration: 'underline' },
    { tag: t.invalid, textDecoration: 'underline', color: brinkPink },
]);

export const cobalt: Extension = [cobaltTheme, cobaltHighlightStyle];
