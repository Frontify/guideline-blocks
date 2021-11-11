import { AppBridgeNative, useEditorState } from '@frontify/app-bridge';
import { useBlockSettings } from '@frontify/app-bridge/react';
import '@frontify/arcade/style';
import { ChangeEvent, FC } from 'react';
import 'tailwindcss/tailwind.css';
import { QuoteIconMap } from './foundation/quote-icon-map';
import { LineType, LineWidth, QuoteSize, QuoteStyle, QuoteType } from './types';

type Props = {
    appBridge: AppBridgeNative;
};

type Settings = {
    type?: QuoteType;
    quoteStyleLeft?: QuoteStyle;
    quoteStyleRight?: QuoteStyle;
    showAuthor: boolean;
    authorName: string;
    isCustomSize?: boolean;
    sizeValue?: string;
    sizeChoice?: QuoteSize;
    showAccentLine?: boolean;
    lineType?: LineType;
    isCustomLineWidth?: boolean;
    lineWidthValue?: string;
    lineWidthChoice?: LineWidth;
    color?: string;
    content?: string;
};

type ContentWithAuthorProps = {
    showAuthor: boolean;
    authorName: string;
};

const ContentWithAuthor: FC<ContentWithAuthorProps> = ({ showAuthor, authorName, children }) => (
    <div className="tw-flex-1">
        {children}
        {showAuthor && authorName && <p className="tw-text-right">{`- ${authorName}`}</p>}
    </div>
);

const QuoteBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState();
    const {
        showAuthor = false,
        authorName = '',
        type = QuoteType.QuotationMarks,
        quoteStyleLeft = QuoteStyle.DoubleUp,
        quoteStyleRight = QuoteStyle.DoubleDown,
        isCustomSize = false,
        sizeValue = '',
        sizeChoice = QuoteSize.Small,
        showAccentLine = false,
        lineType = LineType.Solid,
        isCustomLineWidth = false,
        lineWidthValue = '',
        lineWidthChoice = LineWidth.Small,
        color = '',
        content = '',
    }: Settings = blockSettings;

    const borderClassNames = ['tw-w-full', showAccentLine ? 'tw-pl-7' : 'tw-ml-7'].join(' ');
    const placeholder = 'Add your quote text here';
    const size = isCustomSize ? sizeValue : sizeChoice;
    const borderStyles = showAccentLine
        ? {
              borderLeftStyle: lineType,
              borderLeftWidth: isCustomLineWidth ? lineWidthValue : lineWidthChoice,
              borderLeftColor: color,
          }
        : {};

    const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) =>
        setBlockSettings({ ...blockSettings, content: event.target.value });

    return (
        <>
            {type === QuoteType.QuotationMarks && (
                <div className="tw-flex tw-justify-between tw-items-center tw-gap-x-7">
                    {QuoteIconMap(size)[quoteStyleLeft]}

                    {isEditing ? (
                        <ContentWithAuthor showAuthor={showAuthor} authorName={authorName}>
                            <textarea
                                className="tw-w-full"
                                placeholder={placeholder}
                                value={content}
                                onChange={onChangeContent}
                            />
                        </ContentWithAuthor>
                    ) : (
                        <ContentWithAuthor showAuthor={showAuthor} authorName={authorName}>
                            <p className="tw-w-full">{content || placeholder}</p>
                        </ContentWithAuthor>
                    )}

                    {QuoteIconMap(size)[quoteStyleRight]}
                </div>
            )}

            {type === QuoteType.Indentation &&
                (isEditing ? (
                    <ContentWithAuthor showAuthor={showAuthor} authorName={authorName}>
                        <textarea
                            className={borderClassNames}
                            style={borderStyles}
                            placeholder={placeholder}
                            value={content}
                            onChange={onChangeContent}
                        />
                    </ContentWithAuthor>
                ) : (
                    <ContentWithAuthor showAuthor={showAuthor} authorName={authorName}>
                        <p className={borderClassNames} style={borderStyles}>
                            {content || placeholder}
                        </p>
                    </ContentWithAuthor>
                ))}
        </>
    );
};

export default QuoteBlock;
