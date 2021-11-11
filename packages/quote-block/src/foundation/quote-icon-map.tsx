import { ReactNode } from 'react';
import { QuoteSize, QuoteStyle } from '../types';
import IconDoubleChevronLeft from './IconDoubleChevronLeft';
import IconDoubleQuotes from './IconDoubleQuote';
import IconHookBracketLeft from './IconHookBracketLeft';
import IconNone from './IconNone';
import IconSingleChevronLeft from './IconSingleChevronLeft';
import IconSingleQuotes from './IconSingleQuote';

export const QuoteIconMap = (size: QuoteSize | string): Record<QuoteStyle, ReactNode> => {
    const rotateClass = 'tw-transform tw-rotate-180';

    return {
        DoubleDown: <IconDoubleQuotes size={size} />,
        SingleDown: <IconSingleQuotes size={size} />,
        DoubleChevronLeft: <IconDoubleChevronLeft size={size} />,
        SingleChevronLeft: <IconSingleChevronLeft size={size} />,
        HookBracketLeft: <IconHookBracketLeft size={size} />,
        DoubleUp: (
            <div className={rotateClass}>
                <IconDoubleQuotes size={size} />
            </div>
        ),
        SingleUp: (
            <div className={rotateClass}>
                <IconSingleQuotes size={size} />
            </div>
        ),
        DoubleChevronRight: (
            <div className={rotateClass}>
                <IconDoubleChevronLeft size={size} />
            </div>
        ),
        SingleChevronRight: (
            <div className={rotateClass}>
                <IconSingleChevronLeft size={size} />
            </div>
        ),
        HookBracketRight: (
            <div className={rotateClass}>
                <IconHookBracketLeft size={size} />
            </div>
        ),
        None: <IconNone size={size} />,
    };
};
