/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_H1,
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
} from '@udecode/plate';
import { serializeNodeToHtmlRecursive } from './serializeNodesToHtmlRecursive';
import { orderedListValue, unorderedListValue } from './__tests__/exampleValues';
import { BlockStyles, TextStyles } from '../plugins';
import { ELEMENT_CHECK_ITEM, Text } from '@frontify/fondue';

type ChildElement = {
    type: string;
    children: {
        text: string;
    }[];
};

const createChildElement = (type: string, text: string): ChildElement => {
    return {
        type,
        children: [
            {
                text,
            },
        ],
    };
};

describe('serializeNodeToHtmlRecursive()', () => {
    it('serializes ordered list to html', () => {
        const node = {
            type: ELEMENT_OL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'First item' }],
                        },
                    ],
                },
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'Second item' }],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});

        expect(result).to.be.equal(
            '<ol class="tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] [&>li>p]:before:tw-pr-1 [&>li>p]:before:tw-content-[counter(count,decimal)_\'._\'] tw-break-words" style="counter-reset: count;"><li class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline" style="counter-increment: count;"><p class="tw-break-words tw-justify-start tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span>First item</span></p></li><li class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline" style="counter-increment: count;"><p class="tw-break-words tw-justify-start tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span>Second item</span></p></li></ol>'
        );
    });

    it('serializes active break after column element to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            breakAfterColumn: 'active',
            children: [
                {
                    text: 'This is a paragraph.',
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});

        expect(result).to.include('tw-break-after-column');
        expect(result).to.include('tw-break-inside-avoid-column');
    });

    it('does not serialize inactive break after column element to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            breakAfterColumn: 'inactive',
            children: [
                {
                    text: 'This is a paragraph.',
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});

        expect(result).to.not.include('tw-break-after-column');
        expect(result).to.not.include('tw-break-inside-avoid-column');
    });

    it('serializes ordered list with correct list style types to html', () => {
        const result = serializeNodeToHtmlRecursive(orderedListValue, BlockStyles, {});

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(result, 'text/html');
        const orderedLists = htmlDoc.getElementsByTagName('ol');
        expect(orderedLists[0]?.className).to.include('decimal');
        expect(orderedLists[1]?.className).to.include('alpha');
        expect(orderedLists[2]?.className).to.include('roman');
    });

    it('serializes list item with custom styles to html', () => {
        const result = serializeNodeToHtmlRecursive(unorderedListValue, BlockStyles, {});

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(result, 'text/html');
        const listItems = htmlDoc.getElementsByTagName('li');

        // custom1
        expect(listItems[0]?.style.fontSize).to.contain('var(--f-theme-settings-custom1-font-size)');
        expect(listItems[0]?.style.fontStyle).to.contain('var(--f-theme-settings-custom1-font-style)');
        expect(listItems[0]?.style.fontWeight).to.contain('var(--f-theme-settings-custom1-font-weight)');

        // custom2
        expect(listItems[1]?.style.fontSize).to.contain('var(--f-theme-settings-custom2-font-size)');
        expect(listItems[1]?.style.fontStyle).to.contain('var(--f-theme-settings-custom2-font-style)');
        expect(listItems[1]?.style.fontWeight).to.contain('var(--f-theme-settings-custom2-font-weight)');
    });

    it('serializes unordered list to html', () => {
        const node = {
            type: ELEMENT_UL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'This comes first.' }],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});

        expect(result).to.be.equal(
            '<ul class="[&>li>p]:before:tw-content-[\'•\'] [&>li>p]:before:tw-px-2 tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] tw-break-words"><li class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline" style="counter-increment: count;"><p class="tw-break-words tw-justify-start tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span>This comes first.</span></p></li></ul>'
        );
    });

    it('serializes link to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: ELEMENT_LINK,
                    children: [{ text: 'This is a Link.' }],
                    url: 'https://frontify.com',
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});
        expect(result).to.match(/<p.*><span.*><a.*href="https:\/\/frontify.com".*>This is a Link\.<\/a><\/span><\/p>/);
    });

    it('serializes legacy link format to html', () => {
        const node = {
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
                            text: 'This is also a Link.',
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});

        expect(result).to.match(
            /<p.*><span.*><a.*href="https:\/\/smartive.ch".*>This is also a Link\.<\/a><\/span><\/p>/
        );
    });

    it('serializes link with target blank to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: ELEMENT_LINK,
                    children: [{ text: 'This is a Link.' }],
                    target: '_blank',
                    url: 'https://frontify.com',
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});

        expect(result).to.match(
            /<p.*><span.*><a.*target="_blank".*href="https:\/\/frontify.com".*>This is a Link\.<\/a><\/span><\/p>/
        );
    });

    it('serializes headings and customs html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                createChildElement(TextStyles.heading1, 'This is a h1.'),
                createChildElement(TextStyles.heading2, 'This is a h2.'),
                createChildElement(TextStyles.heading3, 'This is a h3.'),
                createChildElement(TextStyles.heading4, 'This is a h4.'),
                createChildElement(TextStyles.custom1, 'This is a custom1.'),
                createChildElement(TextStyles.custom2, 'This is a custom2.'),
                createChildElement(TextStyles.custom3, 'This is a custom3.'),
                createChildElement(TextStyles.quote, 'This is a quote.'),
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});

        expect(result).to.match(/<h1.*><span.*>This is a h1.<\/span><\/h1>/);
        expect(result).to.match(/<h2.*><span.*>This is a h2.<\/span><\/h2>/);
        expect(result).to.match(/<h3.*><span.*>This is a h3.<\/span><\/h3>/);
        expect(result).to.match(/<h4.*><span.*>This is a h4.<\/span><\/h4>/);
        expect(result).to.match(/<p.*><span.*>This is a custom1.<\/span><\/p>/);
        expect(result).to.match(/<p.*><span.*>This is a custom2.<\/span><\/p>/);
        expect(result).to.match(/<p.*><span.*>This is a custom3.<\/span><\/p>/);
        expect(result).to.match(/<p.*><span.*>This is a quote.<\/span><\/p>/);
    });

    it('serializes a button to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: 'button',
                    url: 'https://frontify.com',
                    buttonStyle: 'primary',
                    children: [{ text: 'button' }],
                },
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});

        expect(result).to.contain('button');
        expect(result).to.contain('href="https://frontify.com"');
        expect(result).to.contain('target="_blank"');
    });

    it('serializes a button with target _blank to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: 'button',
                    target: '_blank',
                    url: 'https://frontify.com',
                    buttonStyle: 'primary',
                    children: [{ text: 'button' }],
                },
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});
        expect(result).to.contain('button');
        expect(result).to.contain('target="_blank"');
    });

    it('serializes a checked checklist item to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: true,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});
        expect(result).to.contain('item');
        expect(result).to.contain('checked');
    });

    it('serializes an unchecked checklist item to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: false,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});
        expect(result).to.include('item');
        expect(result).to.not.include('checked');
    });

    it('serializes a checklist item without an indent to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: false,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});
        expect(result).to.include('item');
        expect(result).to.include('margin-left:0px;');
    });

    for (const entry of [
        { indent: 0, outcome: '0px' },
        { indent: 1, outcome: '24px' },
        { indent: 2, outcome: '48px' },
    ]) {
        it(`serializes a checklist item with an indent of ${entry.indent} to html`, () => {
            const node = {
                type: ELEMENT_CHECK_ITEM,
                indent: entry.indent,
                children: [{ text: 'item' }],
            };

            const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});
            expect(result).to.include('item');
            expect(result).to.include(`margin-left:${entry.outcome};`);
        });
    }

    it('serializes with quotes in them correctly', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: ELEMENT_LINK,
                    children: [{ text: 'This is a Link.' }],
                    url: 'https://frontify.com',
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, BlockStyles, {});

        expect(result).to.be.equal(
            '<p class="tw-break-words"><span style="font-size: var(--f-theme-settings-body-font-size); line-height: var(--f-theme-settings-body-line-height); margin-top: var(--f-theme-settings-body-margin-top); margin-bottom: var(--f-theme-settings-body-margin-bottom); text-decoration: var(--f-theme-settings-body-text-decoration); font-style: var(--f-theme-settings-body-font-style); text-transform: var(--f-theme-settings-body-text-transform); letter-spacing: var(--f-theme-settings-body-letter-spacing); font-weight: var(--f-theme-settings-body-font-weight); font-family: var(--f-theme-settings-body-font-family); color: var(--f-theme-settings-body-color);"><a class="tw-break-words" style="font-size: var(--f-theme-settings-link-font-size); line-height: var(--f-theme-settings-link-line-height); margin-top: var(--f-theme-settings-link-margin-top); margin-bottom: var(--f-theme-settings-link-margin-bottom); text-decoration: var(--f-theme-settings-link-text-decoration); font-style: var(--f-theme-settings-link-font-style); text-transform: var(--f-theme-settings-link-text-transform); letter-spacing: var(--f-theme-settings-link-letter-spacing); font-weight: var(--f-theme-settings-link-font-weight); font-family: var(--f-theme-settings-link-font-family); color: var(--f-theme-settings-link-color);" target="_blank" href="https://frontify.com">This is a Link.</a></span></p>'
        );
    });

    it('serializes heading 1 with custom styles', () => {
        const node = {
            type: TextStyles.heading1,
            children: [{ text: 'This is a h1.' }],
        };
        const result = serializeNodeToHtmlRecursive(
            node,
            { [TextStyles.heading1]: { fontSize: '12px', marginTop: '20px', color: 'red' } },
            {}
        );

        expect(result).to.be.equal(
            '<h1 class="tw-break-words a-h1"><span style="font-size: 12px; margin-top: 20px; color: red;">This is a h1.</span></h1>'
        );
    });

    it('serializes custom2 with custom styles', () => {
        const node = {
            type: TextStyles.custom2,
            children: [{ text: 'This is a custom2.' }],
        };
        const result = serializeNodeToHtmlRecursive(
            node,
            { [TextStyles.custom2]: { fontSize: '18px', marginTop: '25px', textDecoration: 'underline' } },
            {}
        );

        expect(result).to.be.equal(
            '<p class="tw-break-words a-custom2"><span style="font-size: 18px; margin-top: 25px; text-decoration: underline;">This is a custom2.</span></p>'
        );
    });
});
