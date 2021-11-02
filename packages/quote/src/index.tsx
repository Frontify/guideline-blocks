import { AppBridgeNative, useEditorState } from '@frontify/app-bridge';
import { useBlockSettings } from '@frontify/app-bridge/react';
import '@frontify/arcade/style';
import { ChangeEvent, FC } from 'react';
import 'tailwindcss/tailwind.css';
import { Quotes } from './quotes';
import { LineType, LineWidth, QuoteSize, QuoteStyle, QuoteType } from './types';

type Props = {
    appBridge: AppBridgeNative;
};

type Settings = {
    type?: QuoteType;
    quoteStyle?: QuoteStyle;
    showAuthor: boolean;
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

const quoteStyles: Record<'left' | 'right', Record<QuoteStyle, string>> = {
    left: {
        [QuoteStyle.GermanMarks]: 'tw-mt-auto',
        [QuoteStyle.EnglishMarks]: 'tw-mb-auto tw-transform tw-rotate-180',
    },
    right: {
        [QuoteStyle.GermanMarks]: 'tw-mb-auto tw-transform tw-rotate-180',
        [QuoteStyle.EnglishMarks]: 'tw-mt-auto',
    },
};

const QuoteBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState();

    const {
        //TODO: if(showAuthor) display author beneath the quote
        showAuthor = false,
        type = QuoteType.QuotationMarks,
        quoteStyle = QuoteStyle.GermanMarks,
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
                    <div className={quoteStyles.left[quoteStyle]} style={{ color }}>
                        <Quotes size={size} />
                    </div>
                    {isEditing ? (
                        <textarea
                            className="tw-flex-1"
                            placeholder="Add your quote text here"
                            value={content}
                            onChange={onChangeContent}
                        />
                    ) : (
                        <p className="tw-flex-1">{content}</p>
                    )}
                    <div className={quoteStyles.right[quoteStyle]} style={{ color }}>
                        <Quotes size={size} />
                    </div>
                </div>
            )}
            {type === QuoteType.QuotationMarks &&
                (isEditing ? (
                    <textarea
                        className={borderClassNames}
                        style={borderStyles}
                        placeholder={placeholder}
                        value={content}
                        onChange={onChangeContent}
                    />
                ) : (
                    <p className={borderClassNames} style={borderStyles}>
                        {content || placeholder}
                    </p>
                ))}
        </>
    );
};

export default QuoteBlock;
