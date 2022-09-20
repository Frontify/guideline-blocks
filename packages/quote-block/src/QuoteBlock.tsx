/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { EditorActions, merge, RichTextEditor } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { toRgbaString, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { QuoteBlockIcon } from './QuoteBlockIcon';
import { CUSTOM_ICON_LEFT_ID, CUSTOM_ICON_RIGHT_ID, DEFAULT_COLOR_VALUE } from './settings';
import { LineType, Props, QuotationMarksAnchoring, QuoteStyle, QuoteType, Settings } from './types';
import { flexBoxAlignmentClassNames, textAlignmentClassNames } from './utilities';

const ACTIONS = [
    [EditorActions.TEXT_STYLES],
    [EditorActions.BOLD, EditorActions.ITALIC, EditorActions.UNDERLINE, EditorActions.STRIKETHROUGH],
];

export const QuoteBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const isQuotationMarkType = blockSettings.type !== QuoteType.Indentation;
    const isFullWidth = blockSettings.quotationMarksAnchoring === QuotationMarksAnchoring.FullWidth;
    const borderRgba = toRgbaString(blockSettings.accentLinecolor ?? DEFAULT_COLOR_VALUE);
    const borderStyles = blockSettings.showAccentLine
        ? {
              borderLeftStyle: blockSettings.lineType ?? LineType.Solid,
              borderLeftWidth: blockSettings.lineWidthValue ?? '2px',
              borderLeftColor: borderRgba,
          }
        : undefined;

    const accentLineClassName = blockSettings.showAccentLine ? 'tw-pl-7' : 'tw-ml-7';
    const showAuthor = blockSettings.showAuthor && blockSettings.authorName;

    const onChangeContent = (value: string) => setBlockSettings({ ...blockSettings, content: value });

    return (
        <div data-test-id="quote-block" className={isEditing ? '' : 'tw-text-text'}>
            <div
                className={
                    isQuotationMarkType && isFullWidth
                        ? 'tw-flex tw-justify-between tw-gap-x-7'
                        : isQuotationMarkType && !isFullWidth
                        ? merge([
                              'tw-flex tw-gap-x-7',
                              flexBoxAlignmentClassNames[blockSettings.textAlignment ?? 'left'],
                          ])
                        : ''
                }
            >
                {isQuotationMarkType && (
                    <QuoteBlockIcon
                        customIconId={CUSTOM_ICON_LEFT_ID}
                        appBridge={appBridge}
                        quoteStyle={blockSettings.quoteStyleLeft ?? QuoteStyle.DoubleUp}
                        color={blockSettings.quotesColor}
                        isCustomSize={blockSettings.isCustomSize}
                        sizeValue={blockSettings.sizeValue}
                        sizeChoice={blockSettings.sizeChoice}
                    />
                )}
                <div
                    data-test-id="quote-block-author"
                    className={isFullWidth ? 'tw-flex-1 tw-w-full' : 'tw-min-w-[1rem]'}
                >
                    <div
                        style={isQuotationMarkType ? {} : borderStyles}
                        className={merge([
                            isQuotationMarkType ? '' : accentLineClassName,
                            textAlignmentClassNames[blockSettings.textAlignment ?? 'left'],
                        ])}
                    >
                        <RichTextEditor
                            designTokens={designTokens ?? undefined}
                            placeholder="Add your quote text here"
                            value={blockSettings.content}
                            onTextChange={onChangeContent}
                            actions={ACTIONS}
                            readonly={!isEditing}
                        />
                    </div>
                    {showAuthor && <p className="tw-text-right">{`- ${blockSettings.authorName}`}</p>}
                </div>
                {isQuotationMarkType && (
                    <QuoteBlockIcon
                        customIconId={CUSTOM_ICON_RIGHT_ID}
                        appBridge={appBridge}
                        quoteStyle={blockSettings.quoteStyleRight ?? QuoteStyle.DoubleDown}
                        color={blockSettings.quotesColor}
                        isCustomSize={blockSettings.isCustomSize}
                        sizeValue={blockSettings.sizeValue}
                        sizeChoice={blockSettings.sizeChoice}
                    />
                )}
            </div>
        </div>
    );
};
