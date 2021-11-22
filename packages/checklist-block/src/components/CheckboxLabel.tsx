import React, { FC, PropsWithChildren } from 'react';
import { DecorationStyle } from '../types';
import { merge } from '../utilities/merge';
export type InputLabelProps = PropsWithChildren<{
    htmlFor: string;
    disabled?: boolean;
    color: string;
    decoration?: DecorationStyle;
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
                'tw-inline-flex tw-flex-col tw-justify-center tw-gap-1  tw-text-s tw-max-w-full',
                disabled
                    ? 'tw-text-black-40 hover:tw-text-black-40 dark:tw-text-black-60 dark:hover:tw-text-black-60'
                    : 'tw-text-black-90 dark:tw-text-white',
            ])}
            data-test-id="input-label-container"
        >
            <label
                htmlFor={htmlFor}
                className={merge([
                    'tw-select-none tw-whitespace-pre-wrap',
                    bold && 'tw-font-medium',
                    disabled
                        ? 'hover:tw-cursor-not-allowed tw-pointer-events-none'
                        : 'hover:tw-cursor-pointer hover:tw-text-black dark:hover:tw-text-white group-hover:tw-text-black dark:group-hover:tw-text-white tw-px-0.5',
                ])}
                style={{ color, ...decoration }}
                data-test-id="input-label"
            >
                {children}
            </label>
            {date && <span className="tw-text-black-60 tw-font-sans tw-text-xs tw-font-normal">{date}</span>}
        </div>
    );
};
