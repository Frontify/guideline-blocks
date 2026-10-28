/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetFixture, type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { CUSTOM_QUOTE_STYLE_LEFT_ID } from './settings';
import { LineType, QuoteSize, QuoteStyle, QuoteType, TextAlignment } from './types';

import definition from './index';

export default { title: 'Blocks/Quote', ...blockMeta(definition) };

const content = JSON.stringify([
    {
        type: 'quote',
        children: [{ text: 'Design is not just what it looks like and feels like. Design is how it works.' }],
    },
]);

export const Empty: BlockStory = {};

export const QuotationMarks: BlockStory = {
    args: { content, quoteStyleRight: QuoteStyle.DoubleDown, showAuthor: true, authorName: 'Steve Jobs' },
};

export const CenteredChevrons: BlockStory = {
    args: {
        content,
        textAlignment: TextAlignment.Center,
        quoteStyleLeft: QuoteStyle.DoubleChevronLeft,
        quoteStyleRight: QuoteStyle.DoubleChevronRight,
        sizeChoice: QuoteSize.MediumSize,
        isCustomQuotesColor: true,
        quotesColor: { red: 79, green: 70, blue: 229, alpha: 1 },
    },
};

export const IndentationAccentLine: BlockStory = {
    args: {
        content,
        type: QuoteType.Indentation,
        lineType: LineType.Dashed,
        lineWidthValue: '4px',
        isCustomLineColor: true,
        accentLineColor: { red: 219, green: 39, blue: 119, alpha: 1 },
        showAuthor: true,
        authorName: 'Steve Jobs',
    },
};

export const CustomIcon: BlockStory = {
    args: { content, isCustomQuoteStyleLeft: true },
    parameters: { appBridge: { blockAssets: { [CUSTOM_QUOTE_STYLE_LEFT_ID]: [AssetFixture.quoteIcon()] } } },
};
