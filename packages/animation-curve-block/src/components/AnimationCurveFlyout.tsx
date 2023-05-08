/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import {
    ButtonEmphasis,
    ButtonStyle,
    Dropdown,
    Flyout,
    FlyoutFooter,
    FlyoutPlacement,
    IconCaretRight16,
    IconCheckMark16,
    TextInput,
    TextInputType,
    Validation,
} from '@frontify/fondue';

import { DROPDOWN_MENU_ITEMS } from '../constants';
import { roundAnimationCurveParameters } from '../helpers';
import {
    AnimationCurve,
    AnimationCurveFlyoutProps,
    AnimationCurveParametersPatch,
    AnimationCurveType,
    AnimationFunctionPatch,
    defaultAnimationCurveTypeValues,
} from '../types';

import { AnimationCanvas } from './';

export const validateXValue = (value: number): Validation => {
    return value < 0 || value > 1 ? Validation.Error : Validation.Default;
};

export const AnimationCurveFlyout = ({
    animationCurve,
    isFlyoutOpen,
    onSave,
    onCancel,
    onOpenChange,
    onAnimationCurveUpdate,
    onAnimationCurveChange,
}: AnimationCurveFlyoutProps) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [x1Validation, setX1Validation] = useState<Validation>(Validation.Default);
    const [x2Validation, setX2Validation] = useState<Validation>(Validation.Default);
    const [localAnimationFunction, setLocalAnimationFunction] = useState(animationCurve.animationFunction);

    useEffect(() => {
        const { x1, x2 } = localAnimationFunction.parameters;
        setX1Validation(validateXValue(x1));
        setX2Validation(validateXValue(x2));
    }, [localAnimationFunction]);

    const handleSave = () => {
        onSave(animationCurve.id, { ...animationCurve });
    };

    const updateLocalCurve = (animationCurvePatch: AnimationCurve): void => {
        const roundedAnimationCurve = roundAnimationCurveParameters(animationCurvePatch);

        setLocalAnimationFunction(animationCurvePatch.animationFunction);
        if (![x1Validation, x2Validation].includes(Validation.Error)) {
            onAnimationCurveUpdate &&
                onAnimationCurveUpdate(animationCurve.id, {
                    ...animationCurve,
                    ...roundedAnimationCurve,
                });

            onAnimationCurveChange && onAnimationCurveChange({ ...animationCurve, ...animationCurvePatch });
        }
    };

    const updateAnimationFunction = (animationFunctionPatch: AnimationFunctionPatch): void => {
        updateLocalCurve({
            ...animationCurve,
            animationFunction: {
                ...animationCurve.animationFunction,
                ...animationFunctionPatch,
            },
        });
    };

    const updateAnimationCurveParameters = (parametersPatch: AnimationCurveParametersPatch): void => {
        updateAnimationFunction({
            parameters: {
                ...animationCurve.animationFunction.parameters,
                ...parametersPatch,
            },
        });
    };

    return (
        <Flyout
            trigger={<></>}
            isOpen={isFlyoutOpen}
            onOpenChange={onOpenChange}
            onCancel={onCancel}
            legacyFooter={false}
            fixedFooter={
                <FlyoutFooter
                    buttons={[
                        {
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Default,
                            children: 'Cancel',
                            onClick: onCancel,
                        },
                        {
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Strong,
                            icon: <IconCheckMark16 />,
                            children: 'Save',
                            onClick: handleSave,
                            disabled: [x1Validation, x2Validation].includes(Validation.Error),
                        },
                    ]}
                />
            }
            placement={FlyoutPlacement.BottomLeft}
        >
            <div className="tw-p-6 tw-w-[498px]">
                <Dropdown
                    activeItemId={localAnimationFunction.type}
                    onChange={(id) =>
                        updateAnimationFunction({
                            type: id as AnimationCurveType,
                            parameters:
                                id === AnimationCurveType.Custom
                                    ? { ...animationCurve.animationFunction.parameters }
                                    : defaultAnimationCurveTypeValues[id as AnimationCurveType],
                        })
                    }
                    menuBlocks={DROPDOWN_MENU_ITEMS}
                />
                <div className="tw-relative tw-h-[200px] tw-w-[450px] tw-my-3">
                    <div
                        className="tw-absolute tw-w-full tw-bg-base-alt tw-border tw-border-line"
                        style={{ zIndex: isInputFocused ? 0 : 1 }}
                    >
                        <AnimationCanvas
                            animationFunction={localAnimationFunction}
                            setAnimationFunction={updateAnimationFunction}
                            showGrid={false}
                            showEndPoints={false}
                            showHandles
                            viewBox={{
                                width: 450,
                                height: 200,
                            }}
                            shouldAnimate={false}
                        />
                    </div>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                    <div className="tw-flex tw-justify-start tw-items-center tw-gap-1">
                        <div className="tw-relative tw-w-[74px]">
                            <TextInput
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                onChange={(value) => updateAnimationCurveParameters({ x1: Number(value) || 0 })}
                                type={TextInputType.Number}
                                value={localAnimationFunction.parameters.x1.toString()}
                                validation={x1Validation}
                                required
                                decorator="X"
                            />
                        </div>
                        <div className="tw-relative tw-w-[74px]">
                            <TextInput
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                onChange={(value) => updateAnimationCurveParameters({ y1: Number(value) || 0 })}
                                type={TextInputType.Number}
                                value={localAnimationFunction.parameters.y1.toString()}
                                required
                                decorator="Y"
                            />
                        </div>
                        <IconCaretRight16 />
                        <div className="tw-relative tw-w-[74px]">
                            <TextInput
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                onChange={(value) => updateAnimationCurveParameters({ x2: Number(value) || 0 })}
                                type={TextInputType.Number}
                                value={localAnimationFunction.parameters.x2.toString()}
                                validation={x2Validation}
                                required
                                decorator="X"
                            />
                        </div>
                        <div className="tw-relative tw-w-[74px]">
                            <TextInput
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                onChange={(value) => updateAnimationCurveParameters({ y2: Number(value) || 0 })}
                                type={TextInputType.Number}
                                value={localAnimationFunction.parameters.y2.toString()}
                                required
                                decorator="Y"
                            />
                        </div>
                    </div>
                    <div className="tw-w-20 tw-relative">
                        <TextInput
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                            onChange={(value) =>
                                updateAnimationFunction({
                                    ...animationCurve.animationFunction,
                                    duration: Number(value) || 0,
                                })
                            }
                            type={TextInputType.Number}
                            value={animationCurve.animationFunction.duration.toString()}
                        />
                        <span className="tw-absolute tw-right-3 tw-top-2.5 tw-text-s tw-text-text-weak">sec</span>
                    </div>
                </div>
            </div>
        </Flyout>
    );
};
