/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SquareBadgeProps } from '../types';
import { ColorSquarePositionType } from '../types';
import { IconEnum, iconsMap } from '@frontify/fondue';
import { CSSProperties } from 'react';

export const SquareBadge = ({
    index,
    lastIndex,
    color,
    colorSquarePosition = ColorSquarePositionType.Left,
    handleCopy,
}: SquareBadgeProps) => {
    const style = () => {
        if (index === 0) {
            return { left: 0 };
        }
        if (index === lastIndex) {
            return { right: 0 };
        }
        return { left: `${color.position}%` };
    };

    return (
        <div className="tw-absolute" style={style()}>
            <div className="tw-flex tw-items-center tw-h-5 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded tw-group">
                {colorSquarePosition === ColorSquarePositionType.Left && (
                    <>
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
                            onClick={handleCopy}
                        >
                            {iconsMap[IconEnum.Clipboard16]}
                        </button>
                    </>
                )}

                {colorSquarePosition === ColorSquarePositionType.Right && (
                    <>
                        <button
                            data-test-id="gradient-css-copy-button"
                            className="tw-inline-flex tw-pl-[5px] tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex"
                            onClick={handleCopy}
                        >
                            {iconsMap[IconEnum.Clipboard16]}
                        </button>
                        <span className="tw-text-weak tw-pl-[4px] tw-pr-[5px] tw-text-xs">
                            <strong>{color.name}</strong>
                        </span>
                        <span className="tw-text-x-weak tw-text-xs">{color.hex}</span>
                        <div
                            className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded tw-ml-[5px] tw-mr-[1px]"
                            style={{
                                backgroundColor: color.hex,
                            }}
                        ></div>
                    </>
                )}
            </div>
        </div>
    );
};
