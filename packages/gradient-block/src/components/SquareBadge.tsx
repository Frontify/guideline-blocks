/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCopy } from '@frontify/fondue';
import { IconCheckMark, IconClipboard } from '@frontify/fondue/icons';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { useRef } from 'react';

import { HEIGHT_OF_SQUARE_BADGE } from '../constants';
import { calculateBadgeWidthInPercent, calculateCopyButtonWidthInPercent, toHex6or8String } from '../helpers';
import { type GradientColor, type SquareBadgeProps } from '../types';

export const SquareBadge = ({ gradientColor, gradientOrientation, index, blockWidth, isLast }: SquareBadgeProps) => {
    const badgeRef = useRef<HTMLDivElement>(null);
    const { copy, status } = useCopy();
    const isCopied = status === 'success';

    const getBadgeClasses = (isLeft: boolean) => {
        return joinClassNames(['tw-flex tw-gap-1', isLeft && gradientOrientation === 90 && 'tw-flex-row-reverse']);
    };

    const getCopyButtonClasses = () => {
        return joinClassNames([
            'tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex group-focus:tw-inline-flex',
        ]);
    };

    const getTop = (gradientColor: GradientColor, index: number) => {
        if (gradientColor.level === undefined) {
            return 0;
        }

        if (gradientOrientation !== 90) {
            return HEIGHT_OF_SQUARE_BADGE * index;
        }

        if (gradientColor.level < 0) {
            return 0;
        } else {
            return gradientColor.level * HEIGHT_OF_SQUARE_BADGE;
        }
    };

    const getLeft = (gradientColor: GradientColor) => {
        if (gradientOrientation !== 90) {
            return '0%';
        }

        if (isLast) {
            return '100%';
        }

        if (gradientColor.isReverse) {
            const badgeWidthInPercent = calculateBadgeWidthInPercent(gradientColor, blockWidth);
            const copyButtonInPercent = calculateCopyButtonWidthInPercent(blockWidth);

            return `${gradientColor.position - (badgeWidthInPercent - copyButtonInPercent) + 2}%`;
        } else {
            return `${gradientColor.position}%`;
        }
    };

    // eslint-disable-next-line react-hooks/refs
    const isOutOfBounds = !!badgeRef.current && badgeRef.current.clientWidth + badgeRef.current.offsetLeft > blockWidth;
    const hexValue = toHex6or8String(gradientColor.color);

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
                type="button"
                className="tw-flex tw-items-center tw-h-5 tw-px-px tw-gap-1 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded tw-group tw-cursor-pointer"
                onClick={() => copy(hexValue)}
            >
                <div className={getBadgeClasses(gradientColor.isReverse || false)}>
                    <div
                        className={joinClassNames([
                            'tw-inline-flex tw-w-4 tw-h-4 tw-rounded',
                            hexValue === '#ffffff' && 'tw-border tw-border-line',
                        ])}
                        style={{
                            backgroundColor: hexValue,
                        }}
                    />
                    {gradientColor.color?.name && (
                        <span className="tw-px-1 tw-text-xs tw-whitespace-nowrap">
                            <strong>{gradientColor.color.name}</strong>
                        </span>
                    )}
                    <span className="tw-text-x-weak tw-text-xs tw-px-px">{hexValue}</span>
                </div>
                <div className={getCopyButtonClasses()}>
                    {isCopied ? (
                        <span data-test-id="square-badge-checkmark">
                            <IconCheckMark size={16} />
                        </span>
                    ) : (
                        <span data-test-id="square-badge-clipboard">
                            <IconClipboard size={16} />
                        </span>
                    )}
                </div>
            </button>
        </div>
    );
};
