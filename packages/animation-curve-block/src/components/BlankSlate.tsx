/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus } from '@frontify/fondue/icons';
import { BlockInjectButton } from '@frontify/guideline-blocks-settings';
import { useEffect, useState } from 'react';

import { BLANK_SLATE_INITIAL_HEIGHT, DEFAULT_ANIMATION_FUNCTION } from '../constants';
import { type AnimationCurve, type BlankSlateProps } from '../types';

import { AnimationCurveFlyout, CardText } from './';
import { generateRandomId } from '@frontify/guideline-blocks-shared';

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
        <div data-test-id="blank-slate" className="tw-relative">
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
                    icon={<IconPlus size={24} />}
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
