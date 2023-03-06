/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SquareBadgeProps } from '../types';
import { IconCheckMark16, IconClipboard16, useCopy } from '@frontify/fondue';
import { joinClassNames, toHexString } from '@frontify/guideline-blocks-shared';

export const SquareBadge = ({ gradientColor, gradientOrientation, top, left }: SquareBadgeProps) => {
    const { copy, status } = useCopy();
    const isCopied = status === 'success';

    const getBadgeClasses = (isLeft: boolean) => {
        return joinClassNames([
            'tw-flex',
            isLeft && gradientOrientation === 90 ? 'tw-flex-row-reverse tw-pl-1' : 'tw-pr-1',
        ]);
    };

    const getCopyButtonClasses = (isLeft: boolean) => {
        return joinClassNames([
            'tw-inline-flex tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex',
            isLeft && gradientOrientation === 90 ? 'tw-pl-1' : 'tw-pr-1',
        ]);
    };

    return (
        <div
            data-test-id="square-badge"
            key={toHexString(gradientColor.color) + gradientColor.position}
            className="tw-absolute tw-mt-2"
            style={{
                left,
                top,
            }}
        >
            <div
                className="tw-flex tw-items-center tw-h-5 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded tw-group tw-cursor-pointer"
                onClick={() => copy(toHexString(gradientColor.color))}
            >
                <div className={getBadgeClasses(gradientColor.isReverse || false)}>
                    <div
                        className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded tw-mx-0."
                        style={{
                            backgroundColor: toHexString(gradientColor.color),
                        }}
                    ></div>
                    <span className="tw-text-weak tw-px-1 tw-text-xs">
                        <strong>{gradientColor.color?.name}</strong>
                    </span>
                    <span className="tw-text-x-weak tw-text-xs tw-pl-1">{toHexString(gradientColor.color)}</span>
                </div>
                <button className={getCopyButtonClasses(gradientColor.isReverse || false)}>
                    {isCopied ? (
                        <span data-test-id="square-badge-checkmark">
                            <IconCheckMark16 />
                        </span>
                    ) : (
                        <span data-test-id="square-badge-clipboard">
                            <IconClipboard16 />
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};
