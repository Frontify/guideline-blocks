import { AppBridgeNative } from '@frontify/app-bridge';
import { useBlockSettings } from '@frontify/app-bridge/react';
import '@frontify/arcade/style';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { AssetStyle, LineType, LineWidth, QuoteSize, QuoteType } from './types';

type Props = {
    appBridge: AppBridgeNative;
};

type Settings = {
    type: QuoteType;
    quoteAsset?: AssetStyle;
    showAuthor: boolean;
    isCustomSize?: boolean;
    sizeValue?: string;
    sizeChoice?: QuoteSize;
    showAccentLine?: boolean;
    lineType?: LineType;
    isCustomLineWidth?: boolean;
    lineWidthValue?: string;
    lineWidthChoice?: LineWidth;
    color: string;
};

const QuoteBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        type = QuoteType.QuotationMarks,
        quoteAsset = AssetStyle.GermanMarks,
        showAuthor = false,
        isCustomSize = false,
        sizeValue = '',
        sizeChoice = QuoteSize.Small,
        showAccentLine = false,
        lineType = LineType.Solid,
        isCustomLineWidth = false,
        lineWidthValue = '',
        lineWidthChoice = LineWidth.Small,
        color = '',
    } = blockSettings;

    return (
        <div>
            <textarea className="tw-w-full" />
        </div>
    );
};

export default QuoteBlock;
