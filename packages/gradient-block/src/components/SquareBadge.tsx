/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SquareBadgeProps } from '../types';
import { IconCheckMark16, IconClipboard16, useCopy } from '@frontify/fondue';
import { toHexString } from '@frontify/guideline-blocks-shared';

export const SquareBadge = ({ index, lastIndex, gradientColor }: SquareBadgeProps) => {
    const { copy, status } = useCopy();
    const isCopied = status === 'success';

    const position = () => {
        if (index === 0) {
            return { left: 0 };
        }
        if (index === lastIndex) {
            return { right: 0 };
        }
        return { left: `${gradientColor.position}%` };
    };

    return (
        <div className="tw-absolute" style={position()}>
            <div className="tw-flex tw-items-center tw-h-5 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded tw-group">
                <div
                    className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded tw-ml-[1px]"
                    style={{
                        backgroundColor: toHexString(gradientColor.color),
                    }}
                ></div>
                <span className="tw-text-weak tw-pl-[5px] tw-pr-[5px] tw-text-xs">
                    <strong>{gradientColor.color?.name}</strong>
                </span>
                <span className="tw-text-x-weak tw-text-xs tw-pr-[5px]">{toHexString(gradientColor.color)}</span>
                <button
                    data-test-id="gradient-css-copy-button"
                    className="tw-inline-flex tw-pr-[4px] tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex"
                    onClick={() => copy(toHexString(gradientColor.color))}
                >
                    {isCopied ? <IconCheckMark16 /> : <IconClipboard16 />}
                </button>
            </div>
        </div>
    );
};
