/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SquareBadgeProps } from '../types';
import { IconCheckMark16, IconClipboard16, useCopy } from '@frontify/fondue';

export const SquareBadge = ({ index, lastIndex, color }: SquareBadgeProps) => {
    const { copy, status } = useCopy();
    const isCopied = status === 'success';

    const position = () => {
        if (index === 0) {
            return { left: 0 };
        }
        if (index === lastIndex) {
            return { right: 0 };
        }
        return { left: `${color.position}%` };
    };

    return (
        <div className="tw-absolute" style={position()}>
            <div className="tw-flex tw-items-center tw-h-5 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded tw-group">
                <div
                    className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded tw-ml-[1px]"
                    style={{
                        backgroundColor: color.hex,
                    }}
                ></div>
                <span className="tw-text-weak tw-pl-[5px] tw-pr-[5px] tw-text-xs">
                    <strong>{color.name}</strong>
                </span>
                <span className="tw-text-x-weak tw-text-xs tw-pr-[5px]">{color.hex}</span>
                <button
                    data-test-id="gradient-css-copy-button"
                    className="tw-inline-flex tw-pr-[4px] tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex"
                    onClick={() => copy(color.hex)}
                >
                    {isCopied ? <IconCheckMark16 /> : <IconClipboard16 />}
                </button>
            </div>
        </div>
    );
};
