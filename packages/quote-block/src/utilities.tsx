/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, ReactElement } from 'react';
import { IconDoubleChevronLeft } from './foundation/IconDoubleChevronLeft';
import { IconDoubleChevronRight } from './foundation/IconDoubleChevronRight';
import { IconDoubleQuotesDown } from './foundation/IconDoubleQuotesDown';
import { IconDoubleQuotesUp } from './foundation/IconDoubleQuotesUp';
import { IconHookBracketLeft } from './foundation/IconHookBracketLeft';
import { IconHookBracketRight } from './foundation/IconHookBracketRight';
import { IconSingleChevronLeft } from './foundation/IconSingleChevronLeft';
import { IconSingleChevronRight } from './foundation/IconSingleChevronRight';
import { IconSingleQuoteDown } from './foundation/IconSingleQuoteDown';
import { IconSingleQuoteUp } from './foundation/IconSingleQuoteUp';
import { QuoteStyle } from './types';

export const ICON_CLASS_NAME = 'tw-flex tw-items-center tw-justify-center tw-fill-current';

export const quoteIconMap = (size: string, color: string, customIconUrl?: string): Record<QuoteStyle, ReactElement> => {
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
        None: <></>,
        Custom: customIconUrl ? <img style={style} alt="Quote Icon" src={customIconUrl} /> : <> </>,
    };
};
