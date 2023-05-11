/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';
import { getRadiusStyles, toRgbaString } from '@frontify/guideline-blocks-shared';
import { ReactElement } from 'react';
import { DEFAULT_CHARS } from './settings';
import { BlockProps, Settings } from './types';

export const GlyphsBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        chars = DEFAULT_CHARS,
        hasBackground,
        backgroundColor,
        fontColor,
        fontFamily,
        hasBorder,
        borderStyle,
        borderWidth,
        borderColor,
        radiusChoice,
        hasRadius,
        radiusValue,
    } = blockSettings;

    const items = chars.split(',').map((char, index) => {
        const isLetter = char.length === 1 && char.match(/[a-z]/i);
        return (
            <li
                key={index}
                className="tw-aspect-square tw-flex tw-items-center tw-justify-center tw-text-center"
                style={{
                    ...(hasBackground && {
                        backgroundColor: toRgbaString(backgroundColor),
                    }),
                    ...(hasBorder && {
                        outlineStyle: borderStyle,
                        outlineWidth: borderWidth,
                        outlineColor: toRgbaString(borderColor),
                    }),
                    ...getRadiusStyles(radiusChoice, hasRadius, radiusValue),
                }}
            >
                {char}
                {isLetter && char.toLowerCase()}
            </li>
        );
    });

    return (
        <div
            data-test-id="glyphs-block"
            style={{
                fontWeight: blockSettings.fontWeight,
                fontSize: blockSettings.fontSize,
                fontFamily: fontFamily || 'inherit',
                color: toRgbaString(fontColor),
            }}
        >
            <ul
                className="tw-grid tw-grid-cols-6"
                style={{
                    gap: borderWidth,
                    padding: borderWidth,
                }}
            >
                {items}
            </ul>
        </div>
    );
};
