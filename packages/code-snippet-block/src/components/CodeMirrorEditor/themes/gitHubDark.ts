/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/markusylisiurunen/github-dark-mode as reference for the colors

const chalky = '#e5c07b',
    salmon = '#FF7B72',
    white = '#ffffff',
    stone = '#7d8799',
    malibu = '#79C0FF',
    anakiwa = '#A5D6FF',
    whiskey = '#d19a66',
    mauve = '#D2A8FF',
    ghost = '#C9D1D9',
    pastelGreen = '#7EE787',
    darkBackground = '#0d1117',
    highlightBackground = '#ffffff1a',
    background = '#0d1117',
    tooltipBackground = '#0d1117',
    selection = '#79a3d6',
    cursor = '#c9d1d9';

export const gitHubDarkTheme = EditorView.theme(
    {
        '&': {
            color: ghost,
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

        '&.cm-focused .cm-cursor': { borderLeftColor: cursor },
        '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
            backgroundColor: selection,
        },

        '.cm-panels': { backgroundColor: darkBackground, color: ghost },

        '.cm-searchMatch': {
            backgroundColor: '#153051',
            outline: '1px solid #79c0ff4c',
        },
        '.cm-searchMatch.cm-searchMatch-selected': {
            backgroundColor: '#153051',
        },

        '.cm-activeLine': { backgroundColor: highlightBackground },
        '.cm-selectionMatch': { backgroundColor: '#388bfd66' },

        '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: '#bad0f847',
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
    { dark: true }
);

export const gitHubDarkHighlightStyle = HighlightStyle.define([
    { tag: [t.keyword, t.compareOperator], color: salmon },
    { tag: [t.tagName], color: pastelGreen },
    { tag: [t.name, t.deleted, t.character, t.macroName], color: whiskey },
    {
        tag: [t.propertyName, t.number, t.definitionOperator, t.updateOperator, t.contentSeparator, t.punctuation],
        color: malibu,
    },
    {
        tag: [t.function(t.variableName), t.function(t.propertyName), t.labelName, t.attributeName],
        color: mauve,
    },
    {
        tag: [
            t.definition(t.name),
            t.definition(t.variableName),
            t.separator,
            t.name,
            t.bracket,
            t.definition(t.brace),
            t.className,
        ],
        color: ghost,
    },
    {
        tag: [t.typeName, t.changed, t.annotation, t.modifier, t.self, t.namespace],
        color: chalky,
    },
    { tag: [t.meta, t.comment], color: stone },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: stone, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: salmon },
    { tag: [t.processingInstruction, t.string, t.inserted], color: anakiwa },
    {
        tag: [
            t.invalid,
            t.url,
            t.escape,
            t.regexp,
            t.link,
            t.atom,
            t.bool,
            t.special(t.variableName),
            t.color,
            t.constant(t.name),
            t.standard(t.name),
        ],
        color: white,
    },
]);

export const gitHubDark: Extension = [gitHubDarkTheme, gitHubDarkHighlightStyle];
