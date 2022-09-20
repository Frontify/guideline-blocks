/* (c) Copyright Frontify Ltd., all rights reserved. */

type EmptyViewProps = {
    placeholderBackgroundColor: string;
    height: string;
    totalNumberOfBlocks: number;
    index: number;
    width: number;
};

export const EmptyView = ({
    placeholderBackgroundColor,
    totalNumberOfBlocks,
    index,
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
            ${index === 0 ? 'tw-pl-[1px]' : ''} ${index === totalNumberOfBlocks - 1 ? 'tw-pr-[1px]' : ''}
                 ${index === 0 ? 'tw-rounded-tl' : ''}
                ${index === 0 ? 'tw-rounded-bl' : ''}
                ${index === totalNumberOfBlocks - 1 ? 'tw-rounded-tr' : ''}
                ${index === totalNumberOfBlocks - 1 ? 'tw-rounded-br' : ''}`}
        ></div>
    );
};
