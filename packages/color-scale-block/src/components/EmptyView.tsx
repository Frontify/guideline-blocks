/* (c) Copyright Frontify Ltd., all rights reserved. */

type EmptyViewProps = {
    height: string;
};

export const EmptyView = ({ height }: EmptyViewProps) => {
    const emptyBlockColors = ['#D5D6D6', '#DFDFDF', '#E8E9E9', '#F1F1F1', '#FAFAFA', '#FFFFFF'];

    return (
        <div
            className="tw-flex tw-w-full tw-overflow-hidden tw-rounded"
            style={{
                height,
            }}
        >
            {emptyBlockColors.map((color) => (
                <div
                    key={color}
                    className="tw-w-1/6"
                    style={{
                        backgroundColor: color,
                    }}
                ></div>
            ))}
        </div>
    );
};
