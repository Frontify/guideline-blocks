/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import { joinClassNames, toHex8String } from '@frontify/guideline-blocks-shared';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CSSProperties, FC, useContext } from 'react';
import { SettingsContext } from '../SettingsContext';
import {
    CheckboxLabelProps,
    ChecklistDecoration,
    DecorationStyle,
    StrikethroughStyleType,
    StrikethroughType,
} from '../types';

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
        textDecorationColor: toHex8String(color),
        fontWeight: '500',
    },
    [ChecklistDecoration.Highlight]: {
        backgroundColor: toHex8String(highlightColor),
    },
    [ChecklistDecoration.Checkbox]: {
        fontWeight: '500',
    },
});

const decorateLabelChildren = (children: string, style: CSSProperties) =>
    children.split('\n').map((child: string, index, ctx: string[]) => (
        <>
            {child !== '' ? (
                <span
                    className="tw-inline-block tw-rounded-sm tw-px-[2px] tw-mx-[-2px]"
                    key={`${child}--${index}`}
                    style={style}
                >
                    {child}
                </span>
            ) : (
                child
            )}
            {index !== ctx.length - 1 && '\n'}
        </>
    ));

export const CheckboxLabel: FC<CheckboxLabelProps> = ({ children = '', htmlFor, disabled = false, dateInMs }) => {
    const {
        strikethroughStyle,
        strikethroughWidth,
        strikethroughColor,
        highlightColor,
        completedDecoration,
        completeTextColor,
        dateVisible,
    } = useContext(SettingsContext);

    const decorationStyles = getLabelDecorationStylesMap(
        strikethroughStyle,
        strikethroughWidth,
        strikethroughColor,
        highlightColor
    )[completedDecoration];

    const labelStyles = { color: toHex8String(completeTextColor), ...decorationStyles };

    const decoratedChildren = decorateLabelChildren(children, labelStyles);

    return (
        <div
            className="tw-text-s tw-max-w-full tw-px-0.5 tw-flex-initial tw-min-w-0"
            data-test-id="input-label-container"
        >
            <label
                htmlFor={htmlFor}
                className={joinClassNames([
                    'tw-select-none tw-whitespace-pre-wrap [word-break:break-word]',
                    disabled ? 'hover:tw-cursor-not-allowed tw-pointer-events-none' : 'hover:tw-cursor-pointer',
                ])}
                data-test-id="checkbox-label"
            >
                {decoratedChildren}
            </label>
            {dateVisible && Boolean(dateInMs) && (
                <span
                    className="tw-text-x-weak tw-font-sans tw-text-xxs tw-font-normal tw-block tw-mt-[2px]"
                    data-test-id="checkbox-date"
                >
                    {dayjs(dateInMs).fromNow()}
                </span>
            )}
        </div>
    );
};
