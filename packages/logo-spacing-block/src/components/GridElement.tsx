import { GridElementPosition, GridElementProps } from '../types';

const getElementBorders = (position: GridElementPosition) => {
    switch (position) {
        case GridElementPosition.Top:
            return 'tw-border-b-0';
        case GridElementPosition.Bottom:
            return 'tw-border-t-0';
        case GridElementPosition.Right:
            return 'tw-border-l-0';
        case GridElementPosition.Left:
            return 'tw-border-r-0';
        case GridElementPosition.TopLeft:
            return 'tw-border-r-0 tw-border-b-0';
        case GridElementPosition.TopRight:
            return 'tw-border-l-0 tw-border-b-0';
        case GridElementPosition.BottomLeft:
            return 'tw-border-r-0 tw-border-t-0';
        case GridElementPosition.BottomRight:
            return 'tw-border-l-0 tw-border-t-0';
    }
};

export const GridElement = ({ position, children, col, row }: GridElementProps) => {
    return (
        <span
            id={position}
            className={`${getElementBorders(position)} tw-border tw-border-dashed`}
            style={{ gridColumnStart: col, gridRowStart: row }}
        >
            {children}
        </span>
    );
};
