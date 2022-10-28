/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EmptyViewProps } from '../types';
import { EMPTY_BLOCK_COLORS } from '../helpers';

export const EmptyView = ({ height }: EmptyViewProps) => {
    return (
        <>
            {EMPTY_BLOCK_COLORS.map((color: string) => {
                return (
                    <div
                        style={{
                            backgroundColor: color,
                            height,
                        }}
                        key={color}
                        className="tw-w-1/6 tw-flex tw-overflow-hidden first:tw-pl-[1px] last:tw-pr-[1px] first:tw-rounded-tl first:tw-rounded-bl last:tw-rounded-tr last:tw-rounded-br"
                    />
                );
            })}
        </>
    );
};
