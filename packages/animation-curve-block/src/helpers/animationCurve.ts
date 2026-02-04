/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AnimationCurve } from '../types';

export const roundAnimationCurveParameters = (animationCurve: AnimationCurve): AnimationCurve => {
    const {
        animationFunction: { parameters },
    } = animationCurve;

    const roundedParameters = {
        ...parameters,
        x1: roundTwoDecimals(parameters.x1),
        x2: roundTwoDecimals(parameters.x2),
        y1: roundTwoDecimals(parameters.y1),
        y2: roundTwoDecimals(parameters.y2),
    };

    const roundedAnimationFunction = {
        ...animationCurve.animationFunction,
        parameters: roundedParameters,
    };

    return {
        ...animationCurve,
        animationFunction: roundedAnimationFunction,
    };
};

export const roundTwoDecimals = (value: number): number => {
    return Math.round(value * 100) / 100;
};
