/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useBlockSettings } from '@frontify/app-bridge';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { ReactElement } from 'react';
import { Settings } from './types';

type BlockProps = {
    appBridge: AppBridgeBlock;
};

const toFontStack = (fontFamily: string): string => {
    const fontStack = [];

    if (fontFamily !== 'default') {
        fontStack.push(fontFamily);
    }

    fontStack.push('inherit');

    return fontStack.join(',');
};

const itemClassNames = 'tw-aspect-square tw-flex tw-items-center tw-justify-center tw-text-center';

export const GlyphsBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { backgroundColor, chars, color, fontFamily, borderStyle, borderWidth, borderColor } = blockSettings;

    const containerCustomStyles = {
        fontWeight: blockSettings.fontWeight,
        fontSize: blockSettings.fontSize,
        fontFamily: toFontStack(fontFamily),
        color: toRgbaString(color),
    };

    const listCustomStyles = {
        gap: borderWidth,
        padding: borderWidth,
    };

    const itemCustomStyles = {
        backgroundColor: toRgbaString(backgroundColor),
        outlineStyle: borderStyle,
        outlineWidth: borderWidth,
        outlineColor: toRgbaString(borderColor),
    };

    const items = (chars as string).split(',').map((char, index) => {
        if (!isNaN(Number(char))) {
            return (
                <li key={index} className={itemClassNames} style={itemCustomStyles}>
                    {char}
                </li>
            );
        } else {
            return (
                <li key={index} className={itemClassNames} style={itemCustomStyles}>
                    {char}
                    {char.toLowerCase()}
                </li>
            );
        }
    });

    return (
        <div data-test-id="glyphs-block" style={containerCustomStyles}>
            <ul className="tw-grid tw-grid-cols-6" style={listCustomStyles}>
                {items}
            </ul>
        </div>
    );
};
