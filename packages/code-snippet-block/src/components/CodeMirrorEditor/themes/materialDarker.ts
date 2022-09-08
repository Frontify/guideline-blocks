/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/material-theme/vsc-material-theme as reference for the colors

const tanHide = '#F78C6C',
    froly = '#F07178',
    chalky = '#e5c07b',
    malibu = '#61afef',
    yellowGreen = '#C3E88D',
    bilobaFlower = '#C792EA',
    lynch = '#676E95',
    anakiwa = '#89DDFF',
    pelorous = '#39ADB5',
    dew = '#EEFFFF',
    highlightBackground = '#0A0A0A',
    background = '#212121',
    tooltipBackground = '#212121',
    selection = 'rgba(57, 173, 181, 0.2)',
    cursor = '#e5c07b';

export const materialDarkerTheme = EditorView.theme(
    {
        '&': {
            color: dew,
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

        '.cm-panels': { backgroundColor: background, color: dew },

        '.cm-button': {
            backgroundImage: 'none',
            color: dew,
        },

        '.cm-button:active': {
            backgroundImage: `linear-gradient(${background}, ${highlightBackground})`,
        },

        '.cm-textfield': {
            color: dew,
        },

        '.cm-searchMatch': {
            backgroundColor: highlightBackground,
            outline: `1px solid ${lynch}`,
        },
        '.cm-searchMatch.cm-searchMatch-selected': {
            outline: `2px solid ${pelorous}`,
        },

        '.cm-activeLine': { backgroundColor: highlightBackground },
        '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

        '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: '#bad0f847',
            outline: '1px solid rgba(229, 192, 123, 0.4)',
        },

        '.cm-gutters': {
            backgroundColor: background,
            color: dew,
            border: 'none',
        },

        '.cm-activeLineGutter': {
            backgroundColor: highlightBackground,
        },

        '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: dew,
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
                color: dew,
            },
        },
    },
    { dark: true }
);

export const materialDarkerHighlightStyle = HighlightStyle.define([
    {
        tag: [t.keyword, t.compareOperator, t.updateOperator, t.attributeName, t.punctuation],
        color: bilobaFlower,
    },
    { tag: [t.string], color: yellowGreen },
    { tag: [t.typeName], color: chalky },
    { tag: [t.tagName, t.definitionOperator], color: froly },
    {
        tag: [t.name, t.namespace, t.deleted, t.macroName, t.number, t.bool, t.atom, t.changed],
        color: tanHide,
    },
    {
        tag: [t.function(t.variableName), t.function(t.propertyName), t.labelName],
        color: malibu,
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
            t.paren,
            t.regexp,
        ],
        color: dew,
    },
    {
        tag: [
            t.processingInstruction,
            t.inserted,
            t.brace,
            t.angleBracket,
            t.squareBracket,
            t.modifier,
            t.character,
            t.null,
            t.self,
            t.annotation,
            t.character,
            t.operator,
        ],
        color: anakiwa,
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

export const materialDarker: Extension = [materialDarkerTheme, materialDarkerHighlightStyle];
