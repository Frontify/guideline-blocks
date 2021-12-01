/* (c) Copyright Frontify Ltd., all rights reserved. */
import React, { FC, useContext } from 'react';
import { CheckboxLabelProps, ChecklistDecoration, DecorationStyle } from '../types';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SettingsContext } from '../SettingsContext';

dayjs.extend(relativeTime);

export const CheckboxLabel: FC<CheckboxLabelProps> = ({ children, htmlFor, disabled = false, dateInMs }) => {
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
            className={'tw-inline-flex tw-flex-col tw-justify-center tw-gap-1 tw-text-s tw-max-w-full'}
            data-test-id="input-label-container"
        >
            <label
                htmlFor={htmlFor}
                className={joinClassNames([
                    'tw-select-none tw-whitespace-pre-wrap tw-w-max tw-px-0.5',
                    disabled ? 'hover:tw-cursor-not-allowed tw-pointer-events-none' : 'hover:tw-cursor-pointer',
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
