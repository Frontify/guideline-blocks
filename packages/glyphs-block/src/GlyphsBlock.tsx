/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';
import { toRgbaString } from '@frontify/guideline-blocks-settings';
import { ReactElement } from 'react';
import { getRadiusValue } from './helpers';
import { DEFAULT_CHARS } from './settings';
import { BlockProps, Settings } from './types';
import { StyleProvider } from '@frontify/guideline-blocks-shared';

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

    const ITEMS_PER_ROW = 6;
    const splittedItems = chars.split(',').map((char) => char.trim());
    const numberOfRows = Math.ceil(splittedItems.length / ITEMS_PER_ROW);
    const lastRowFirstItem = (numberOfRows - 1) * ITEMS_PER_ROW;

    const items = splittedItems.map((char, index) => {
        const isBottomRightChar = index === splittedItems.length - 1 && (index + 1) % ITEMS_PER_ROW === 0;

        const style = {
            ...(hasBackground && {
                backgroundColor: toRgbaString(backgroundColor),
            }),
            ...(hasBorder && {
                outline: `${toRgbaString(borderColor)} ${borderStyle} ${borderWidth}`,
            }),
            ...(index === 0 && {
                borderTopLeftRadius: getRadiusValue(radiusChoice, hasRadius, radiusValue),
            }),
            ...(index === ITEMS_PER_ROW - 1 && {
                borderTopRightRadius: getRadiusValue(radiusChoice, hasRadius, radiusValue),
            }),
            ...(index === lastRowFirstItem && {
                borderBottomLeftRadius: getRadiusValue(radiusChoice, hasRadius, radiusValue),
            }),
            ...(isBottomRightChar && {
                borderBottomRightRadius: getRadiusValue(radiusChoice, hasRadius, radiusValue),
            }),
        };

        return (
            <li
                key={index}
                data-test-id="glyphs-item"
                className="tw-aspect-square tw-flex tw-items-center tw-justify-center tw-text-center"
                style={style}
            >
                {char}
            </li>
        );
    });

    return (
        <div className="glyps-block">
            <StyleProvider>
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
            </StyleProvider>
        </div>
    );
};
