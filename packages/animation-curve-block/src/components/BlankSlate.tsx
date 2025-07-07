/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { IconPlus24, generateRandomId } from '@frontify/fondue';
import { BlockInjectButton } from '@frontify/guideline-blocks-settings';

import { AnimationCurve, BlankSlateProps } from '../types';
import { BLANK_SLATE_INITIAL_HEIGHT, DEFAULT_ANIMATION_FUNCTION } from '../constants';
import { AnimationCurveFlyout, CardText } from './';

export const BlankSlate = ({
    appBridge,
    content,
    hasBorder,
    canvasHeight,
    setLocalItems,
    setBlockSettings,
}: BlankSlateProps) => {
    const height = canvasHeight !== 0 ? `${canvasHeight}px` : BLANK_SLATE_INITIAL_HEIGHT;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

    const defaultAnimationCurve: AnimationCurve = {
        id: generateRandomId(),
        title: '',
        description: '',
        animationFunction: DEFAULT_ANIMATION_FUNCTION,
    };

    const [animationCurve, setAnimationCurve] = useState<AnimationCurve>(defaultAnimationCurve);
    const addAnimationCurve = async () => {
        const updatedItems = [...(content ?? []), { ...animationCurve, id: generateRandomId() }];
        setLocalItems(updatedItems);
        await setBlockSettings({
            content: updatedItems,
        });
        setAnimationCurve(defaultAnimationCurve);
        setIsFlyoutOpen(false);
        setTitle('');
        setDescription('');
    };

    useEffect(() => {
        setAnimationCurve({ ...animationCurve, title, description });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, description]);

    return (
        <div data-test-id="blank-slate">
            <AnimationCurveFlyout
                key={animationCurve.id}
                animationCurve={animationCurve}
                onSave={addAnimationCurve}
                onCancel={() => setIsFlyoutOpen(false)}
                onOpenChange={(isOpen) => setIsFlyoutOpen(isOpen)}
                onAnimationCurveChange={setAnimationCurve}
                isFlyoutOpen={isFlyoutOpen}
            />
            <div style={{ height }}>
                <BlockInjectButton
                    label="Add animation curve"
                    icon={<IconPlus24 />}
                    withMenu={false}
                    onClick={() => setIsFlyoutOpen(true)}
                    fillParentContainer
                />
            </div>

            <CardText
                appBridge={appBridge}
                title={title}
                description={description}
                hasBorder={hasBorder}
                setDescription={setDescription}
                setTitle={setTitle}
                isEditing
            />
        </div>
    );
};
