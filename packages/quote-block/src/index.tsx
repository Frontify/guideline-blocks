/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/arcade';
import '@frontify/arcade/style';
import { mapRgbaToString } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { DEFAULT_AUTHOR_NAME, DEFAULT_COLOR_VALUE } from './settings';
import {
    ContentWithAuthorProps,
    LineType,
    LineWidth,
    lineWidthMap,
    Props,
    QuoteSize,
    quoteSizeMap,
    QuoteStyle,
    QuoteType,
    Settings,
} from './types';
import { quoteIconMap } from './utilities';

const ContentWithAuthor: FC<ContentWithAuthorProps> = ({ showAuthor, authorName, children }) => (
    <div className="tw-flex-1 tw-w-full">
        {children}
        {showAuthor && authorName && <p className="tw-text-right">{`- ${authorName}`}</p>}
    </div>
);

const QuoteBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState();

    const {
        showAuthor = false,
        authorName = DEFAULT_AUTHOR_NAME,
        type = QuoteType.QuotationMarks,
        quoteStyleLeft = QuoteStyle.DoubleUp,
        quoteStyleRight = QuoteStyle.DoubleDown,
        isCustomSize = false,
        sizeValue = '',
        sizeChoice = QuoteSize.SmallSize,
        showAccentLine = true,
        lineType = LineType.Solid,
        isCustomLineWidth = false,
        lineWidthValue = '',
        lineWidthChoice = LineWidth.SmallWidth,
        accentLinecolor = DEFAULT_COLOR_VALUE,
        quotesColor = DEFAULT_COLOR_VALUE,
        content = '',
    } = blockSettings;

    const placeholder = 'Add your quote text here';
    const size = isCustomSize ? sizeValue : quoteSizeMap[sizeChoice];
    const quotesRgba = quotesColor.rgba ? mapRgbaToString(quotesColor.rgba) : quotesColor.hex;
    const borderRgba = accentLinecolor.rgba ? mapRgbaToString(accentLinecolor.rgba) : accentLinecolor.hex;
    const borderStyles = showAccentLine
        ? {
              borderLeftStyle: lineType,
              borderLeftWidth: isCustomLineWidth ? lineWidthValue : lineWidthMap[lineWidthChoice],
              borderLeftColor: borderRgba,
          }
        : {};

    const onChangeContent = (value: string) => setBlockSettings({ ...blockSettings, content: value });

    return (
        <div data-test-id="quote-block" className={isEditing ? '' : 'tw-text-black'}>
            {type === QuoteType.QuotationMarks && (
                <div className="tw-flex tw-justify-between tw-gap-x-7">
                    {quoteIconMap(size, quotesRgba)[quoteStyleLeft]}
                    <ContentWithAuthor showAuthor={showAuthor} authorName={authorName}>
                        <RichTextEditor
                            placeholder={placeholder}
                            value={content}
                            onTextChange={onChangeContent}
                            readonly={!isEditing}
                        />
                    </ContentWithAuthor>
                    {quoteIconMap(size, quotesRgba)[quoteStyleRight]}
                </div>
            )}

            {type === QuoteType.Indentation && (
                <ContentWithAuthor showAuthor={showAuthor} authorName={authorName}>
                    <div style={borderStyles} className={showAccentLine ? 'tw-pl-7' : 'tw-ml-7'}>
                        <RichTextEditor
                            placeholder={placeholder}
                            value={content}
                            onTextChange={onChangeContent}
                            readonly={!isEditing}
                        />
                    </div>
                </ContentWithAuthor>
            )}
        </div>
    );
};

export default QuoteBlock;
