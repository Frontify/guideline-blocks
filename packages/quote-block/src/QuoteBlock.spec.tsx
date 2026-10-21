/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge/testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { QuoteBlock } from './QuoteBlock';
import { CUSTOM_QUOTE_STYLE_LEFT_ID, CUSTOM_QUOTE_STYLE_RIGHT_ID } from './settings';
import { QuotationMarksAnchoring, QuoteSize, QuoteStyle, QuoteType, TextAlignment } from './types';

const QUOTE_BLOCK_TEST_ID = 'quote-block';
const QUOTE_BLOCK_AUTHOR_TEST_ID = 'quote-block-author';
const RICH_TEXT_EDITOR_TEST_ID = 'rich-text-editor';

const EXAMPLE_COLOR = {
    red: 22,
    green: 181,
    blue: 181,
    alpha: 1,
    name: 'Java',
};

const LEFT_ICON_PATH =
    'M0.457174 0.149994V0.351933L0.284083 0.500418L0.457174 0.648054V0.849994L0.166992 0.601388V0.399448L0.457174 0.149994ZM0.542871 0.399448L0.833053 0.149994V0.351933L0.659962 0.500418L0.833053 0.648054V0.849994L0.542871 0.601388V0.399448Z';
const RIGHT_ICON_PATH = 'M0.681201 0.849994V0.149994H0.551937V0.731684H0.318604V0.849994H0.681201Z';

// RichTextEditor only mounts the editable editor once its container is reported in the viewport;
// happy-dom's IntersectionObserver never fires, so report every observed element as intersecting.
class IntersectingObserver {
    private readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }

    observe(target: Element) {
        this.callback(
            [{ isIntersecting: true, target } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver
        );
    }

    unobserve() {}

    disconnect() {}
}

const renderQuoteBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [QuoteBlockWithStubs, appBridge] = withAppBridgeBlockStubs(QuoteBlock, appBridgeProps);
    const utils = render(<QuoteBlockWithStubs />);
    return { ...utils, appBridge };
};

const getQuoteBlock = () => screen.getByTestId(QUOTE_BLOCK_TEST_ID);

describe('Quote Block', () => {
    beforeEach(() => {
        vi.stubGlobal('IntersectionObserver', IntersectingObserver);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should render a quote block with a quotation mark', () => {
        renderQuoteBlock();

        expect(getQuoteBlock().querySelectorAll('svg')).toHaveLength(1);
    });

    it('should render a quote block with indentation', () => {
        renderQuoteBlock({
            blockSettings: {
                type: QuoteType.Indentation,
                showAccentLine: true,
            },
        });

        expect(getQuoteBlock().querySelector('svg')).not.toBeInTheDocument();
        expect(screen.getByTestId(QUOTE_BLOCK_AUTHOR_TEST_ID).querySelector('blockquote')).toHaveStyle({
            borderLeftStyle: 'solid',
            borderLeftWidth: '2px',
        });
    });

    it('should render a quote block with two selected quotation marks', () => {
        renderQuoteBlock({
            blockSettings: {
                quoteStyleLeft: QuoteStyle.DoubleChevronLeft,
                quoteStyleRight: QuoteStyle.HookBracketRight,
            },
        });

        const paths = getQuoteBlock().querySelectorAll('svg path');
        expect(paths[0]).toHaveAttribute('d', LEFT_ICON_PATH);
        expect(paths[paths.length - 1]).toHaveAttribute('d', RIGHT_ICON_PATH);
    });

    it('should not render quotation marks when none are selected', () => {
        renderQuoteBlock({
            blockSettings: {
                quoteStyleLeft: QuoteStyle.None,
                quoteStyleRight: QuoteStyle.None,
            },
        });

        expect(getQuoteBlock().querySelector('svg')).not.toBeInTheDocument();
    });

    it('should render a quote block with a quote and an author', async () => {
        renderQuoteBlock({
            blockSettings: {
                content: 'Space is cool!',
                authorName: 'James Webb',
                showAuthor: true,
            },
            editorState: true,
        });

        await waitFor(() => {
            expect(screen.getByTestId(RICH_TEXT_EDITOR_TEST_ID)).toHaveTextContent('Space is cool!');
        });
        expect(screen.getByTestId(QUOTE_BLOCK_AUTHOR_TEST_ID)).toHaveTextContent('James Webb');
    });

    it('should write content to a quote block', async () => {
        renderQuoteBlock({ editorState: true });

        const editor = await screen.findByTestId(RICH_TEXT_EDITOR_TEST_ID);
        const contentEditable = await waitFor(() => {
            const element = editor.querySelector<HTMLElement>('[contenteditable=true]');
            expect(element).toBeInTheDocument();
            return element as HTMLElement;
        });

        await userEvent.type(contentEditable, 'This is a quote.');

        await waitFor(() => {
            expect(contentEditable).toHaveTextContent('This is a quote.');
        });
    });

    it('should render a quote block with the correct styling', () => {
        renderQuoteBlock({
            blockSettings: {
                sizeChoice: QuoteSize.LargeSize,
                quotesColor: EXAMPLE_COLOR,
                isCustomQuotesColor: true,
            },
        });

        expect(getQuoteBlock().querySelector('svg')).toHaveStyle({
            width: '32px',
            height: '32px',
            color: 'rgb(22, 181, 181)',
        });
    });

    describe('custom icons', () => {
        it('should render a quote block with custom icons', () => {
            renderQuoteBlock({
                blockSettings: {
                    isCustomQuoteStyleLeft: true,
                    isCustomQuoteStyleRight: true,
                    sizeChoice: QuoteSize.LargeSize,
                    isCustomQuotesColor: true,
                    quotesColor: EXAMPLE_COLOR,
                },
                blockAssets: {
                    [CUSTOM_QUOTE_STYLE_LEFT_ID]: [AssetDummy.with(342)],
                    [CUSTOM_QUOTE_STYLE_RIGHT_ID]: [AssetDummy.with(342)],
                },
            });

            const images = getQuoteBlock().querySelectorAll('img');
            expect(getQuoteBlock().querySelector('svg')).not.toBeInTheDocument();
            expect(images).toHaveLength(2);
            expect(images[0]).toHaveStyle({
                width: '32px',
                height: '32px',
                color: 'rgb(22, 181, 181)',
            });
        });

        it('should not render custom icons when no assets are uploaded', () => {
            renderQuoteBlock({
                blockSettings: {
                    isCustomQuoteStyleLeft: true,
                    isCustomQuoteStyleRight: true,
                },
            });

            expect(getQuoteBlock().querySelector('svg')).not.toBeInTheDocument();
            expect(getQuoteBlock().querySelector('img')).not.toBeInTheDocument();
        });

        it('should render a quote block with one custom and one default icon', () => {
            renderQuoteBlock({
                blockSettings: {
                    isCustomQuoteStyleLeft: true,
                    quoteStyleRight: QuoteStyle.HookBracketRight,
                },
                blockAssets: {
                    [CUSTOM_QUOTE_STYLE_LEFT_ID]: [AssetDummy.with(342)],
                },
            });

            expect(getQuoteBlock().querySelectorAll('svg')).toHaveLength(1);
            expect(getQuoteBlock().querySelectorAll('img')).toHaveLength(1);
        });
    });

    describe('alignments', () => {
        it.each([
            [TextAlignment.Left, 'tw-text-left'],
            [TextAlignment.Center, 'tw-text-center'],
            [TextAlignment.Right, 'tw-text-right'],
        ])('should render a quote block with %s alignment', (textAlignment, className) => {
            renderQuoteBlock({ blockSettings: { textAlignment } });

            expect(screen.getByTestId(QUOTE_BLOCK_AUTHOR_TEST_ID).firstElementChild).toHaveClass(className);
        });
    });

    describe('quotationMarksAnchoring', () => {
        it('should not justify the quotation marks apart when hugging the text', () => {
            renderQuoteBlock({
                blockSettings: {
                    quotationMarksAnchoring: QuotationMarksAnchoring.HugText,
                },
            });

            expect(getQuoteBlock().firstElementChild).not.toHaveClass('tw-justify-between');
        });

        it('should justify the quotation marks apart when full width', () => {
            renderQuoteBlock({
                blockSettings: {
                    quotationMarksAnchoring: QuotationMarksAnchoring.FullWidth,
                },
            });

            expect(getQuoteBlock().firstElementChild).toHaveClass('tw-justify-between');
        });
    });
});
