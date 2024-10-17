/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    AutoformatPlugin,
    BoldPlugin,
    CheckboxListPlugin,
    CodePlugin,
    ItalicPlugin,
    OrderedListPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';
import {
    AllTextStylePlugins,
    AllTextStyles,
    ButtonPlugin,
    LinkPlugin,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import { CornerRadius, Settings, paddingValues, radiusValues } from '../types';
import { CSSProperties } from 'react';

const textStylePlugins = [
    new SoftBreakPlugin(),
    new TextStylePlugin({
        textStyles: AllTextStylePlugins,
    }),
];
const alignmentPlugins = [
    new AlignLeftPlugin({
        validTypes: AllTextStyles,
    }),
    new AlignRightPlugin({
        validTypes: AllTextStyles,
    }),
    new AlignCenterPlugin({
        validTypes: AllTextStyles,
    }),
    new AlignJustifyPlugin({
        validTypes: AllTextStyles,
    }),
];
const markStylesPlugins = [new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()];

export const titlePlugins = new PluginComposer();
titlePlugins
    .setPlugin(textStylePlugins)
    .setPlugin(markStylesPlugins)
    .setPlugin([...alignmentPlugins, new ResetFormattingPlugin()]);

export const getCaptionPlugins = (appBridge: AppBridgeBlock) => {
    return new PluginComposer()
        .setPlugin(textStylePlugins)
        .setPlugin([
            ...markStylesPlugins,
            new LinkPlugin({ appBridge }),
            new ButtonPlugin({ appBridge }),
            new CodePlugin(),
        ])
        .setPlugin([
            ...alignmentPlugins,
            new UnorderedListPlugin(),
            new CheckboxListPlugin(),
            new OrderedListPlugin(),
            new ResetFormattingPlugin(),
            new AutoformatPlugin(),
        ]);
};

export const getTotalImagePadding = (blockSettings: Settings): CSSProperties => {
    const border = blockSettings.hasBorder ? blockSettings.borderWidth?.replace('px', '') : undefined;
    const totalPadding = Number(border ?? 0) + Number(getPadding(blockSettings)?.replace('px', '') ?? 0);

    return {
        paddingTop: `${totalPadding}px`,
        paddingRight: `${totalPadding}px`,
    };
};

const getPadding = (blockSettings: Settings): string =>
    blockSettings.hasCustomPadding ? blockSettings.paddingCustom : paddingValues[blockSettings.paddingChoice];

const getBorderRadius = (blockSettings: Settings) => {
    const borderRadius = blockSettings.hasRadius_cornerRadius
        ? blockSettings.radiusValue_cornerRadius
        : radiusValues[blockSettings.radiusChoice_cornerRadius];

    return borderRadius ?? radiusValues[CornerRadius.None];
};

export const getImageWrapperStyle = (blockSettings: Settings): CSSProperties => {
    const border = blockSettings.hasBorder
        ? `${blockSettings.borderWidth} ${blockSettings.borderStyle} ${toRgbaString(blockSettings.borderColor)}`
        : undefined;

    return {
        padding: getPadding(blockSettings),
        border,
        borderRadius: blockSettings.hasBackground ? getBorderRadius(blockSettings) : undefined,
        backgroundColor: blockSettings.hasBackground ? toRgbaString(blockSettings.backgroundColor) : undefined,
    };
};

export const getImageStyle = (blockSettings: Settings): CSSProperties => {
    return {
        borderRadius: !blockSettings.hasBackground ? getBorderRadius(blockSettings) : undefined,
    };
};

export const getFrameInterpolationSetting = (blockSettings: Settings): boolean => {
    const frameInterpolation = blockSettings.frameInterpolation === 'yes' ? true : false;
    return frameInterpolation;
};

// for use with checklist
export const getPlaybackSettings = (blockSettings: Settings): { playOnHover: boolean; autoplay: boolean } => {
    const playOnHover = blockSettings.playback?.includes('hover') ? true : false;
    const autoplay = blockSettings.playback?.includes('autoplay') ? true : false;
    return { playOnHover, autoplay };
};
