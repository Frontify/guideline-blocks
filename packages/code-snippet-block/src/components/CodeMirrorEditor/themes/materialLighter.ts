/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/material-theme/vsc-material-theme as reference for the colors

const crusta = '#F76D47',
    whiskey = '#d19a66',
    shipCove = '#6182B8',
    chelseaCucumber = '#91B859',
    pelorous = '#39ADB5',
    electricViolet = '#7C4DFF',
    gullGray = '#90A4AE',
    highlightBackground = '#F1EFEF',
    background = '#FAFAFA',
    tooltipBackground = '#FAFAFA',
    selection = 'rgba(57, 173, 181, 0.2)',
    cursor = '#000';

export const materialLighterTheme = EditorView.theme(
    {
        '&': {
            color: gullGray,
            backgroundColor: background,
        },

        '.cm-content': {
            caretColor: cursor,
        },

        '&.cm-focused .cm-cursor': { borderLeftColor: cursor, borderLeftWidth: '2px' },
        '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
            backgroundColor: selection,
        },

        '.cm-panels': { backgroundColor: background, color: gullGray },

        '.cm-panels-top': { borderBottom: 'none' },

        '.cm-searchMatch': {
            backgroundColor: highlightBackground,
            outline: `1px solid ${gullGray}`,
        },
        '.cm-searchMatch.cm-searchMatch-selected': {
            outline: `2px solid ${pelorous}`,
        },

        '.cm-button': {
            backgroundImage: 'none',
            color: gullGray,
        },

        '.cm-button:active': {
            backgroundImage: `linear-gradient(${background}, ${highlightBackground})`,
        },

        '.cm-activeLine': { backgroundColor: highlightBackground },
        '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

        '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: '#bad0f847',
            outline: '1px solid #515a6b',
        },

        '.cm-gutters': {
            backgroundColor: background,
            color: gullGray,
            border: 'none',
        },

        '.cm-activeLineGutter': {
            backgroundColor: highlightBackground,
        },

        '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: gullGray,
        },

        '.cm-tooltip': {
            border: 'none',
            backgroundColor: tooltipBackground,
            color: gullGray,
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
                color: pelorous,
            },
        },
    },
    { dark: false }
);

export const materialLighterHighlightStyle = HighlightStyle.define([
    { tag: [t.keyword, t.compareOperator, t.updateOperator, t.attributeName], color: electricViolet },
    { tag: [t.string], color: chelseaCucumber },
    { tag: [t.typeName], color: whiskey },
    {
        tag: [t.name, t.namespace, t.deleted, t.macroName, t.number, t.bool, t.atom, t.tagName, t.changed],
        color: crusta,
    },
    {
        tag: [t.function(t.variableName), t.function(t.propertyName), t.labelName],
        color: shipCove,
    },
    {
        tag: [
            t.propertyName,
            t.contentSeparator,
            t.variableName,
            t.separator,
            t.name,
            t.bracket,
            t.className,
            t.regexp,
            t.content,
            t.meta,
        ],
        color: gullGray,
    },
    {
        tag: [
            t.processingInstruction,
            t.inserted,
            t.brace,
            t.operator,
            t.angleBracket,
            t.squareBracket,
            t.modifier,
            t.character,
            t.null,
            t.self,
            t.paren,
            t.annotation,
            t.character,
            t.punctuation,
        ],
        color: pelorous,
    },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.comment, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: gullGray, textDecoration: 'underline' },
    { tag: t.url, color: gullGray, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: crusta },
    { tag: t.invalid, textDecoration: 'underline', color: crusta },
]);

export const materialLighter: Extension = [materialLighterTheme, materialLighterHighlightStyle];
