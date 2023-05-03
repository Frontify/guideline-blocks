/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DownloadButtonProps } from './types';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE, IconArrowCircleDown16, Tooltip, TooltipPosition } from '@frontify/fondue';
import { joinClassNames } from '../../utilities';

export const DownloadButton = ({ onDownload }: DownloadButtonProps) => {
    const { isFocused, focusProps } = useFocusRing();

    return (
        <Tooltip
            withArrow
            position={TooltipPosition.Top}
            content="Download"
            triggerElement={
                <button
                    tabIndex={0}
                    {...focusProps}
                    className={joinClassNames(['tw-outline-none tw-rounded', isFocused && FOCUS_STYLE])}
                    onClick={onDownload}
                    onPointerDown={(e) => e.preventDefault()}
                >
                    <span
                        data-test-id="download-button"
                        className="tw-flex tw-text-[13px] tw-font-body tw-items-center tw-gap-1 tw-rounded-full tw-bg-box-neutral-strong-inverse hover:tw-bg-box-neutral-strong-inverse-hover active:tw-bg-box-neutral-strong-inverse-pressed tw-text-box-neutral-strong tw-outline tw-outline-1 tw-outline-offset-1 tw-p-1.5 tw-outline-line"
                    >
                        <IconArrowCircleDown16 />
                    </span>
                </button>
            }
        />
    );
};
