/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { ReactElement } from 'react';
import { getRadiusValue } from './helpers';
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

    const splittedItems = chars.split(',');
    const items = splittedItems.map((char, index) => {
        const isFirstChar = index === 0;
        const isSixthChar = index === 5;
        const isBottomLeftChar = index === splittedItems.length - 6;
        const isBottomRightChar = index === splittedItems.length - 1 && (index + 1) % 6 === 0;
        const isLetter = char.length === 1 && char.match(/[A-Z]/);
        return (
            <li
                key={index}
                data-test-id="glyphs-item"
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
                    ...(isFirstChar && {
                        borderTopLeftRadius: getRadiusValue(radiusChoice, hasRadius, radiusValue),
                    }),
                    ...(isSixthChar && {
                        borderTopRightRadius: getRadiusValue(radiusChoice, hasRadius, radiusValue),
                    }),
                    ...(isBottomLeftChar && {
                        borderBottomLeftRadius: getRadiusValue(radiusChoice, hasRadius, radiusValue),
                    }),
                    ...(isBottomRightChar && {
                        borderBottomRightRadius: getRadiusValue(radiusChoice, hasRadius, radiusValue),
                    }),
                }}
            >
                {char}
                {isLetter && char.toLowerCase()}
            </li>
        );
    });

    return (
        <ul
            data-test-id="glyphs-block"
            className="tw-grid tw-grid-cols-6"
            style={{
                fontWeight: blockSettings.fontWeight,
                fontSize: blockSettings.fontSize,
                fontFamily: fontFamily || 'inherit',
                color: toRgbaString(fontColor),
                ...(hasBorder && {
                    gap: borderWidth,
                    padding: borderWidth,
                }),
            }}
        >
            {items}
        </ul>
    );
};
