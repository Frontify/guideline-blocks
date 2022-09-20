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
    console.log(placeholderBackgroundColor);
    return (
        <div
            style={{
                backgroundColor: placeholderBackgroundColor,
                width: `${width}px`,
            }}
            key={`placeholder-${index}`}
            className={`empty-view tw-flex tw-overflow-hidden tw-h-[${height}]
            tw-pl-[${index === 0 ? '1px' : '0px'}] tw-pr-[${index === totalNumberOfBlocks - 1 ? '1px' : '0px'}]
                 tw-rounded-tl-[${index === 0 ? '3px' : '0px'}]
                tw-rounded-bl-[${index === 0 ? '3px' : '0px'}]
                tw-rounded-tr-[${index === totalNumberOfBlocks - 1 ? '3px' : '0px'}]
                tw-rounded-br-[${index === totalNumberOfBlocks - 1 ? '3px' : '0px'}]
                tw-border-l-[${index === 0 ? '1px' : '0px'}]
                tw-border-r-[${index === totalNumberOfBlocks - 1 ? '1px' : '0px'}]`}
        ></div>
    );
};
