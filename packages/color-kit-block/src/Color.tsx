/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ReactElement } from 'react';
import type { Color as ColorType } from '@frontify/app-bridge';
import { LegacyTooltip, TooltipPosition, merge, useCopy } from '@frontify/fondue';
import { toRgbaString } from '@frontify/guideline-blocks-settings';

import { TooltipContent } from './TooltipContent';

type ColorProps = {
    isEditing: boolean;
    color: ColorType;
    colorsLength: number;
};

export const Color = ({ isEditing, color, colorsLength }: ColorProps): ReactElement | null => {
    const { copy, status } = useCopy();

    const colorWithDecimalAlpha: ColorType = {
        ...color,
        alpha: color.alpha && parseFloat((color.alpha / 255).toFixed(2)),
    };

    if (!color.hex) {
        return null;
    }

    const ColorBox = () => (
        <div className="tw-bg-[url('https://cdn.frontify.com/img/transparent.png')] tw-bg-[length:10px_10px]">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
                key={color.id}
                data-test-id="color"
                style={{
                    backgroundColor: toRgbaString(colorWithDecimalAlpha),
                }}
                className={merge([
                    'tw-w-6 tw-h-6 tw-overflow-hidden tw-transition-shadow',
                    colorsLength === 1 ? '!tw-shadow-inner-line' : 'tw-shadow-inner-line-y',
                    !isEditing && 'hover:!tw-shadow-inner-line-strong',
                ])}
                onClick={() => copy(`#${color.hex}`)}
            />
        </div>
    );

    const editModeSideShadows =
        '[&:first-child>div>div]:tw-shadow-inner-line-first [&:last-child>div>div]:tw-shadow-inner-line-last';
    const viewModeSideShadows =
        '[&:first-child>div>div>div>div]:tw-shadow-inner-line-first [&:last-child>div>div>div>div]:tw-shadow-inner-line-last';

    return isEditing ? (
        <div className={editModeSideShadows}>
            <ColorBox />
        </div>
    ) : (
        <div className={viewModeSideShadows}>
            <LegacyTooltip
                withArrow
                key={color.id}
                position={TooltipPosition.Right}
                content={<TooltipContent colorName={color.name} colorValue={color.hex} status={status} />}
                triggerElement={
                    <div>
                        <ColorBox />
                    </div>
                }
            />
        </div>
    );
};
