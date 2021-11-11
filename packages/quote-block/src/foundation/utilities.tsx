import { QuoteSize } from '../types';

export const ICON_CLASS_NAME = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
export const DEFAULT_ICON_SIZE = '16px';

export type IconProps = {
    size: QuoteSize | string;
};

export const mapQuoteSizeToIconSize: Record<QuoteSize, string> = {
    [QuoteSize.Small]: '16px',
    [QuoteSize.Medium]: '24px',
    [QuoteSize.Large]: '32px',
};

export const getIconSize = (size?: QuoteSize | string): string => {
    if (!size) {
        return DEFAULT_ICON_SIZE;
    }

    if (typeof size === 'string') {
        return size;
    }

    return mapQuoteSizeToIconSize[size];
};
