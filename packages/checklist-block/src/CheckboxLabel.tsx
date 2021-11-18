import React, { FC, PropsWithChildren } from 'react';
import { merge } from './utilities/merge';
export type InputLabelProps = PropsWithChildren<{
    htmlFor: string;
    disabled?: boolean;
    bold?: boolean;
    color: string;
    decoration: any;
    date?: string;
}>;

export const CheckboxLabel: FC<InputLabelProps> = ({
    children,
    htmlFor,
    disabled = false,
    bold,
    color,
    decoration,
    date,
}) => {
    return (
        <div
            className={merge([
                'tw-inline-flex tw-flex-col tw-justify-center tw-gap-1 tw-font-sans tw-text-s tw-overflow-hidden tw-max-w-full',
                disabled
                    ? 'tw-text-black-40 hover:tw-text-black-40 dark:tw-text-black-60 dark:hover:tw-text-black-60'
                    : 'tw-text-black-90 dark:tw-text-white',
            ])}
            data-test-id="input-label-container"
        >
            <div className="tw-flex-1 tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap">
                <label
                    htmlFor={htmlFor}
                    className={merge([
                        'tw-select-none',
                        bold && 'tw-font-medium',
                        disabled
                            ? 'hover:tw-cursor-not-allowed tw-pointer-events-none'
                            : 'hover:tw-cursor-pointer hover:tw-text-black dark:hover:tw-text-white group-hover:tw-text-black dark:group-hover:tw-text-white',
                    ])}
                    style={{ color, ...decoration }}
                    data-test-id="input-label"
                >
                    {children}
                </label>
            </div>
            {date && <span className="tw-text-black-60 tw-font-sans tw-text-xs tw-font-normal">{date}</span>}
        </div>
    );
};
