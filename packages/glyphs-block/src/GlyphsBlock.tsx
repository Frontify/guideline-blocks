/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useBlockSettings } from "@frontify/app-bridge";
import { Color } from "@frontify/fondue";
import { ReactElement } from "react";
import {
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_BORDER_COLOR,
    DEFAULT_BORDER_STYLE,
    DEFAULT_BORDER_WIDTH,
    DEFAULT_CHARS,
    DEFAULT_COLOR,
    DEFAULT_FONT_FAMILY,
    DEFAULT_FONT_SIZE,
    DEFAULT_FONT_WEIGHT,
    FULL_WIDTH,
} from "./settings";

type Settings = {
    width: string;
    backgroundColor: Color;
    chars: string;
    color: Color;
    fontWeight: string;
    fontSize: string;
    fontFamily: string;
    borderStyle: string;
    borderWidth: string;
    borderColor: Color;
};

type BlockProps = {
    appBridge: AppBridgeBlock;
};

const toRgbaString = (color: Color): string => {
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
};

const toFontStack = (fontFamily: string): string => {
    const fontStack = [];

    if (fontFamily !== "default") {
        fontStack.push(fontFamily);
    }

    fontStack.push("inherit");

    return fontStack.join(",");
};

export const GlyphsBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        width = FULL_WIDTH,
        backgroundColor = DEFAULT_BACKGROUND_COLOR,
        chars = DEFAULT_CHARS,
        fontWeight = DEFAULT_FONT_WEIGHT,
        fontSize = DEFAULT_FONT_SIZE,
        color = DEFAULT_COLOR,
        fontFamily = DEFAULT_FONT_FAMILY,
        borderStyle = DEFAULT_BORDER_STYLE,
        borderWidth = DEFAULT_BORDER_WIDTH,
        borderColor = DEFAULT_BORDER_COLOR,
    } = blockSettings;

    const containerCustomStyles = {
        width,
        fontWeight,
        fontSize,
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

    const items = (chars as string).split(",").map((char, index) => {
        if (!isNaN(Number(char))) {
            return (
                <li key={index} style={itemCustomStyles}>
                    {char}
                </li>
            );
        } else {
            return (
                <li key={index} style={itemCustomStyles}>
                    {char}
                    {char.toLowerCase()}
                </li>
            );
        }
    });

    return (
        <div style={containerCustomStyles}>
            <ul style={listCustomStyles}>{items}</ul>
        </div>
    );
};
