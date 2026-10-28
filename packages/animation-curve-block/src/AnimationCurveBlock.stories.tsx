/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GutterSpacing, TextStyles, convertToRteValue } from '@frontify/guideline-blocks-settings';
import { type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { type AnimationCurve, AnimationCurveType, defaultAnimationCurveTypeValues } from './types';

import definition from './index';

export default { title: 'Blocks/Animation Curve', ...blockMeta(definition) };

const curve = (id: string, title: string, description: string, type: AnimationCurveType, duration: number) =>
    ({
        id,
        title: convertToRteValue(TextStyles.heading3, title),
        description: convertToRteValue('p', description),
        animationFunction: { type, parameters: defaultAnimationCurveTypeValues[type], duration },
    }) satisfies AnimationCurve;

const motionSystem: AnimationCurve[] = [
    curve(
        'enter',
        'Enter',
        'Elements entering the screen decelerate into place.',
        AnimationCurveType.EaseOutCubic,
        0.3
    ),
    curve('exit', 'Exit', 'Elements leaving the screen accelerate away.', AnimationCurveType.EaseInCubic, 0.2),
    curve('move', 'Move', 'Elements moving on screen ease in and out.', AnimationCurveType.EaseInOutQuart, 0.4),
    curve('bounce', 'Playful', 'Reserved for celebratory moments.', AnimationCurveType.EaseOutBack, 0.6),
];

const INDIGO = { red: 79, green: 70, blue: 229, alpha: 1 };

export const Empty: BlockStory = {};

export const MotionSystem: BlockStory = {
    args: { content: motionSystem },
};

export const TwoColumnsWithGridAndCss: BlockStory = {
    args: {
        content: motionSystem.slice(0, 2),
        columns: 2,
        spacingChoice: GutterSpacing.L,
        hasGrid: true,
        displayCss: true,
    },
};

export const BrandColoredWithMotion: BlockStory = {
    args: {
        content: motionSystem,
        columns: 4,
        lineColor: INDIGO,
        endpointsColor: INDIGO,
        hasMotion: true,
        hasBackground: false,
        hasBorder: true,
        borderWidth: '1px',
    },
};
