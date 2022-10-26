/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/primer/github-vscode-theme and
// https://github.com/primer/primitives/blob/main/data/colors/themes/light.ts as reference for the colors

const ivory = '#abb2bf',
    valencia = '#D73A49',
    scienceBlue = '#005CC5',
    paleSky = '#6A737D',
    anakiwa = '#A5D6FF',
    whiskey = '#d19a66',
    fuchsiaBlue = '#6F42C1',
    shark = '#24292E',
    forestGreen = '#22863A',
    darkBackground = '#ffffff',
    highlightBackground = 'rgba(234, 238, 242, 0.5)',
    background = '#ffffff',
    tooltipBackground = '#353a42',
    selection = '#0366d625',
    cursor = '#528bff';

export const gitHubLightTheme = EditorView.theme(
    {
        '&': {
            color: ivory,
            backgroundColor: background,
        },

        '.cm-content': {
            caretColor: cursor,
        },

        '&.cm-focused .cm-cursor': { borderLeftColor: cursor },
        '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
            backgroundColor: selection,
        },

        '.cm-panels': { backgroundColor: darkBackground, color: ivory },

        '.cm-panels-top': { borderBottom: 'none' },

        '.cm-searchMatch': {
            backgroundColor: '#ffdf5d',
            outline: '1px solid #22863A',
        },
        '.cm-searchMatch.cm-searchMatch-selected': {
            backgroundColor: '#ffdf5d66',
        },

        '.cm-activeLine': { backgroundColor: highlightBackground },
        '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

        '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: '#bad0f847',
            outline: '1px solid #22863A',
        },

        '.cm-gutters': {
            backgroundColor: background,
            color: paleSky,
            border: 'none',
        },

        '.cm-activeLineGutter': {
            backgroundColor: highlightBackground,
        },

        '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: paleSky,
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
                color: ivory,
            },
        },
    },
    { dark: false }
);

export const gitHubLightHighlightStyle = HighlightStyle.define([
    { tag: [t.keyword, t.compareOperator, t.definitionOperator, t.updateOperator, t.punctuation], color: valencia },
    { tag: [t.tagName], color: forestGreen },
    { tag: [t.name, t.deleted, t.character, t.macroName], color: whiskey },
    {
        tag: [t.function(t.propertyName), t.number, t.contentSeparator, t.atom, t.bool, t.typeName, t.self],
        color: scienceBlue,
    },
    {
        tag: [t.function(t.variableName), t.labelName, t.attributeName],
        color: fuchsiaBlue,
    },
    {
        tag: [
            t.definition(t.name),
            t.definition(t.propertyName),
            t.definition(t.variableName),
            t.separator,
            t.name,
            t.bracket,
            t.definition(t.brace),
            t.className,
            t.string,
            t.content,
        ],
        color: shark,
    },
    { tag: [t.meta, t.comment, t.url], color: paleSky },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: paleSky, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: valencia },
    { tag: [t.processingInstruction, t.inserted], color: anakiwa },
    { tag: t.invalid, textDecoration: 'underline', color: valencia },
]);

export const gitHubLight: Extension = [gitHubLightTheme, gitHubLightHighlightStyle];
