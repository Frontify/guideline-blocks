/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Radius } from '@frontify/guideline-blocks-shared';
import {
    TileDisplay,
    TileHeight,
    TileImagePositioning,
    TilePadding,
    TileSpacing,
    TileVerticalAlignment,
} from '../types';

export const twPositioningMap: Record<TileImagePositioning, string> = {
    [TileImagePositioning.Top]: 'tw-flex-col',
    [TileImagePositioning.Bottom]: 'tw-flex-col-reverse',
    [TileImagePositioning.Left]: 'tw-flex-row',
    [TileImagePositioning.Right]: 'tw-flex-row-reverse',
    [TileImagePositioning.Behind]: '',
};

export const twBorderMap: Record<TileImagePositioning, string> = {
    [TileImagePositioning.Top]: 'tw-border-b',
    [TileImagePositioning.Bottom]: 'tw-border-t',
    [TileImagePositioning.Left]: 'tw-border-r',
    [TileImagePositioning.Right]: 'tw-border-l',
    [TileImagePositioning.Behind]: '',
};

export const twVerticalAlignmentMap: Record<TileVerticalAlignment, string> = {
    [TileVerticalAlignment.Top]: 'tw-justify-start',
    [TileVerticalAlignment.Center]: 'tw-justify-center',
    [TileVerticalAlignment.Bottom]: 'tw-justify-end',
};

export const spacingMap: Record<TileSpacing, string> = {
    [TileSpacing.None]: '0px',
    [TileSpacing.Small]: '10px',
    [TileSpacing.Medium]: '30px',
    [TileSpacing.Large]: '50px',
};

export const heightMap: Record<TileHeight, string> = {
    [TileHeight.Auto]: 'auto',
    [TileHeight.Small]: '150px',
    [TileHeight.Medium]: '200px',
    [TileHeight.Large]: '300px',
};

export const paddingMap: Record<TilePadding, string> = {
    [TilePadding.Small]: '12px',
    [TilePadding.Medium]: '30px',
    [TilePadding.Large]: '50px',
};

export const radiusMap: Record<Radius, string> = {
    [Radius.None]: '0px',
    [Radius.Small]: '2px',
    [Radius.Medium]: '4px',
    [Radius.Large]: '12px',
};

export const objectFitMap: Record<TileDisplay, 'cover' | 'contain'> = {
    [TileDisplay.Fill]: 'cover',
    [TileDisplay.Fit]: 'contain',
};
