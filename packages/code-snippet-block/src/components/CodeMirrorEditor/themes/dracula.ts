/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/dracula/visual-studio-code as reference for the colors

const white = '#ffffff',
    honeysuckle = '#F1FA8C',
    hotPink = '#FF79C6',
    springWood = '#F8F8F2',
    perfume = '#BD93F9',
    anakiwa = '#89DDFF',
    waikawaGray = '#6272a4',
    screaminGreen = '#50FA7B',
    highlightBackground = '#44475A75',
    background = '#282A36',
    tooltipBackground = '#282A36',
    selection = '#44475A',
    cursor = '#6272a4';

export const draculaTheme = EditorView.theme(
    {
        '&': {
            color: springWood,
            backgroundColor: background,
        },

        '&.cm-editor': {
            border: 'var(--editor-border)',
            padding: 'var(--editor-padding)',
            borderRadius: 'var(--editor-border-radius)',
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

export const draculaHighlightStyle = HighlightStyle.define([
    {
        tag: [
            t.keyword,
            t.compareOperator,
            t.updateOperator,
            t.punctuation,
            t.attributeName,
            t.definitionOperator,
            t.tagName,
        ],
        color: hotPink,
    },
    { tag: [t.string], color: honeysuckle },
    {
        tag: [t.name, t.namespace, t.deleted, t.macroName, t.bool, t.atom, t.changed],
        color: perfume,
    },
    { tag: [t.number, t.bool, t.null, t.processingInstruction, t.inserted], color: perfume },
    {
        tag: [t.function(t.variableName), t.attributeName],
        color: screaminGreen,
    },
    {
        tag: [t.propertyName, t.contentSeparator, t.variableName, t.separator, t.name, t.bracket],
        color: springWood,
    },
    {
        tag: [t.function(t.propertyName), t.typeName, t.className],
        color: anakiwa,
    },
    {
        tag: [t.regexp, t.content, t.paren],
        color: white,
    },
    { tag: [t.meta, t.comment], color: waikawaGray },
    { tag: t.self, fontStyle: 'italic', color: perfume },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: waikawaGray, textDecoration: 'underline' },
    { tag: t.url, color: waikawaGray, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: perfume },
    { tag: t.invalid, textDecoration: 'underline', color: perfume },
]);

export const dracula: Extension = [draculaTheme, draculaHighlightStyle];
