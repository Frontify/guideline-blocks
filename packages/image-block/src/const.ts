/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Autosizing,
    CaptionPosition,
    HorizontalAlignment,
    ImageAspectRatio,
    Padding,
    Ratio,
    VerticalAlignment,
} from './types';

export const DEFAULT_BACKGROUND_COLOR = { red: 255, green: 255, blue: 255 };
export const DEFAULT_BORDER_COLOR = {
    red: 234,
    green: 235,
    blue: 235,
    alpha: 1,
};

export const DEFAULT_IMAGE_BLOCK_SETTINGS = {
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    borderColor: DEFAULT_BORDER_COLOR,
    hasBackground: false,
    hasCustomPadding: false,
    paddingChoice: Padding.None,
    positioning: CaptionPosition.Below,
    ratio: Ratio.Ratio2To1,
    hasCustomRatio: false,
    ratioChoice: ImageAspectRatio.RatioNone,
    autosizing: Autosizing.None,
    alignment: VerticalAlignment.Center,
    horizontalAlignment: HorizontalAlignment.Center,
    assetViewerEnabled: true,
    hasLink: false,
};
