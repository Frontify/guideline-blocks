/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useContext } from 'react';
import { CheckboxLabelProps, ChecklistDecoration, DecorationStyle, StrikethroughStyleType } from '../types';
import { colorToHexAlpha, joinClassNames } from '@frontify/guideline-blocks-shared';
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
                    textDecorationStyle: StrikethroughStyleType[strikethroughMultiInput[0]],
                    textDecorationThickness: strikethroughMultiInput[1],
                    textDecorationColor: colorToHexAlpha(strikethroughMultiInput[2]),
                };
            case ChecklistDecoration.Highlight:
                return {
                    backgroundColor: colorToHexAlpha(highlightColor),
                };
            default:
                return {};
        }
    })(completedDecoration);

    return (
        <div className="tw-inline-flex tw-flex-col tw-text-s tw-max-w-full" data-test-id="input-label-container">
            <label
                htmlFor={htmlFor}
                className={joinClassNames([
                    'tw-select-none tw-whitespace-pre-wrap tw-w-max',
                    disabled ? 'hover:tw-cursor-not-allowed tw-pointer-events-none' : 'hover:tw-cursor-pointer',
                ])}
                style={{ color: colorToHexAlpha(completeTextColor), ...decorationStyles }}
                data-test-id="checkbox-label"
            >
                {children}
            </label>
            {dateVisible && Boolean(dateInMs) && (
                <span className="tw-text-black-60 tw-font-sans tw-text-xxs tw-font-normal" data-test-id="checkbox-date">
                    {dayjs(dateInMs).fromNow()}
                </span>
            )}
        </div>
    );
};
