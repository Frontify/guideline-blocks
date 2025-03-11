/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    AutoformatPlugin,
    BoldPlugin,
    ItalicPlugin,
    PluginComposer,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    merge,
} from '@frontify/fondue';

import {
    AllTextStylePlugins,
    BlockProps,
    RichTextEditor,
    THEME_PREFIX,
    TextStyles,
    convertToRteValue,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import { FC, useEffect } from 'react';

import { QuoteBlockIcon } from './QuoteBlockIcon';
import { CUSTOM_QUOTE_STYLE_LEFT_ID, CUSTOM_QUOTE_STYLE_RIGHT_ID, DEFAULT_COLOR_VALUE } from './settings';
import { LineType, QuotationMarksAnchoring, QuoteSize, QuoteStyle, QuoteType, Settings, quoteSizeMap } from './types';
import { flexBoxAlignmentClassNames, textAlignmentClassNames } from './utilities';
import { StyleProvider } from '@frontify/guideline-blocks-shared';

const customPlugins = new PluginComposer();
customPlugins
    .setPlugin([new TextStylePlugin({ textStyles: AllTextStylePlugins })])
    .setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new AutoformatPlugin(),
    ]);

export const QuoteBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const { blockAssets, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const customLeftIcon = blockAssets?.[CUSTOM_QUOTE_STYLE_LEFT_ID]?.[0];
    const customRightIcon = blockAssets?.[CUSTOM_QUOTE_STYLE_RIGHT_ID]?.[0];

    useEffect(() => {
        if (!isEditing) {
            return;
        }
        if (!blockSettings.isCustomQuoteStyleRight && customRightIcon) {
            deleteAssetIdsFromKey(CUSTOM_QUOTE_STYLE_RIGHT_ID, [customRightIcon.id]);
        }
        if (!blockSettings.isCustomQuoteStyleLeft && customLeftIcon) {
            deleteAssetIdsFromKey(CUSTOM_QUOTE_STYLE_LEFT_ID, [customLeftIcon.id]);
        }
    }, [
        blockSettings.isCustomQuoteStyleLeft,
        blockSettings.isCustomQuoteStyleRight,
        customRightIcon,
        customLeftIcon,
        deleteAssetIdsFromKey,
        isEditing,
    ]);

    const isQuotationMarkType = blockSettings.type !== QuoteType.Indentation;
    const isFullWidth =
        blockSettings.quotationMarksAnchoring !== QuotationMarksAnchoring.HugText && isQuotationMarkType;
    const textAlignment = !isQuotationMarkType ? 'left' : (blockSettings.textAlignment ?? 'left');

    const themeStyle = getComputedStyle(document.body);
    const iconColor = blockSettings.isCustomQuotesColor
        ? toRgbaString(blockSettings.quotesColor ?? DEFAULT_COLOR_VALUE)
        : (themeStyle.getPropertyValue(`${THEME_PREFIX}quote-color`) ?? toRgbaString(DEFAULT_COLOR_VALUE));

    const accentLineColor = blockSettings.isCustomLineColor
        ? toRgbaString(blockSettings.accentLineColor ?? DEFAULT_COLOR_VALUE)
        : (themeStyle.getPropertyValue(`${THEME_PREFIX}quote-color`) ?? toRgbaString(DEFAULT_COLOR_VALUE));

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
        <div className="quote-block">
            <StyleProvider>
                <div data-test-id="quote-block" className={isEditing ? '' : 'tw-text-text'}>
                    <div className={getWrapperClasses()}>
                        {isQuotationMarkType && (
                            <QuoteBlockIcon
                                color={iconColor}
                                isCustomSize={blockSettings.isCustomSize}
                                sizeValue={sizeValue}
                                sizeChoice={blockSettings.sizeChoice}
                                customIcon={customLeftIcon}
                                quoteStyle={
                                    blockSettings.isCustomQuoteStyleLeft
                                        ? QuoteStyle.Custom
                                        : (blockSettings.quoteStyleLeft ?? QuoteStyle.DoubleUp)
                                }
                            />
                        )}

                        <div
                            data-test-id="quote-block-author"
                            className={
                                isFullWidth && isQuotationMarkType
                                    ? 'tw-flex-1 tw-w-full tw-overflow-hidden'
                                    : 'tw-min-w-[1rem]'
                            }
                        >
                            <div
                                style={isQuotationMarkType ? {} : borderStyles}
                                className={merge([
                                    isQuotationMarkType ? '' : accentLineClassName,
                                    textAlignmentClassNames[textAlignment],
                                    '[&>div]:!tw-@container-normal',
                                ])}
                            >
                                <RichTextEditor
                                    id={String(appBridge.context('blockId').get())}
                                    placeholder={isEditing ? 'Add your quote text here' : undefined}
                                    value={blockSettings.content ?? convertToRteValue(TextStyles.quote)}
                                    onTextChange={onChangeContent}
                                    plugins={customPlugins}
                                    isEditing={isEditing}
                                />
                            </div>
                            {showAuthor && (
                                <p
                                    className="tw-text-right tw-break-all"
                                    style={{
                                        color: `var(${THEME_PREFIX}body-color)`,
                                    }}
                                >{`- ${blockSettings.authorName}`}</p>
                            )}
                        </div>
                        {isQuotationMarkType && (
                            <QuoteBlockIcon
                                color={iconColor}
                                isCustomSize={blockSettings.isCustomSize}
                                sizeValue={sizeValue}
                                sizeChoice={blockSettings.sizeChoice}
                                customIcon={customRightIcon}
                                quoteStyle={
                                    blockSettings.isCustomQuoteStyleRight
                                        ? QuoteStyle.Custom
                                        : (blockSettings.quoteStyleRight ?? QuoteStyle.None)
                                }
                            />
                        )}
                    </div>
                </div>
            </StyleProvider>
        </div>
    );
};
