/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, MenuBlock } from '@frontify/fondue';
import { AnimationCurveType, AnimationFunction, Size, defaultAnimationCurveTypeValues } from './types';

export const BLANK_SLATE_INITIAL_HEIGHT = '82px';

export const DEFAULT_ANIMATION_FUNCTION: AnimationFunction = {
    type: AnimationCurveType.Linear,
    parameters: defaultAnimationCurveTypeValues[AnimationCurveType.Linear],
    duration: 1.0,
};

export const DEFAULT_ANIMATION_CANVAS_VIEWBOX: Size = {
    width: 350,
    height: 200,
};

export const DEFAULT_LINE_COLOR: Color = {
    red: 45,
    green: 50,
    blue: 50,
};

export const DROPDOWN_MENU_ITEMS: MenuBlock[] = [
    {
        id: 'standard',
        ariaLabel: 'Standard',
        menuItems: [
            {
                id: AnimationCurveType.Linear,
                title: 'Linear',
            },
            {
                id: AnimationCurveType.EaseIn,
                title: 'Ease in',
            },
            {
                id: AnimationCurveType.EaseOut,
                title: 'Ease out',
            },
            {
                id: AnimationCurveType.EaseInOut,
                title: 'Ease in out',
            },
            {
                id: AnimationCurveType.Custom,
                title: 'Custom',
            },
        ],
    },
    {
        id: 'easeInGroup',
        ariaLabel: 'Ease in',
        menuItems: [
            {
                id: AnimationCurveType.EaseInSine,
                title: 'Ease in (Sine)',
            },
            {
                id: AnimationCurveType.EaseInQuad,
                title: 'Ease in (Quad)',
            },
            {
                id: AnimationCurveType.EaseInCubic,
                title: 'Ease in (Cubic)',
            },
            {
                id: AnimationCurveType.EaseInQuart,
                title: 'Ease in (Quart)',
            },
            {
                id: AnimationCurveType.EaseInQuint,
                title: 'Ease in (Quint)',
            },
            {
                id: AnimationCurveType.EaseInExpo,
                title: 'Ease in (Expo)',
            },
            {
                id: AnimationCurveType.EaseInCirc,
                title: 'Ease in (Circ)',
            },
            {
                id: AnimationCurveType.EaseInBack,
                title: 'Ease in (Back)',
            },
        ],
    },
    {
        id: 'easeOutGroup',
        ariaLabel: 'Ease out',
        menuItems: [
            {
                id: AnimationCurveType.EaseOutSine,
                title: 'Ease out (Sine)',
            },
            {
                id: AnimationCurveType.EaseOutQuad,
                title: 'Ease out (Quad)',
            },
            {
                id: AnimationCurveType.EaseOutCubic,
                title: 'Ease out (Cubic)',
            },
            {
                id: AnimationCurveType.EaseOutQuart,
                title: 'Ease out (Quart)',
            },
            {
                id: AnimationCurveType.EaseOutQuint,
                title: 'Ease out (Quint)',
            },
            {
                id: AnimationCurveType.EaseOutExpo,
                title: 'Ease out (Expo)',
            },
            {
                id: AnimationCurveType.EaseOutCirc,
                title: 'Ease out (Circ)',
            },
            {
                id: AnimationCurveType.EaseOutBack,
                title: 'Ease out (Back)',
            },
        ],
    },
    {
        id: 'easeInOutGroup',
        ariaLabel: 'Ease in out',
        menuItems: [
            {
                id: AnimationCurveType.EaseInOutSine,
                title: 'Ease in out (Sine)',
            },
            {
                id: AnimationCurveType.EaseInOutQuad,
                title: 'Ease in out (Quad)',
            },
            {
                id: AnimationCurveType.EaseInOutCubic,
                title: 'Ease in out (Cubic)',
            },
            {
                id: AnimationCurveType.EaseInOutQuart,
                title: 'Ease in out (Quart)',
            },
            {
                id: AnimationCurveType.EaseInOutQuint,
                title: 'Ease in out (Quint)',
            },
            {
                id: AnimationCurveType.EaseInOutExpo,
                title: 'Ease in out (Expo)',
            },
            {
                id: AnimationCurveType.EaseInOutCirc,
                title: 'Ease in out (Circ)',
            },
            {
                id: AnimationCurveType.EaseInOutBack,
                title: 'Ease in out (Back)',
            },
        ],
    },
];

export const gridClasses: Record<number, string> = {
    1: 'tw-grid-cols-1',
    2: 'tw-grid-cols-1 xs:tw-grid-cols-2',
    3: 'tw-grid-cols-1 xs:tw-grid-cols-2 md:tw-grid-cols-3',
    4: 'tw-grid-cols-1 xs:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4',
};
