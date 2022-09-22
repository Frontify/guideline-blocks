/* (c) Copyright Frontify Ltd., all rights reserved. */

type EmptyViewProps = {
    placeholderBackgroundColor: string;
    height: string;
    totalNumberOfBlocks: number;
    index: number;
    isFirst: boolean;
    isLast: boolean;
    width: number;
};

export const EmptyView = ({
    placeholderBackgroundColor,
    totalNumberOfBlocks,
    index,
    isFirst,
    isLast,
    height,
    width,
}: EmptyViewProps) => {
    return (
        <div
            style={{
                backgroundColor: placeholderBackgroundColor,
                width: `${width}px`,
                height,
            }}
            key={`placeholder-${index}`}
            className={`empty-view tw-flex tw-overflow-hidden
            ${isFirst ? 'tw-pl-[1px]' : ''} ${index === totalNumberOfBlocks - 1 ? 'tw-pr-[1px]' : ''}
                 ${isFirst ? 'tw-rounded-tl' : ''}
                ${isFirst ? 'tw-rounded-bl' : ''}
                ${isLast ? 'tw-rounded-tr' : ''}
                ${isLast ? 'tw-rounded-br' : ''}`}
        ></div>
    );
};
