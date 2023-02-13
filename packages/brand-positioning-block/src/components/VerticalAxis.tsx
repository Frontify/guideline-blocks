/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { AxisProps } from '../types';

export const VerticalAxis = ({}: AxisProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    return (
        <div
            style={designTokens?.imageCaption}
            className="tw-flex tw-h-full tw-flex-col tw-gap-3 tw-items-center tw-whitespace-nowrap"
        >
            <div>High price</div>
            <div className="tw-w-[1px] tw-h-full tw-bg-line" />
            <div>Low price</div>
        </div>
    );
};
