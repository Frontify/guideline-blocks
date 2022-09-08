/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/fisheva/Eva-Theme as reference for the colors

const pumpkin = '#FF6D12',
    robinsEggBlue = '#00BEC4',
    fruitSalad = '#53A053',
    royalBlue = '#437AED',
    electricViolet = '#7C4DFF',
    chestnutRose = '#CD6069',
    fuchsiaPink = '#C838C6',
    lavenderMagenta = '#ef8ed8',
    lavender = '#C57BDB',
    scarpaFlow = '#5D5D5F',
    bombay = '#A9A9AA',
    highlightBackground = '#E3E6ED',
    background = '#EBEEF5',
    tooltipBackground = '#EBEEF5',
    selection = '#0065FF3F',
    cursor = '#FC8357';

export const evaLightTheme = EditorView.theme(
    {
        '&': {
            color: bombay,
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

        '.cm-panels': { backgroundColor: background, color: bombay },

        '.cm-panels-top': { borderBottom: 'none' },

        '.cm-button': {
            backgroundImage: 'none',
            color: bombay,
        },

        '.cm-button:active': {
            backgroundImage: `linear-gradient(${background}, ${highlightBackground})`,
        },

        '.cm-searchMatch': {
            backgroundColor: '#CFD2D9',
        },
        '.cm-searchMatch.cm-searchMatch-selected': {
            backgroundColor: '#F8F900',
        },

        '.cm-activeLine': { backgroundColor: highlightBackground },
        '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

        '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: '#CFD2D9',
        },

        '.cm-gutters': {
            backgroundColor: background,
            color: bombay,
            border: 'none',
        },

        '.cm-activeLineGutter': {
            backgroundColor: highlightBackground,
        },

        '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: bombay,
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
                color: scarpaFlow,
            },
        },
    },
    { dark: false }
);

export const evaLightHighlightStyle = HighlightStyle.define([
    { tag: [t.keyword, t.namespace], color: electricViolet },
    { tag: [t.updateOperator, t.className, t.attributeName], color: robinsEggBlue },
    { tag: [t.compareOperator, t.bool, t.null], color: fuchsiaPink },
    { tag: [t.typeName], color: lavenderMagenta },
    { tag: [t.propertyName, t.self, t.tagName], color: chestnutRose },
    { tag: [t.string], color: fruitSalad },
    { tag: [t.atom], color: lavender },
    { tag: [t.number], color: pumpkin },
    {
        tag: [t.function(t.variableName), t.function(t.propertyName), t.labelName, t.punctuation],
        color: royalBlue,
    },
    {
        tag: [
            t.changed,
            t.deleted,
            t.macroName,
            t.content,
            t.variableName,
            t.separator,
            t.bracket,
            t.processingInstruction,
            t.inserted,
            t.brace,
            t.angleBracket,
            t.squareBracket,
            t.modifier,
            t.annotation,
            t.character,
            t.operator,
            t.meta,
        ],
        color: scarpaFlow,
    },
    { tag: t.comment, fontStyle: 'italic', color: bombay },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: scarpaFlow, textDecoration: 'underline' },
    { tag: t.url, color: scarpaFlow, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: chestnutRose },
    { tag: t.invalid, textDecoration: 'underline', color: chestnutRose },
]);

export const evaLight: Extension = [evaLightTheme, evaLightHighlightStyle];
