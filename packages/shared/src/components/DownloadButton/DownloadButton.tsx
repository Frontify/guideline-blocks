/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DownloadButtonProps } from './types';
import { IconArrowCircleDown16 } from '@frontify/fondue';

export const DownloadButton = ({ onDownload }: DownloadButtonProps) => {
    return (
        <button
            data-test-id="download-button"
            onClick={onDownload}
            className="tw-rounded-full tw-mb-auto tw-bg-box-neutral-strong-inverse hover:tw-bg-box-neutral-strong-inverse-hover active:tw-bg-box-neutral-strong-inverse-pressed  tw-text-box-neutral-strong tw-outline tw-outline-1 tw-outline-offset-[1px] tw-p-1.5 tw-outline-line"
        >
            <IconArrowCircleDown16 />
        </button>
    );
};
