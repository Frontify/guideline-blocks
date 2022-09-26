/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ReactElement } from 'react';
import type { Color as ColorType } from '@frontify/app-bridge';
import { Tooltip, TooltipPosition, useCopy } from '@frontify/fondue';
import { toRgbaString } from '@frontify/guideline-blocks-shared';

import { TooltipContent } from './TooltipContent';

type ColorProps = {
    isEditing: boolean;
    color: ColorType;
};

export const Color = ({ isEditing, color }: ColorProps): ReactElement => {
    const { copy, status } = useCopy();

    const colorWithDecimalAlpha: ColorType = {
        ...color,
        alpha: color.alpha && parseFloat((color.alpha / 255).toFixed(2)),
    };

    if (!color.hex) {
        return <></>;
    }

    const ColorBox = () => (
        <div className="tw-bg-[url('https://cdn.frontify.com/img/transparent.png')] tw-bg-[length:10px_10px]">
            <div
                key={color.id}
                data-test-id="color"
                style={{
                    backgroundColor: toRgbaString(colorWithDecimalAlpha),
                }}
                className="tw-w-6 tw-h-6 tw-overflow-hidden tw-shadow-inner-line-y tw-transition-shadow hover:!tw-shadow-inner-line-strong"
                onClick={() => copy(`#${color.hex}`)}
            />
        </div>
    );

    return isEditing ? (
        <ColorBox />
    ) : (
        <Tooltip
            withArrow
            key={color.id}
            hoverDelay={0}
            position={TooltipPosition.Right}
            content={<TooltipContent colorValue={color.hex} status={status} />}
            triggerElement={
                <div>
                    <ColorBox />
                </div>
            }
        />
    );
};
