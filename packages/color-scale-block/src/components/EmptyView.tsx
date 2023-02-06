/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EMPTY_BLOCK_COLORS } from '../helpers';

export const EmptyView = () => {
    return (
        <div className="tw-p-px tw-rounded tw-inline-flex tw-w-full tw-h-full tw-overflow-hidden">
            {EMPTY_BLOCK_COLORS.map((backgroundColor: string) => {
                return (
                    <div
                        style={{
                            backgroundColor,
                            width: `${100 / EMPTY_BLOCK_COLORS.length}%`,
                        }}
                        key={backgroundColor}
                        className="tw-inline-flex tw-overflow-hidden first:tw-pl-px last:tw-pr-px first:tw-rounded-tl first:tw-rounded-bl last:tw-rounded-tr last:tw-rounded-br"
                    />
                );
            })}
        </div>
    );
};
