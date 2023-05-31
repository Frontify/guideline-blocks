/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_MENTION,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    TDescendant,
    TNode,
} from '@udecode/plate';
import { ELEMENT_BUTTON, TextStyles } from '../../plugins';
import { ELEMENT_CHECK_ITEM, MARK_TEXT_STYLE } from '@frontify/fondue';

type CreateElementProps = {
    text: string;
    element?: string;
    mark?: string;
};

const createElement = ({ text, element = ELEMENT_PARAGRAPH, mark }: CreateElementProps) => {
    const leaf: TDescendant = { text, [MARK_TEXT_STYLE]: element };
    if (mark) {
        leaf[mark] = true;
    }
    return {
        type: element,
        children: [leaf],
    };
};

type CreateLicElementProps = {
    text: string;
    textStyle?: string;
};

const createLicElement = ({ text, textStyle }: CreateLicElementProps) => {
    const textNode: TNode = { text };
    if (textStyle) {
        textNode[MARK_TEXT_STYLE] = textStyle;
    }
    return {
        type: ELEMENT_LIC,
        children: [{ text, [MARK_TEXT_STYLE]: textStyle }],
    };
};

export const IPSUM =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

export const unorderedListValue = {
    type: ELEMENT_UL,
    children: [
        {
            type: ELEMENT_LI,
            children: [createLicElement({ text: 'This is list item number two.', textStyle: TextStyles.custom1 })],
        },
        {
            type: ELEMENT_LI,
            children: [createLicElement({ text: 'This is list item number one.', textStyle: TextStyles.custom2 })],
        },
        {
            type: ELEMENT_LI,
            children: [
                createLicElement({ text: 'This is list item number three.', textStyle: TextStyles.custom3 }),
                {
                    type: ELEMENT_UL,
                    children: [
                        {
                            type: ELEMENT_LI,
                            children: [createLicElement({ text: 'This is child item number one.' })],
                        },
                        {
                            type: ELEMENT_LI,
                            children: [
                                createLicElement({ text: 'This is child item number two, with more children.' }),
                                {
                                    type: ELEMENT_UL,
                                    children: [
                                        {
                                            type: ELEMENT_LI,
                                            children: [
                                                createLicElement({ text: 'This is child of child item number one.' }),
                                            ],
                                        },
                                        {
                                            type: ELEMENT_LI,
                                            children: [
                                                createLicElement({ text: 'This is child of child item number two.' }),
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: ELEMENT_LI,
            children: [{ type: ELEMENT_LIC, children: [{ text: 'This is aligned right.' }], align: 'right' }],
        },
    ],
};

export const orderedListValue = {
    type: ELEMENT_OL,
    children: [
        {
            type: ELEMENT_LI,
            children: [{ type: ELEMENT_LIC, children: [{ text: 'This comes first.' }] }],
        },
        {
            type: ELEMENT_LI,
            children: [{ type: ELEMENT_LIC, children: [{ text: 'This comes second.' }] }],
        },
        {
            type: ELEMENT_LI,
            children: [
                createLicElement({ text: 'And last but not least, this comes third.' }),
                {
                    type: ELEMENT_OL,
                    children: [
                        {
                            type: ELEMENT_LI,
                            children: [createLicElement({ text: 'This is child item number one.' })],
                        },
                        {
                            type: ELEMENT_LI,
                            children: [
                                createLicElement({ text: 'This is child item number two.' }),
                                {
                                    type: ELEMENT_OL,
                                    children: [
                                        {
                                            type: ELEMENT_LI,
                                            children: [createLicElement({ text: 'Nested child item number one.' })],
                                        },
                                        {
                                            type: ELEMENT_LI,
                                            children: [
                                                createLicElement({ text: 'Nested child item number two.' }),
                                                {
                                                    type: ELEMENT_OL,
                                                    children: [
                                                        {
                                                            type: ELEMENT_LI,
                                                            children: [createLicElement({ text: 'Level 5 item 1' })],
                                                        },
                                                        {
                                                            type: ELEMENT_LI,
                                                            children: [createLicElement({ text: 'Level 5 item 2' })],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: ELEMENT_LI,
            children: [{ type: ELEMENT_LIC, children: [{ text: 'This is aligned right.' }], align: 'right' }],
        },
    ],
};

export const valueWithColumnBreaks = [
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is followed by a break 1.' }],
        breakAfterColumn: 'active',
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: '' }],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is followed by a break 2.' }],
        breakAfterColumn: 'inactive',
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is followed by a break 3.' }],
        breakAfterColumn: 'inactive',
    },
];

export const defaultValue = [
    createElement({ text: 'This text is bold.', mark: MARK_BOLD }),
    createElement({ text: 'This text is italic.', mark: MARK_ITALIC }),
    createElement({ text: 'This text has an underline.', mark: MARK_UNDERLINE }),
    createElement({ text: 'This text has a strikethrough.', mark: MARK_STRIKETHROUGH }),
    createElement({ text: 'This text is a code line.', mark: MARK_CODE }),
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'An example of subscript is N' }, { text: '2', subscript: true }],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'An example of superscript is 2' }, { text: '5', superscript: true }],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: '' }],
    },
    createElement({
        text: IPSUM,
    }),
    unorderedListValue,
    orderedListValue,
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: '' },
            {
                type: ELEMENT_LINK,
                children: [{ text: 'This is a Link. Without any breaks before or after' }],
                url: 'https://frontify.com',
            },
            { text: '' },
        ],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: 'Try mentioning characters, like ' },
            {
                type: ELEMENT_MENTION,
                category: 'user',
                id: 'aaaaaaaa20',
                children: [{ text: '' }],
            },
            { text: ' or ' },
            {
                type: ELEMENT_MENTION,
                category: 'group',
                id: '1111111111',
                children: [{ text: '' }],
            },
            { text: '.' },
        ],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                type: ELEMENT_LINK,
                chosenLink: {
                    searchResult: {
                        link: 'https://smartive.ch',
                    },
                    openInNewTab: true,
                },
                children: [
                    {
                        text: 'This is also a Link (Legacy Format).',
                    },
                ],
            },
        ],
    },
    createElement({ text: 'Heading 1', element: TextStyles.heading1 }),
    createElement({ text: 'Heading 2', element: TextStyles.heading2 }),
    createElement({ text: 'Heading 3', element: TextStyles.heading3 }),
    createElement({ text: 'Heading 4', element: TextStyles.heading4 }),
    createElement({ text: 'Custom 1', element: TextStyles.custom1 }),
    createElement({ text: 'Custom 2', element: TextStyles.custom2 }),
    createElement({ text: 'Custom 3', element: TextStyles.custom3 }),
    createElement({ text: 'Quote', element: TextStyles.quote }),
];

export const alignedValues = [
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is left aligned.' }],
        align: 'left',
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is center aligned.' }],
        align: 'center',
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is right aligned.' }],
        align: 'right',
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is justified.' }],
        align: 'justify',
    },
    {
        type: 'p',
        children: [
            { text: '' },
            { type: 'a', url: 'https://frontify.com/', target: '_blank', children: [{ text: 'This is a Link.' }] },
            { text: '' },
        ],
    },
];

export const checkboxValue = [
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 0,
        children: [{ text: 'This is a checked checklist item.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 0,
        children: [{ text: 'This is an unchecked checklist item.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 0,
        children: [{ text: 'This is checked again, and it also has children!' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 1,
        children: [{ text: 'This is child checklist item.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 1,
        children: [{ text: 'This is a checked child checklist item, with even more children!' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 2,
        children: [{ text: "Hello, I'm unchecked." }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 2,
        children: [{ text: "I'm also unchecked." }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 2,
        children: [{ text: 'Yep, unchecked.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 2,
        children: [{ text: "And I'm checked! Followed by an empty one!" }],
    },
    { type: ELEMENT_CHECK_ITEM, children: [{ text: '' }] },
];

export const buttonValues = [
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: 'This is a ' },
            {
                type: ELEMENT_BUTTON,
                url: 'https://www.google.com',
                buttonStyle: 'primary',
                children: [{ text: 'primary' }],
            },
            { text: ' button.' },
        ],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: 'This is a ' },
            {
                type: ELEMENT_BUTTON,
                url: 'https://www.google.com',
                buttonStyle: 'secondary',
                children: [{ text: 'secondary' }],
            },
            { text: ' button.' },
        ],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: 'This is a ' },
            {
                type: ELEMENT_BUTTON,
                url: 'https://www.google.com',
                buttonStyle: 'tertiary',
                children: [{ text: 'tertiary' }],
            },
            { text: ' button.' },
        ],
    },
];

export const nodesToSerialize: TDescendant[] = [
    ...defaultValue,
    ...alignedValues,
    ...valueWithColumnBreaks,
    ...checkboxValue,
    ...buttonValues,
];
