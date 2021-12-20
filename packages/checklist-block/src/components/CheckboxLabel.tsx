/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, FC, Fragment, useContext } from 'react';
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

const decorateLabelChildren = (children: string, style: CSSProperties) =>
    children.split('\n').map((child: string, index, ctx: string[]) => {
        const childWithWrapper =
            child !== '' ? (
                <span className="tw-inline-block tw-rounded-sm tw-px-[2px] tw-mx-[-2px]" style={style}>
                    {child}
                </span>
            ) : (
                child
            );

        return (
            <Fragment key={`${child}--${index}`}>
                {childWithWrapper}
                {index !== ctx.length - 1 && '\n'}
            </Fragment>
        );
    });

export const CheckboxLabel: FC<CheckboxLabelProps> = ({ children = '', htmlFor, disabled = false, dateInMs }) => {
    const { strikethroughMultiInput, highlightColor, completedDecoration, completeTextColor, dateVisible } =
        useContext(SettingsContext);

    const [type, thickness, color] = strikethroughMultiInput;

    const decorationStyles = getLabelDecorationStylesMap(type, thickness, color, highlightColor)[completedDecoration];

    const labelStyles = { color: colorToHexAlpha(completeTextColor), ...decorationStyles };

    const decoratedChildren = decorateLabelChildren(children, labelStyles);

    return (
        <div
            className="tw-inline tw-text-s tw-max-w-full tw-px-0.5 tw-flex-initial tw-min-w-0"
            data-test-id="input-label-container"
        >
            <label
                htmlFor={htmlFor}
                className={joinClassNames([
                    'tw-select-none tw-inline tw-whitespace-pre-wrap',
                    disabled ? 'hover:tw-cursor-not-allowed tw-pointer-events-none' : 'hover:tw-cursor-pointer',
                ])}
                data-test-id="checkbox-label"
            >
                {decoratedChildren}
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
