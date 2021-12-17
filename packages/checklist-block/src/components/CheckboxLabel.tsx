/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useContext } from 'react';
import {
    CheckboxLabelProps,
    ChecklistDecoration,
    DecorationStyle,
    StrikethroughStyleType,
    StrikethroughType,
} from '../types';
import { colorToHexAlpha, joinClassNames } from '@frontify/guideline-blocks-shared';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SettingsContext } from '../SettingsContext';
import { Color } from '@frontify/arcade';

dayjs.extend(relativeTime);

const getLabelDecorationStylesMap = (
    style: StrikethroughType,
    thickness: string,
    color: Color,
    highlightColor: Color
): Record<ChecklistDecoration, DecorationStyle> => ({
    [ChecklistDecoration.Strikethrough]: {
        textDecoration: 'line-through',
        textDecorationStyle: StrikethroughStyleType[style],
        textDecorationThickness: thickness,
        textDecorationColor: colorToHexAlpha(color),
        fontWeight: '500',
    },
    [ChecklistDecoration.Highlight]: {
        backgroundColor: colorToHexAlpha(highlightColor),
    },
    [ChecklistDecoration.Checkbox]: {
        fontWeight: '500',
    },
});

export const CheckboxLabel: FC<CheckboxLabelProps> = ({ children, htmlFor, disabled = false, dateInMs }) => {
    const { strikethroughMultiInput, highlightColor, completedDecoration, completeTextColor, dateVisible } =
        useContext(SettingsContext);

    const [type, thickness, color] = strikethroughMultiInput;

    const decorationStyles = getLabelDecorationStylesMap(type, thickness, color, highlightColor)[completedDecoration];

    return (
        <div
            className="tw-inline tw-text-s tw-max-w-full tw-px-0.5 tw-flex-initial tw-min-w-0"
            data-test-id="input-label-container"
        >
            <label
                htmlFor={htmlFor}
                className={joinClassNames([
                    'tw-select-none tw-inline tw-whitespace-pre-wrap tw-rounded-sm',
                    disabled ? 'hover:tw-cursor-not-allowed tw-pointer-events-none' : 'hover:tw-cursor-pointer',
                ])}
                style={{ color: colorToHexAlpha(completeTextColor), ...decorationStyles }}
                data-test-id="checkbox-label"
            >
                {children}
            </label>
            {dateVisible && Boolean(dateInMs) && (
                <span
                    className="tw-text-black-60 tw-font-sans tw-text-xxs tw-font-normal tw-block tw-mt-[2px]"
                    data-test-id="checkbox-date"
                >
                    {dayjs(dateInMs).fromNow()}
                </span>
            )}
        </div>
    );
};
