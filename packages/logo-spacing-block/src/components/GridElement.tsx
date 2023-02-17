import { GridElementPosition, GridElementProps } from '../types';
import { convertToNumber } from '../utils/strings';

import { toRgbaString } from '@frontify/guideline-blocks-shared';

const getElementBorders = (position: GridElementPosition, borderWidth: string) => {
    const border = {
        borderBottomWidth: borderWidth,
        borderLeftWidth: borderWidth,
        borderRightWidth: borderWidth,
        borderTopWidth: borderWidth,
    };
    switch (position) {
        case GridElementPosition.Top:
            return {
                ...border,
                borderBottomWidth: 0,
            };
        case GridElementPosition.Bottom:
            return {
                ...border,
                borderTopWidth: 0,
            };
        case GridElementPosition.Right:
            return {
                ...border,
                borderLeftWidth: 0,
            };
        case GridElementPosition.Left:
            return {
                ...border,
                borderRightWidth: 0,
            };
        case GridElementPosition.TopLeft:
            return {
                ...border,
                borderBottomWidth: 0,
                borderRightWidth: 0,
            };
        case GridElementPosition.TopRight:
            return {
                ...border,
                borderBottomWidth: 0,
                borderLeftWidth: 0,
            };
        case GridElementPosition.BottomLeft:
            return {
                ...border,
                borderRightWidth: 0,
                borderTopWidth: 0,
            };
        case GridElementPosition.BottomRight:
            return {
                ...border,
                borderLeftWidth: 0,
                borderTopWidth: 0,
            };
    }
};

const getTextRotation = (position: GridElementPosition) => {
    switch (position) {
        case GridElementPosition.Bottom:
            return {
                transform: 'rotate(180deg)',
            };
        case GridElementPosition.Right:
            return {
                transform: 'rotate(90deg)',
            };
        case GridElementPosition.Left:
            return {
                transform: 'rotate(-90deg)',
            };
        case GridElementPosition.Top:
        default:
            return {
                transform: 'rotate(0deg)',
            };
    }
};

export const GridElement = ({
    bgColor,
    borderStyle,
    borderWidth,
    children,
    labelColor,
    position,
    width,
}: GridElementProps) => {
    return (
        <span
            className="tw-justify-center tw-flex tw-items-center tw-overflow-hidden"
            id={position}
            style={{
                ...borderStyle,
                ...getElementBorders(position, borderWidth),
                backgroundColor: toRgbaString(bgColor),
                ...(children ? {} : { aspectRatio: '1 / 1' }),
                width,
            }}
        >
            {/* {children && labelColor && convertToNumber(width) > 0 && (
                <div style={{ color: toRgbaString(labelColor), ...getTextRotation(position) }}>{children}</div>
            )} */}
        </span>
    );
};
