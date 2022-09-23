/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/material-theme/vsc-material-theme as reference for the colors

const white = '#ffffff',
    chalky = '#e5c07b',
    malibu = '#61afef',
    yellowGreen = '#C3E88D',
    tanHide = '#F78C6C',
    bilobaFlower = '#C792EA',
    logan = '#A6ACCD',
    anakiwa = '#89DDFF',
    lynch = '#676E95',
    highlightBackground = '#1C1E26',
    background = '#292D3E',
    tooltipBackground = '#292D3E',
    selection = '#3E4451',
    cursor = '#e5c07b';

export const materialPalenightTheme = EditorView.theme(
    {
        '&': {
            color: logan,
            backgroundColor: background,
        },

        '.cm-content': {
            caretColor: cursor,
        },

        '&.cm-focused .cm-cursor': { borderLeftColor: cursor },
        '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
            backgroundColor: selection,
        },

        '.cm-panels': { backgroundColor: background, color: logan },

        '.cm-button': {
            backgroundImage: 'none',
            color: logan,
        },

        '.cm-button:active': {
            backgroundImage: `linear-gradient(${background}, ${highlightBackground})`,
        },

        '.cm-searchMatch': {
            backgroundColor: '#72a1ff59',
            outline: `1px solid ${anakiwa}`,
        },
        '.cm-searchMatch.cm-searchMatch-selected': {
            backgroundColor: '#6199ff2f',
        },

        '.cm-activeLine': { backgroundColor: highlightBackground },
        '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

        '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: '#bad0f847',
            outline: '1px solid rgba(229, 192, 123, 0.4)',
        },

        '.cm-gutters': {
            backgroundColor: background,
            color: lynch,
            border: 'none',
        },

        '.cm-activeLineGutter': {
            backgroundColor: highlightBackground,
        },

        '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: logan,
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
                color: logan,
            },
        },
    },
    { dark: true }
);

export const materialPalenightHighlightStyle = HighlightStyle.define([
    { tag: [t.keyword, t.compareOperator, t.updateOperator, t.punctuation, t.attributeName], color: bilobaFlower },
    { tag: [t.string], color: yellowGreen },
    { tag: [t.typeName], color: chalky },
    {
        tag: [
            t.name,
            t.namespace,
            t.deleted,
            t.macroName,
            t.number,
            t.bool,
            t.atom,
            t.tagName,
            t.definitionOperator,
            t.changed,
        ],
        color: tanHide,
    },
    {
        tag: [t.function(t.variableName), t.function(t.propertyName), t.labelName],
        color: malibu,
    },
    {
        tag: [t.propertyName, t.contentSeparator, t.variableName, t.separator, t.name, t.bracket, t.className],
        color: logan,
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
            t.annotation,
            t.character,
        ],
        color: anakiwa,
    },
    {
        tag: [t.regexp, t.content, t.paren],
        color: white,
    },
    { tag: [t.meta], color: lynch },
    { tag: t.comment, fontStyle: 'italic', color: lynch },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: lynch, textDecoration: 'underline' },
    { tag: t.url, color: lynch, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: tanHide },
    { tag: t.invalid, textDecoration: 'underline', color: tanHide },
]);

export const materialPalenight: Extension = [materialPalenightTheme, materialPalenightHighlightStyle];
