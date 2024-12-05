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
import { type QuoteStyle } from './types';
import { CustomIcon } from './CustomIcon';
import { Asset } from '@frontify/app-bridge';

export const ICON_CLASS_NAME = 'tw-flex tw-items-center tw-justify-center tw-fill-current';

export const quoteIconMap = (
    size: string,
    color: string,
    customIcon: Asset | undefined
): Record<QuoteStyle, ReactElement | null> => {
    const style: CSSProperties = {
        color,
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
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
        None: null,
        Custom: <CustomIcon customIcon={customIcon} style={style} />,
    };
};

export const textAlignmentClassNames: Record<string, string> = {
    left: 'tw-text-left',
    right: 'tw-text-right',
    center: 'tw-text-center',
};

export const flexBoxAlignmentClassNames: Record<string, string> = {
    left: 'tw-justify-start',
    right: 'tw-justify-end',
    center: 'tw-justify-center',
};
