import { AppBridgeBlock } from '@frontify/app-bridge';
import { FC } from 'react';
import { QuoteBlockIcon, QuoteBlockIconProps } from './QuoteBlockIcon';
import { CUSTOM_ICON_LEFT_ID, CUSTOM_ICON_RIGHT_ID } from './settings';
import { QuoteStyle, Settings } from './types';

type QuotationProps = {
    hasQuotationMarks: boolean;
    blockSettings: Settings;
    appBridge: AppBridgeBlock;
};

export const Quotations: FC<QuotationProps> = ({ hasQuotationMarks, blockSettings, children, appBridge }) => {
    if (!hasQuotationMarks) {
        return <div>{children}</div>;
    }
    const defaultProps: QuoteBlockIconProps = {
        appBridge,
        color: blockSettings.quotesColor,
        isCustomSize: blockSettings.isCustomSize,
        sizeValue: blockSettings.sizeValue,
        sizeChoice: blockSettings.sizeChoice,
        customIconId: CUSTOM_ICON_LEFT_ID,
        quoteStyle: blockSettings.quoteStyleLeft ?? QuoteStyle.DoubleUp,
    };
    return (
        <div className="tw-flex tw-justify-between tw-gap-x-7">
            <QuoteBlockIcon {...defaultProps} />
            {children}
            <QuoteBlockIcon
                {...defaultProps}
                customIconId={CUSTOM_ICON_RIGHT_ID}
                quoteStyle={blockSettings.quoteStyleRight ?? QuoteStyle.DoubleDown}
            />
        </div>
    );
};
