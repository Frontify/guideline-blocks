import { GridElementPosition, GridElementProps } from '../types';

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

export const GridElement = ({ bgColor, borderStyle, borderWidth, position, children, col, row }: GridElementProps) => {
    return (
        <span
            id={position}
            style={{
                ...borderStyle,
                ...getElementBorders(position, borderWidth),
                backgroundColor: toRgbaString(bgColor),
                gridColumnStart: col,
                gridRowStart: row,
            }}
        >
            {children}
        </span>
    );
};
