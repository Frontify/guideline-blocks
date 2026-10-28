/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { type GradientColor, GradientHeight, GradientOrientation } from './types';

import definition from './index';

export default { title: 'Blocks/Gradient', ...blockMeta(definition) };

const brandGradient: GradientColor[] = [
    { color: { red: 79, green: 70, blue: 229, alpha: 1, name: 'Indigo' }, position: 0 },
    { color: { red: 6, green: 182, blue: 212, alpha: 1, name: 'Cyan' }, position: 100 },
];

const sunsetGradient: GradientColor[] = [
    { color: { red: 250, green: 204, blue: 21, alpha: 1, name: 'Sun' }, position: 0 },
    { color: { red: 249, green: 115, blue: 22, alpha: 1, name: 'Tangerine' }, position: 40 },
    { color: { red: 219, green: 39, blue: 119, alpha: 1, name: 'Magenta' }, position: 100 },
];

export const Empty: BlockStory = {};

export const TwoColors: BlockStory = {
    args: { gradientColors: brandGradient },
};

export const ThreeColorsWithCss: BlockStory = {
    args: { gradientColors: sunsetGradient, displayCss: true, heightSimple: GradientHeight.Large },
};

export const Vertical: BlockStory = {
    args: { gradientColors: sunsetGradient, orientationSimple: GradientOrientation.Vertical },
};

export const CustomAngleAndHeight: BlockStory = {
    args: {
        gradientColors: [
            ...brandGradient.slice(0, 1),
            { color: { red: 16, green: 185, blue: 129, alpha: 0.6, name: 'Emerald 60%' }, position: 100 },
        ],
        isOrientationCustom: true,
        orientationCustom: 135,
        isHeightCustom: true,
        heightCustom: '160px',
    },
};
