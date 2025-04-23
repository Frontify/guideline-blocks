/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react';
import { QuoteBlock } from './QuoteBlock';
import { CUSTOM_QUOTE_STYLE_LEFT_ID, CUSTOM_QUOTE_STYLE_RIGHT_ID } from './settings';
import { QuotationMarksAnchoring, QuoteSize, QuoteStyle, QuoteType, TextAlignment } from './types';

const QuoteBlockSelector = '[data-test-id="quote-block"]';
const QuoteBlockAuthor = '[data-test-id="quote-block-author"]';
const QuoteBlockContent = '[data-test-id="rich-text-editor"]';

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

describe('Quote Block', () => {
    it('renders a quote block with a quotation marks', () => {
        const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {});

        mount(<QuoteBlockWithStubs />);
        cy.get(QuoteBlockSelector).find('svg').should('have.length', 1);
    });

    it('renders a quote block with indentation', () => {
        const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
            blockSettings: {
                type: QuoteType.Indentation,
            },
        });

        mount(<QuoteBlockWithStubs />);
        cy.get(QuoteBlockSelector).find('> div > figure').should('have.css', 'border-left');
    });

    it('renders a quote block with two selected quotation marks', () => {
        const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
            blockSettings: {
                quoteStyleLeft: QuoteStyle.DoubleChevronLeft,
                quoteStyleRight: QuoteStyle.HookBracketRight,
            },
        });

        mount(<QuoteBlockWithStubs />);
        cy.get(QuoteBlockSelector).find('svg path').first().should('have.attr', 'd', LEFT_ICON_PATH);
        cy.get(QuoteBlockSelector).find('svg path').last().should('have.attr', 'd', RIGHT_ICON_PATH);
    });

    it('renders a quote block without quotation marks', () => {
        const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
            blockSettings: {
                quoteStyleLeft: QuoteStyle.None,
                quoteStyleRight: QuoteStyle.None,
            },
        });

        mount(<QuoteBlockWithStubs />);
        cy.get(QuoteBlockSelector).find('svg').should('not.exist');
    });

    it('renders a quote block with a quote and an author', () => {
        const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
            blockSettings: {
                content: 'Space is cool!',
                authorName: 'James Webb',
                showAuthor: true,
            },
            editorState: true,
        });

        mount(<QuoteBlockWithStubs />);
        cy.get(QuoteBlockContent).contains('Space is cool!');
        cy.get(QuoteBlockAuthor).should('exist').contains('James Webb');
    });

    it('writes content to a quote block', () => {
        const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, { editorState: true });

        mount(<QuoteBlockWithStubs />);
        cy.get(QuoteBlockContent).find('[contenteditable=true]').type('This is a quote.').blur();
        cy.get(QuoteBlockContent).find('[contenteditable=true]').contains('This is a quote.');
    });

    it('renders a quote block with correct styling', () => {
        const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
            blockSettings: {
                sizeChoice: QuoteSize.LargeSize,
                quotesColor: EXAMPLE_COLOR,
                isCustomQuotesColor: true,
            },
        });

        mount(<QuoteBlockWithStubs />);
        cy.get(QuoteBlockSelector).find('svg').should('have.css', 'width', '32px');
        cy.get(QuoteBlockSelector).find('svg').should('have.css', 'height', '32px');
        cy.get(QuoteBlockSelector).find('svg').should('have.css', 'color', 'rgb(22, 181, 181)');
    });

    describe('custom icons', () => {
        it('renders a quote block with custom icons', () => {
            const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
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

            mount(<QuoteBlockWithStubs />);
            cy.get(QuoteBlockSelector).find('svg').should('not.exist');
            cy.get(QuoteBlockSelector).find('img').should('have.length', 2);
            cy.get(QuoteBlockSelector).find('img').first().should('have.css', 'width', '32px');
            cy.get(QuoteBlockSelector).find('img').first().should('have.css', 'height', '32px');
            cy.get(QuoteBlockSelector).find('img').first().should('have.css', 'color', 'rgb(22, 181, 181)');
        });

        it('renders a quote block without custom icons', () => {
            const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
                blockSettings: {
                    isCustomQuoteStyleLeft: true,
                    isCustomQuoteStyleRight: true,
                },
            });

            mount(<QuoteBlockWithStubs />);
            cy.get(QuoteBlockSelector).find('svg').should('not.exist');
            cy.get(QuoteBlockSelector).find('img').should('not.exist');
        });

        it(' renders a quote block with one custom and one default icon', () => {
            const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
                blockSettings: {
                    isCustomQuoteStyleLeft: true,
                    quoteStyleRight: QuoteStyle.HookBracketRight,
                },
                blockAssets: {
                    [CUSTOM_QUOTE_STYLE_LEFT_ID]: [AssetDummy.with(342)],
                },
            });

            mount(<QuoteBlockWithStubs />);
            cy.get(QuoteBlockSelector).find('svg').should('have.length', 1);
            cy.get(QuoteBlockSelector).find('img').should('have.length', 1);
        });
    });

    describe('alignments', () => {
        it('renders a quote block with left alignment', () => {
            const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
                blockSettings: {
                    textAlignment: TextAlignment.Left,
                },
            });

            mount(<QuoteBlockWithStubs />);
            cy.get(QuoteBlockAuthor).children().first().should('have.class', 'tw-text-left');
        });

        it('renders a quote block with center alignment', () => {
            const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
                blockSettings: {
                    textAlignment: TextAlignment.Center,
                },
            });

            mount(<QuoteBlockWithStubs />);
            cy.get(QuoteBlockAuthor).children().first().should('have.class', 'tw-text-center');
        });

        it('renders a quote block with right alignment', () => {
            const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
                blockSettings: {
                    textAlignment: TextAlignment.Right,
                },
            });

            mount(<QuoteBlockWithStubs />);
            cy.get(QuoteBlockAuthor).children().first().should('have.class', 'tw-text-right');
        });
    });

    describe('quotationMarksAnchoring', () => {
        it('renders a quote block with quotation marks hugText', () => {
            const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
                blockSettings: {
                    quotationMarksAnchoring: QuotationMarksAnchoring.HugText,
                },
            });

            mount(<QuoteBlockWithStubs />);
            cy.get(QuoteBlockSelector).children().first().should('not.have.class', 'tw-justify-between');
        });

        it('renders a quote block with quotation marks fullWidth', () => {
            const [QuoteBlockWithStubs] = withAppBridgeBlockStubs(QuoteBlock, {
                blockSettings: {
                    quotationMarksAnchoring: QuotationMarksAnchoring.FullWidth,
                },
            });

            mount(<QuoteBlockWithStubs />);
            cy.get(QuoteBlockSelector).children().first().should('have.class', 'tw-justify-between');
        });
    });
});
