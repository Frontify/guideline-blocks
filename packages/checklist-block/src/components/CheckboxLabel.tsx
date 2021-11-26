import dayjs from '../utilities/day';
import React, { FC, PropsWithChildren, useContext } from 'react';
import { SettingsContext } from '..';
import { ChecklistDecoration, DecorationStyle } from '../types';
import { joinClassNames } from '@frontify/guideline-blocks-shared';

export type InputLabelProps = PropsWithChildren<{
    htmlFor: string;
    disabled?: boolean;
    dateInMs?: number;
}>;

export const CheckboxLabel: FC<InputLabelProps> = ({ children, htmlFor, disabled = false, dateInMs }) => {
    const { strikethroughMultiInput, highlightColor, completedDecoration, completeTextColor, dateVisible } =
        useContext(SettingsContext);

    const decorationStyles = ((type: ChecklistDecoration): DecorationStyle => {
        switch (type) {
            case ChecklistDecoration.Strikethrough:
                return {
                    textDecoration: 'line-through',
                    textDecorationStyle: strikethroughMultiInput[0],
                    textDecorationThickness: strikethroughMultiInput[1],
                    textDecorationColor: strikethroughMultiInput[2].hex,
                };
            case ChecklistDecoration.Highlight:
                return {
                    backgroundColor: highlightColor.hex,
                };
            default:
                return {};
        }
    })(completedDecoration);

    return (
        <div
            className={joinClassNames([
                'tw-inline-flex tw-flex-col tw-justify-center tw-gap-1  tw-text-s tw-max-w-full',
                disabled
                    ? 'tw-text-black-40 hover:tw-text-black-40 dark:tw-text-black-60 dark:hover:tw-text-black-60'
                    : 'tw-text-black-90 dark:tw-text-white',
            ])}
            data-test-id="input-label-container"
        >
            <label
                htmlFor={htmlFor}
                className={joinClassNames([
                    'tw-select-none tw-whitespace-pre-wrap',
                    disabled
                        ? 'hover:tw-cursor-not-allowed tw-pointer-events-none'
                        : 'hover:tw-cursor-pointer hover:tw-text-black dark:hover:tw-text-white group-hover:tw-text-black dark:group-hover:tw-text-white tw-px-0.5',
                ])}
                style={{ color: completeTextColor.hex, ...decorationStyles }}
                data-test-id="input-label"
            >
                {children}
            </label>
            {dateVisible && Boolean(dateInMs) && (
                <span className="tw-text-black-60 tw-font-sans tw-text-xs tw-font-normal">
                    {dayjs(dateInMs).fromNow()}
                </span>
            )}
        </div>
    );
};
