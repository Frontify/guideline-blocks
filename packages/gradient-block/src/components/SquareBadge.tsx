/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark16, IconClipboard16, useCopy } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { useRef } from 'react';
import { HEIGHT_OF_SQUARE_BADGE } from '../constants';
import { calculateBadgeWidthInPercent, calculateCopyButtonWidthInPercent, toHex6or8String } from '../helpers';
import { GradientColor, SquareBadgeProps } from '../types';

export const SquareBadge = ({ gradientColor, gradientOrientation, index, blockWidth }: SquareBadgeProps) => {
    const badgeRef = useRef<HTMLDivElement>(null);
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
            'tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex group-focus:tw-inline-flex',
            isLeft && gradientOrientation === 90 ? 'tw-pl-1' : 'tw-pr-1',
        ]);
    };

    const getTop = (gradientColor: GradientColor, index: number) => {
        if (gradientColor.level !== undefined) {
            if (gradientOrientation === 90) {
                if (gradientColor.level < 0) {
                    return 0;
                } else {
                    return gradientColor.level * HEIGHT_OF_SQUARE_BADGE;
                }
            } else {
                return HEIGHT_OF_SQUARE_BADGE * index;
            }
        } else {
            return 0;
        }
    };

    const getLeft = (gradientColor: GradientColor) => {
        if (gradientOrientation === 90) {
            if (gradientColor.isReverse) {
                const badgeWidthInPercent = calculateBadgeWidthInPercent(gradientColor, blockWidth);
                const copyButtonInPercent = calculateCopyButtonWidthInPercent(blockWidth);
                return `${gradientColor.position - (badgeWidthInPercent - copyButtonInPercent) + 2}%`;
            } else {
                return `${gradientColor.position}%`;
            }
        } else {
            return '0%';
        }
    };

    const isOutOfBounds = !!badgeRef.current && badgeRef.current.clientWidth + badgeRef.current.offsetLeft > blockWidth;

    return (
        <div
            ref={badgeRef}
            data-test-id="square-badge"
            key={toHex6or8String(gradientColor.color) + gradientColor.position}
            className="tw-absolute tw-mt-2"
            style={{
                top: getTop(gradientColor, index),
                left: isOutOfBounds ? 'auto' : getLeft(gradientColor),
                right: isOutOfBounds ? '0%' : 'auto',
            }}
        >
            <button
                className="tw-flex tw-items-center tw-h-5 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded tw-group tw-cursor-pointer"
                onClick={() => copy(toHex6or8String(gradientColor.color))}
            >
                <div className={getBadgeClasses(gradientColor.isReverse || false)}>
                    <div
                        className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded tw-mx-0"
                        style={{
                            backgroundColor: toHex6or8String(gradientColor.color),
                        }}
                    ></div>
                    <span className="tw-text-weak tw-px-1 tw-text-xs tw-whitespace-nowrap">
                        <strong>{gradientColor.color?.name}</strong>
                    </span>
                    <span className="tw-text-x-weak tw-text-xs tw-pl-1">{toHex6or8String(gradientColor.color)}</span>
                </div>
                <div className={getCopyButtonClasses(gradientColor.isReverse || false)}>
                    {isCopied ? (
                        <span data-test-id="square-badge-checkmark">
                            <IconCheckMark16 />
                        </span>
                    ) : (
                        <span data-test-id="square-badge-clipboard">
                            <IconClipboard16 />
                        </span>
                    )}
                </div>
            </button>
        </div>
    );
};
