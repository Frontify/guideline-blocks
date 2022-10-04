/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { EditorActions, RichTextEditor, merge } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { toRgbaString, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { Quotations } from './Quotations';
import { DEFAULT_COLOR_VALUE } from './settings';
import { LineType, Props, QuotationMarksAnchoring, QuoteType, Settings } from './types';
import { textAlignmentClassNames } from './utilities';

const ACTIONS = [
    [EditorActions.TEXT_STYLES],
    [EditorActions.BOLD, EditorActions.ITALIC, EditorActions.UNDERLINE, EditorActions.STRIKETHROUGH],
];

const DEFAULT_CONTENT_VALUE = '[{"type":"quote","children":[{"text":""}]}]';

export const QuoteBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const { blockAssets } = useBlockAssets(appBridge);

    const isQuotationMarkType = blockSettings.type !== QuoteType.Indentation;
    const isFullWidth = blockSettings.quotationMarksAnchoring !== QuotationMarksAnchoring.HugText;
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
            <Quotations
                textAlignment={blockSettings.textAlignment}
                isFullWidth={isFullWidth}
                isQuotationMarkType={isQuotationMarkType}
                blockAssets={blockAssets}
                color={blockSettings.quotesColor}
                isCustomSize={blockSettings.isCustomSize}
                sizeValue={blockSettings.sizeValue}
                sizeChoice={blockSettings.sizeChoice}
                quoteStyleLeft={blockSettings.quoteStyleLeft}
                quoteStyleRight={blockSettings.quoteStyleRight}
            >
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
                            id={appBridge.getBlockId().toString()}
                            designTokens={designTokens ?? undefined}
                            placeholder="Add your quote text here"
                            value={blockSettings.content ?? DEFAULT_CONTENT_VALUE}
                            onTextChange={onChangeContent}
                            actions={ACTIONS}
                            readonly={!isEditing}
                        />
                    </div>
                    {showAuthor && <p className="tw-text-right">{`- ${blockSettings.authorName}`}</p>}
                </div>
            </Quotations>
        </div>
    );
};
