/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EmptyViewProps } from '../types';
import { EMPTY_BLOCK_COLORS } from '../helpers';

export const EmptyView = ({ height }: EmptyViewProps) => {
    return (
        <div className="tw-rounded tw-inline-flex tw-w-full tw-h-full tw-overflow-hidden">
            {EMPTY_BLOCK_COLORS.map((color: string) => {
                return (
                    <div
                        style={{
                            backgroundColor: color,
                            height,
                        }}
                        key={color}
                        className="tw-w-1/6 tw-inline-flex tw-overflow-hidden first:tw-pl-[1px] last:tw-pr-[1px] first:tw-rounded-tl first:tw-rounded-bl last:tw-rounded-tr last:tw-rounded-br"
                    />
                );
            })}
        </div>
    );
};
