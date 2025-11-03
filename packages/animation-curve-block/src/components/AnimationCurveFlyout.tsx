/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { Button, Flyout, Select, Text, TextInput } from '@frontify/fondue/components';

import { DEFAULT_ANIMATION_FUNCTION, DROPDOWN_MENU_ITEMS } from '../constants';
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
import { IconCaretRight, IconCheckMark } from '@frontify/fondue/icons';

export const validateXValue = (value: number) => {
    return value < 0 || value > 1 ? 'error' : 'neutral';
};

export const AnimationCurveFlyout = ({
    animationCurve,
    isFlyoutOpen,
    initialAnimationFunction = DEFAULT_ANIMATION_FUNCTION,
    onSave,
    onCancel,
    onOpenChange,
    onAnimationCurveUpdate,
    onAnimationCurveChange,
}: AnimationCurveFlyoutProps) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [x1Validation, setX1Validation] = useState<'error' | 'neutral'>('neutral');
    const [x2Validation, setX2Validation] = useState<'error' | 'neutral'>('neutral');
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
        if (![x1Validation, x2Validation].includes('error')) {
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
        <Flyout.Root open={isFlyoutOpen} onOpenChange={onOpenChange}>
            <Flyout.Trigger>
                <span className="tw-w-top-0 tw-right-0 tw-absolute" />
            </Flyout.Trigger>
            <Flyout.Content maxWidth="500px" padding="comfortable" align="end">
                <Flyout.Body>
                    <div data-overlay-container className="tw-w-full ">
                        <Select
                            defaultValue={String(localAnimationFunction.type)}
                            onSelect={(value) =>
                                updateAnimationFunction({
                                    type: value as AnimationCurveType,
                                    parameters:
                                        value === AnimationCurveType.Custom
                                            ? { ...animationCurve.animationFunction.parameters }
                                            : defaultAnimationCurveTypeValues[value as AnimationCurveType],
                                })
                            }
                        >
                            {DROPDOWN_MENU_ITEMS.map((group) => (
                                <Select.Group key={group.id} groupId={group.id}>
                                    {group.menuItems.map((item) => (
                                        <Select.Item value={String(item.id)} key={item.id}>
                                            {item.title}
                                        </Select.Item>
                                    ))}
                                </Select.Group>
                            ))}
                        </Select>

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
                        <div className="tw-flex tw-items-center tw-justify-between [&_input::-webkit-inner-spin-button]:tw-appearance-none [&_svg]:tw-flex-shrink-0">
                            <div className="tw-flex tw-justify-start tw-items-center tw-gap-1">
                                <div className="tw-relative tw-w-20 tw-flex-grow-0">
                                    <TextInput.Root
                                        onFocus={() => setIsInputFocused(true)}
                                        onBlur={() => setIsInputFocused(false)}
                                        onChange={(event) =>
                                            updateAnimationCurveParameters({ x1: Number(event.target.value) || 0 })
                                        }
                                        type="number"
                                        value={localAnimationFunction.parameters.x1.toString()}
                                        required
                                        status={x1Validation}
                                    >
                                        <TextInput.Slot name="left">
                                            <Text color="weak">X</Text>
                                        </TextInput.Slot>
                                    </TextInput.Root>
                                </div>
                                <div className="tw-relative tw-w-20">
                                    <TextInput
                                        onFocus={() => setIsInputFocused(true)}
                                        onBlur={() => setIsInputFocused(false)}
                                        onChange={(event) =>
                                            updateAnimationCurveParameters({ y1: Number(event.target.value) || 0 })
                                        }
                                        type="number"
                                        value={localAnimationFunction.parameters.y1.toString()}
                                        required
                                    >
                                        <TextInput.Slot name="left">
                                            <Text color="weak">Y</Text>
                                        </TextInput.Slot>
                                    </TextInput>
                                </div>
                                <IconCaretRight size="16" />
                                <div className="tw-relative tw-w-20">
                                    <TextInput
                                        onFocus={() => setIsInputFocused(true)}
                                        onBlur={() => setIsInputFocused(false)}
                                        onChange={(event) =>
                                            updateAnimationCurveParameters({ x2: Number(event.target.value) || 0 })
                                        }
                                        type="number"
                                        value={localAnimationFunction.parameters.x2.toString()}
                                        required
                                        status={x2Validation}
                                    >
                                        <TextInput.Slot name="left">
                                            <Text color="weak">X</Text>
                                        </TextInput.Slot>
                                    </TextInput>
                                </div>
                                <div className="tw-relative tw-w-20">
                                    <TextInput
                                        onFocus={() => setIsInputFocused(true)}
                                        onBlur={() => setIsInputFocused(false)}
                                        onChange={(event) =>
                                            updateAnimationCurveParameters({ y2: Number(event.target.value) || 0 })
                                        }
                                        type="number"
                                        value={localAnimationFunction.parameters.y2.toString()}
                                        required
                                    >
                                        <TextInput.Slot name="left">
                                            <Text color="weak">Y</Text>
                                        </TextInput.Slot>
                                    </TextInput>
                                </div>
                            </div>
                            <div className="tw-w-20 tw-relative">
                                <TextInput
                                    onFocus={() => setIsInputFocused(true)}
                                    onBlur={() => setIsInputFocused(false)}
                                    onChange={(event) =>
                                        updateAnimationFunction({
                                            ...animationCurve.animationFunction,
                                            duration: Number(event.target.value) || 0,
                                        })
                                    }
                                    type="number"
                                    value={animationCurve.animationFunction.duration.toString()}
                                >
                                    <TextInput.Slot name="right">
                                        <Text color="weak">sec</Text>
                                    </TextInput.Slot>
                                </TextInput>
                            </div>
                        </div>
                    </div>
                </Flyout.Body>
                <Flyout.Footer>
                    <Button
                        onPress={() => {
                            setLocalAnimationFunction(initialAnimationFunction);
                            onCancel();
                        }}
                        emphasis="default"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={[x1Validation, x2Validation].includes('error')}
                        onPress={handleSave}
                        emphasis="strong"
                    >
                        <IconCheckMark size="16" /> Save
                    </Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};
