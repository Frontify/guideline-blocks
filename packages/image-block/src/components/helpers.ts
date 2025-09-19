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
import {
    Autosizing,
    CornerRadius,
    HorizontalAlignment,
    ImageAspectRatio,
    ImageInformation,
    Settings,
    VerticalAlignment,
    paddingValues,
    radiusValues,
} from '../types';
import { CSSProperties } from 'react';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR } from '../settings';

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
    const {
        hasCustomRatio,
        ratioCustom,
        ratioChoice,
        hasBackground,
        autosizing,
        borderWidth,
        borderStyle,
        borderColor,
        hasBorder,
        backgroundColor,
    } = blockSettings;
    const ratio = hasCustomRatio ? ratioCustom : ratioChoice;

    const border = hasBorder
        ? `${borderWidth} ${borderStyle} ${toRgbaString(borderColor || DEFAULT_BORDER_COLOR)}`
        : undefined;

    const shouldNotApplyBorderRadius =
        !hasBackground && autosizing !== Autosizing.Fill && ratio !== ImageAspectRatio.RatioNone;

    return {
        padding: getPadding(blockSettings),
        border,
        borderRadius: shouldNotApplyBorderRadius ? undefined : getBorderRadius(blockSettings),
        backgroundColor: hasBackground ? toRgbaString(backgroundColor || DEFAULT_BACKGROUND_COLOR) : undefined,
    };
};

export const getImageStyle = (blockSettings: Settings, imageInformation: ImageInformation): CSSProperties => {
    const { height, focalPointX, focalPointY } = imageInformation;
    return {
        aspectRatio: getImageRatioValue(blockSettings),
        objectFit: getImageObjectFitValue(blockSettings),
        objectPosition: getImageObjectPositionValue(blockSettings, { focalPointX, focalPointY }),
        maxHeight: getMaxHeightValue(blockSettings, height),
    };
};

export const getMaxHeightValue = (blockSettings: Settings, height: number): CSSProperties['maxHeight'] => {
    const aspectRatio = getImageRatioValue(blockSettings);
    const objectFit = getImageObjectFitValue(blockSettings);

    if (aspectRatio === 'auto' && objectFit === 'scale-down') {
        return height;
    }
    return undefined;
};

export const getImageRatioValue = (blockSettings: Settings): CSSProperties['aspectRatio'] => {
    let aspectRatioValue: CSSProperties['aspectRatio'] = 'auto';

    const { hasCustomRatio, ratioCustom, ratioChoice } = blockSettings;
    const ratio = hasCustomRatio ? ratioCustom : ratioChoice;

    if (ratio && ratio !== 'none') {
        aspectRatioValue = ratio.replace(':', '/');
    }

    return aspectRatioValue;
};

export const getImageObjectFitValue = ({ autosizing = Autosizing.None }: Settings): CSSProperties['objectFit'] => {
    const map: Record<Autosizing, CSSProperties['objectFit']> = {
        [Autosizing.None]: 'scale-down',
        [Autosizing.Fit]: 'contain',
        [Autosizing.Fill]: 'cover',
    };

    return map[autosizing];
};

export const getImageObjectPositionValue = (
    {
        alignment: verticalAlignment = VerticalAlignment.Center,
        horizontalAlignment = HorizontalAlignment.Center,
        useFocalPoint,
        autosizing = Autosizing.None,
    }: Settings,
    { focalPointX, focalPointY }: { focalPointX: number; focalPointY: number }
) => {
    if (useFocalPoint && autosizing === Autosizing.Fill) {
        return `${(focalPointX ?? 0.5) * 100}% ${(focalPointY ?? 0.5) * 100}%`;
    }
    return `${verticalAlignment.toLowerCase()} ${horizontalAlignment.toLowerCase()}`;
};
