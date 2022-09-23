/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EmptyViewProps } from '../types';

export const EmptyView = ({ height }: EmptyViewProps) => {
    const emptyBlockColors = ['#D5D6D6', '#DFDFDF', '#E8E9E9', '#F1F1F1', '#FAFAFA', '#FFFFFF'];

    return (
        <>
            {emptyBlockColors.map((color: string, index: number) => {
                const isFirst = index === 0;
                const isLast = index === emptyBlockColors.length - 1;
                return (
                    <div
                        style={{
                            backgroundColor: emptyBlockColors[index],
                            height,
                        }}
                        key={`placeholder-${index}`}
                        className={`empty-view tw-w-1/6 tw-flex tw-overflow-hidden
                            ${isFirst ? 'tw-pl-[1px]' : ''} 
                            ${isLast ? 'tw-pr-[1px]' : ''}
                            ${isFirst ? 'tw-rounded-tl' : ''}
                            ${isFirst ? 'tw-rounded-bl' : ''}
                            ${isLast ? 'tw-rounded-tr' : ''}
                            ${isLast ? 'tw-rounded-br' : ''}`}
                    ></div>
                );
            })}
        </>
    );
};
