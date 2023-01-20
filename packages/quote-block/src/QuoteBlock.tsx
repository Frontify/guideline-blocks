/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    BoldPlugin,
    InitPlugin,
    ItalicPlugin,
    PluginComposer,
    RichTextEditor,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    merge,
} from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { toRgbaString, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { QuoteBlockIcon } from './QuoteBlockIcon';
import { CUSTOM_QUOTE_STYLE_LEFT_ID, CUSTOM_QUOTE_STYLE_RIGHT_ID, DEFAULT_COLOR_VALUE } from './settings';
import { LineType, QuotationMarksAnchoring, QuoteSize, QuoteStyle, QuoteType, Settings, quoteSizeMap } from './types';
import { flexBoxAlignmentClassNames, textAlignmentClassNames } from './utilities';

const customPlugins = new PluginComposer();
customPlugins
    .setPlugin([new InitPlugin(), new TextStylePlugin()])
    .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()]);

const DEFAULT_CONTENT_VALUE = '[{"type":"quote","children":[{"text":""}]}]';

export const QuoteBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const { blockAssets } = useBlockAssets(appBridge);

    const isQuotationMarkType = blockSettings.type !== QuoteType.Indentation;
    const isFullWidth =
        blockSettings.quotationMarksAnchoring !== QuotationMarksAnchoring.HugText && isQuotationMarkType;
    const textAlignment = !isQuotationMarkType ? 'left' : blockSettings.textAlignment ?? 'left';

    const iconColor = blockSettings.isCustomQuotesColor
        ? toRgbaString(blockSettings.quotesColor ?? DEFAULT_COLOR_VALUE)
        : designTokens?.quote?.color ?? toRgbaString(DEFAULT_COLOR_VALUE);

    const accentLineColor = blockSettings.isCustomLineColor
        ? toRgbaString(blockSettings.accentLineColor ?? DEFAULT_COLOR_VALUE)
        : designTokens?.quote?.color ?? toRgbaString(DEFAULT_COLOR_VALUE);

    const borderStyles = blockSettings.showAccentLine
        ? {
              borderLeftStyle: blockSettings.lineType ?? LineType.Solid,
              borderLeftWidth: blockSettings.lineWidthValue ?? '2px',
              borderLeftColor: accentLineColor,
          }
        : undefined;

    const accentLineClassName = blockSettings.showAccentLine ? 'tw-pl-7' : 'tw-ml-7';
    const showAuthor = blockSettings.showAuthor && blockSettings.authorName;
    const sizeValue = blockSettings.sizeValue || quoteSizeMap[QuoteSize.LargeSize];

    const onChangeContent = (value: string) => value !== blockSettings.content && setBlockSettings({ content: value });

    const getWrapperClasses = () => {
        if (isFullWidth) {
            return 'tw-flex tw-justify-between tw-gap-x-7';
        }
        if (!isFullWidth) {
            return merge(['tw-flex tw-gap-x-7', flexBoxAlignmentClassNames[textAlignment]]);
        }
        return '';
    };

    return (
        <div data-test-id="quote-block" className={isEditing ? '' : 'tw-text-text'}>
            <div className={getWrapperClasses()}>
                {isQuotationMarkType && (
                    <QuoteBlockIcon
                        color={iconColor}
                        blockAssets={blockAssets}
                        isCustomSize={blockSettings.isCustomSize}
                        sizeValue={sizeValue}
                        sizeChoice={blockSettings.sizeChoice}
                        customIconId={CUSTOM_QUOTE_STYLE_LEFT_ID}
                        quoteStyle={
                            blockSettings.isCustomQuoteStyleLeft
                                ? QuoteStyle.Custom
                                : blockSettings.quoteStyleLeft ?? QuoteStyle.DoubleUp
                        }
                        isCustomQuoteStyle={blockSettings.isCustomQuoteStyleLeft}
                    />
                )}

                <div
                    data-test-id="quote-block-author"
                    className={isFullWidth && isQuotationMarkType ? 'tw-flex-1 tw-w-full' : 'tw-min-w-[1rem]'}
                >
                    <div
                        style={isQuotationMarkType ? {} : borderStyles}
                        className={merge([
                            isQuotationMarkType ? '' : accentLineClassName,
                            textAlignmentClassNames[textAlignment],
                        ])}
                    >
                        <RichTextEditor
                            id={appBridge.getBlockId().toString()}
                            designTokens={designTokens ?? undefined}
                            placeholder={isEditing ? 'Add your quote text here' : undefined}
                            value={blockSettings.content ?? DEFAULT_CONTENT_VALUE}
                            onTextChange={onChangeContent}
                            onBlur={onChangeContent}
                            plugins={customPlugins}
                            readonly={!isEditing}
                        />
                    </div>
                    {showAuthor && <p className="tw-text-right">{`- ${blockSettings.authorName}`}</p>}
                </div>
                {isQuotationMarkType && (
                    <QuoteBlockIcon
                        color={iconColor}
                        blockAssets={blockAssets}
                        isCustomSize={blockSettings.isCustomSize}
                        sizeValue={sizeValue}
                        sizeChoice={blockSettings.sizeChoice}
                        customIconId={CUSTOM_QUOTE_STYLE_RIGHT_ID}
                        quoteStyle={
                            blockSettings.isCustomQuoteStyleRight
                                ? QuoteStyle.Custom
                                : blockSettings.quoteStyleRight ?? QuoteStyle.None
                        }
                        isCustomQuoteStyle={blockSettings.isCustomQuoteStyleRight}
                    />
                )}
            </div>
        </div>
    );
};
