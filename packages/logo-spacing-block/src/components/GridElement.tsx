import { GridElementPosition, GridElementProps } from '../types';

const getElementBorders = (position: GridElementPosition) => {
    switch (position) {
        case GridElementPosition.Top:
        case GridElementPosition.Bottom:
            return 'tw-border-l tw-border-r';
        case GridElementPosition.Right:
        case GridElementPosition.Left:
            return 'tw-border-t tw-border-b';
    }
};

export const GridElement = ({ position, children, col, row, showBorder }: GridElementProps) => {
    const borderStyle = showBorder ? 'tw-border-transparent' : 'tw-border-dashed';
    return (
        <span
            id={position}
            className={`${getElementBorders(position)} ${borderStyle}`}
            style={{ gridColumnStart: col, gridRowStart: row }}
        >
            {children}
        </span>
    );
};
