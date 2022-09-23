/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EmptyViewProps } from '../types';

export const EmptyView = ({ height }: EmptyViewProps) => {
    const emptyBlockColors = ['#D5D6D6', '#DFDFDF', '#E8E9E9', '#F1F1F1', '#FAFAFA', '#FFFFFF'];

    return (
        <>
            {emptyBlockColors.map((color: string, index: number) => {
                return (
                    <div
                        style={{
                            backgroundColor: emptyBlockColors[index],
                            height,
                        }}
                        key={`placeholder-${index}`}
                        className="tw-w-1/6 tw-flex tw-overflow-hidden first:tw-pl-[1px] last:tw-pr-[1px] first:tw-rounded-tl first:tw-rounded-bl last:tw-rounded-tr last:tw-rounded-br"
                    />
                );
            })}
        </>
    );
};
