/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_VISIBLE_STYLE, merge } from '@frontify/fondue';
import { TileHorizontalAlignment, TileImagePositioning, TileType, TileVerticalAlignment } from '../types';
import { twBorderMap, twHorizontalAligmentMap, twPositioningMap, twVerticalAlignmentMap } from './mappings';

export const getTextWrapperClassName = (
    type: TileType,
    verticalAlignment: TileVerticalAlignment,
    horizontalAlignment: TileHorizontalAlignment,
    positioning: TileImagePositioning
) => {
    const classes = ['tw-flex tw-flex-col tw-gap-y-1 tw-z-[2] tw-break-all tw-w-full'];

    if (type === TileType.ImageText) {
        if (positioning === TileImagePositioning.Behind) {
            classes.push(
                'tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0',
                twVerticalAlignmentMap[verticalAlignment]
            );
        } else {
            classes.push(twHorizontalAligmentMap[horizontalAlignment]);
        }
        if (positioning === TileImagePositioning.Left || positioning === TileImagePositioning.Right) {
            classes.push('tw-basis-2/3');
        }
    }

    return merge(classes);
};

export const getTileClassName = (
    type: TileType,
    replaceWithPlaceholder: boolean,
    isToolbarFocused: boolean,
    isDragPreview: boolean,
    positioning: TileImagePositioning
) =>
    merge([
        'tw-flex tw-overflow-hidden tw-h-full tw-relative tw-bg-base tw-w-full',
        type === TileType.ImageText && twPositioningMap[positioning],
        replaceWithPlaceholder && 'tw-invisible',
        (isToolbarFocused || isDragPreview) && 'tw-outline tw-outline-box-selected-inverse tw-outline-2',
    ]);

export const getImageWrapperClassName = (type: TileType, positioning: TileImagePositioning) =>
    merge([
        'tw-min-w-0 tw-flex tw-flex-initial tw-items-center tw-justify-center tw-bg-base-alt tw-w-full',
        type === TileType.ImageText &&
            (positioning === TileImagePositioning.Left || positioning === TileImagePositioning.Right) &&
            'tw-basis-1/3',
    ]);

export const getImageClassName = (type: TileType, height: string, positioning: TileImagePositioning) =>
    merge([
        'tw-z-[1] tw-min-w-0 tw-flex-initial',
        height === 'auto' && type === TileType.ImageText && 'tw-aspect-square',
        height === 'auto' && type === TileType.Image && 'tw-aspect-[3/4]',
        type === TileType.ImageText ? `${twBorderMap[positioning]} tw-border-line-weak` : undefined,
        height !== 'auto' && 'tw-w-full',
    ]);

export const getImagePlaceholderClassName = (
    type: TileType,
    height: string,
    positioning: TileImagePositioning,
    isEditing: boolean
) =>
    merge([
        getImageClassName(type, height, positioning),
        'tw-bg-base-alt tw-w-full tw-flex tw-justify-center tw-items-center tw-text-text-disabled tw-transition',
        FOCUS_VISIBLE_STYLE,
        'tw-ring-inset',
        isEditing ? 'hover:tw-text-text-x-weak' : 'tw-cursor-default',
        type === TileType.ImageText &&
            (positioning === TileImagePositioning.Left || positioning === TileImagePositioning.Right) &&
            'tw-basis-1/3',
    ]);

export const getLinkClassName = () =>
    merge(['tw-h-full tw-block tw-w-full tw-absolute tw-top-0 tw-left-0 tw-z-[3]', FOCUS_VISIBLE_STYLE]);
