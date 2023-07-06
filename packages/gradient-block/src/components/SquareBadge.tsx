/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark16, IconClipboard16, useCopy } from '@frontify/fondue';
import { joinClassNames, toHexString } from '@frontify/guideline-blocks-shared';
import { useRef } from 'react';
import { HEIGHT_OF_SQUARE_BADGE } from '../constants';
import { calculateBadgeWidthInPercent, calculateCopyButtonWidthInPercent } from '../helpers';
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
            key={toHexString(gradientColor.color) + gradientColor.position}
            className="tw-absolute tw-mt-2"
            style={{
                top: getTop(gradientColor, index),
                left: isOutOfBounds ? 'auto' : getLeft(gradientColor),
                right: isOutOfBounds ? '0%' : 'auto',
            }}
        >
            <div
                className="tw-flex tw-items-center tw-h-5 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded-md tw-group tw-cursor-pointer"
                onClick={() => copy(toHexString(gradientColor.color))}
                aria-label="Copy color to clipboard"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'c' && (e.metaKey || e.ctrlKey)) {
                        copy(toHexString(gradientColor.color));
                    }
                }}
            >
                <div className={getBadgeClasses(gradientColor.isReverse || false)}>
                    <div
                        className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded-md tw-mx-0"
                        style={{
                            backgroundColor: toHexString(gradientColor.color),
                        }}
                    ></div>
                    <span className="tw-text-weak tw-px-1 tw-text-xs tw-whitespace-nowrap">
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
