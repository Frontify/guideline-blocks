/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GutterSpacing } from '@frontify/guideline-blocks-settings';
import { type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import definition from './index';

export default { title: 'Blocks/Text', ...blockMeta(definition) };

const text = (value: string) => ({ text: value });
const element = (type: string, value: string) => ({ type, children: [text(value)] });
const listItem = (value: string) => ({ type: 'li', children: [{ type: 'lic', children: [text(value)] }] });

const allTextStyles = JSON.stringify([
    element('heading1', 'Heading 1 — Brand foundations'),
    element('heading2', 'Heading 2 — Logo usage'),
    element('heading3', 'Heading 3 — Clear space'),
    element('heading4', 'Heading 4 — Minimum size'),
    element('custom1', 'Custom 1 — A lead paragraph that introduces the section.'),
    element('custom2', 'Custom 2 — --brand-primary: #4f46e5;'),
    element('custom3', 'Custom 3 — Label'),
    {
        type: 'p',
        children: [
            text('Body text with '),
            { text: 'bold', bold: true },
            text(', '),
            { text: 'italic', italic: true },
            text(', '),
            { text: 'underlined', underline: true },
            text(' and '),
            { text: 'inline code', code: true },
            text(' formatting, plus a '),
            { type: 'a', url: 'https://www.frontify.com', target: '_blank', children: [text('link to Frontify')] },
            text('.'),
        ],
    },
    element('quote', 'Quote — Good design is as little design as possible.'),
    element('imageTitle', 'Image title — Primary logo on light backgrounds'),
    element('imageCaption', 'Image caption — Use the full-colour version wherever possible.'),
    { type: 'ul', children: [listItem('Bullet list item'), listItem('Another bullet item')] },
    { type: 'ol', children: [listItem('Numbered list item'), listItem('Second numbered item')] },
]);

const article = JSON.stringify([
    element('heading2', 'Our voice'),
    element(
        'p',
        'We write the way we talk to a good colleague: clear, warm and to the point. We avoid jargon, explain the why, and keep sentences short so they are easy to scan.'
    ),
    element(
        'p',
        'When in doubt, read your copy out loud. If it sounds like a press release, simplify it. If it sounds like a chat with a friend who knows the product well, you are on the right track.'
    ),
    element('heading3', 'Do'),
    {
        type: 'ul',
        children: [listItem('Lead with the benefit'), listItem('Use active voice'), listItem('Be specific')],
    },
    element('heading3', "Don't"),
    { type: 'ul', children: [listItem('Overpromise'), listItem('Use exclamation marks for emphasis')] },
]);

export const Empty: BlockStory = {};

export const AllTextStyles: BlockStory = {
    args: { content: allTextStyles },
};

export const TwoColumns: BlockStory = {
    args: { content: article, columnNumber: '2', columnGutterSimple: GutterSpacing.M },
};

export const ThreeColumnsCustomGutter: BlockStory = {
    args: { content: article, columnNumber: '3', isColumnGutterCustom: true, columnGutterCustom: '48px' },
};
