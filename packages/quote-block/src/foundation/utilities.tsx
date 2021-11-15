import { CSSProperties, ReactNode } from 'react';
import { QuoteSize, QuoteStyle } from '../types';
import IconDoubleChevronLeft from './IconDoubleChevronLeft';
import IconDoubleChevronRight from './IconDoubleChevronRight';
import IconDoubleQuotesDown from './IconDoubleQuotesDown';
import IconDoubleQuotesUp from './IconDoubleQuotesUp';
import IconHookBracketLeft from './IconHookBracketLeft';
import IconHookBracketRight from './IconHookBracketRight';
import IconNone from './IconNone';
import IconSingleChevronLeft from './IconSingleChevronLeft';
import IconSingleChevronRight from './IconSingleChevronRight';
import IconSingleQuoteDown from './IconSingleQuoteDown';
import IconSingleQuoteUp from './IconSingleQuoteUp';

export const ICON_CLASS_NAME = 'tw-flex tw-items-center tw-justify-center tw-fill-current';

export type IconProps = {
    style: CSSProperties;
};

export const quoteSizeMap: Record<QuoteSize, string> = {
    [QuoteSize.SmallSize]: '16px',
    [QuoteSize.MediumSize]: '24px',
    [QuoteSize.LargeSize]: '32px',
};

export const quoteIconMap = (size: string, color: string): Record<QuoteStyle, ReactNode> => {
    const style: CSSProperties = {
        color,
        width: size,
        height: size,
    };

    return {
        DoubleDown: <IconDoubleQuotesDown style={style} />,
        DoubleUp: <IconDoubleQuotesUp style={style} />,
        SingleDown: <IconSingleQuoteDown style={style} />,
        SingleUp: <IconSingleQuoteUp style={style} />,
        DoubleChevronLeft: <IconDoubleChevronLeft style={style} />,
        DoubleChevronRight: <IconDoubleChevronRight style={style} />,
        SingleChevronLeft: <IconSingleChevronLeft style={style} />,
        SingleChevronRight: <IconSingleChevronRight style={style} />,
        HookBracketLeft: <IconHookBracketLeft style={style} />,
        HookBracketRight: <IconHookBracketRight style={style} />,
        None: <IconNone style={style} />,
    };
};
