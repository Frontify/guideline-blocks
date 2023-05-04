/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';

import { IconArrowMove16, IconDotsHorizontal16, IconTrashBin16, merge, useCopy } from '@frontify/fondue';
import {
    BlockItemWrapper,
    getBackgroundColorStyles,
    getBorderStyles,
    getRadiusStyles,
    hasRichTextValue,
    joinClassNames,
} from '@frontify/guideline-blocks-shared';

import { AnimationCurve, CardProps, SortableCardProps } from '../types';
import { DEFAULT_ANIMATION_CANVAS_VIEWBOX } from '../constants';
import { AnimationCanvas, AnimationCurveFlyout, CardText } from './';

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            appBridge,
            animationCurve,
            isEditing,
            blockSettings,
            designTokens,
            onUpdate,
            onDelete,
            setCanvasHeight,
            transformStyle = {},
            draggableProps = {},
            isDragging = false,
            replaceWithPlaceholder = false,
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = useState(false);
        const [isEditFlyoutOpen, setIsEditFlyoutOpen] = useState(false);
        const [localAnimationCurve, setLocalAnimationCurve] = useState<AnimationCurve>(animationCurve);
        const {
            hasBorder,
            backgroundColor,
            borderStyle,
            borderWidth,
            borderColor,
            hasRadius,
            radiusChoice,
            radiusValue,
            hasGrid,
            hasEndpoints,
            lineColor,
            endpointsColor,
            gridColor,
            hasMotion,
            hasParameter,
            hasDuration,
            hasBackground,
        } = blockSettings;

        const { title, description, animationFunction } = localAnimationCurve;
        const { parameters, duration } = animationFunction;
        const { copy, status } = useCopy();
        const isCopied = status === 'success';

        const onTitleChange = (title: string) => {
            setLocalAnimationCurve({ ...localAnimationCurve, title });
            onUpdate(animationCurve.id, { title });
        };
        const onDescriptionChange = (description: string) => {
            setLocalAnimationCurve({ ...localAnimationCurve, description });
            onUpdate(animationCurve.id, { description });
        };
        return (
            <div
                ref={ref}
                className="tw-bg-base"
                style={{ ...transformStyle, ...(!isDragging ? { zIndex: undefined } : {}) }}
            >
                <BlockItemWrapper
                    isDragging={isDragging}
                    shouldHideWrapper={replaceWithPlaceholder || !isEditing}
                    shouldHideComponent={replaceWithPlaceholder}
                    toolbarItems={[
                        { icon: <IconArrowMove16 />, tooltip: 'Drag to move', draggableProps },
                        {
                            icon: <IconTrashBin16 />,
                            tooltip: 'Delete Item',
                            onClick: () => onDelete(animationCurve.id),
                        },
                        {
                            icon: <IconDotsHorizontal16 />,
                            tooltip: 'Edit Item',
                            onClick: () => setIsEditFlyoutOpen(true),
                        },
                    ]}
                    toolbarFlyoutItems={[]}
                >
                    <div
                        data-test-id="animation-curve-card"
                        onMouseEnter={!isEditFlyoutOpen ? () => setIsHovered(true) : undefined}
                        // onMouseLeave={!isEditFlyoutOpen ? () => setIsHovered(false) : undefined}
                        className={joinClassNames([
                            (hasBackground || hasBorder) && 'tw-overflow-hidden',
                            'tw-flex tw-flex-col tw-relative tw-bg-base',
                        ])}
                        style={{
                            ...(hasBorder && getBorderStyles(borderStyle, borderWidth, borderColor)),
                            ...getRadiusStyles(radiusChoice, hasRadius, radiusValue),
                        }}
                    >
                        <AnimationCurveFlyout
                            animationCurve={localAnimationCurve}
                            isFlyoutOpen={isEditFlyoutOpen}
                            onSave={(id) => {
                                onUpdate(id, localAnimationCurve);
                                setIsEditFlyoutOpen(false);
                                setIsHovered(false);
                            }}
                            onCancel={() => {
                                setIsEditFlyoutOpen(false);
                                setIsHovered(false);
                            }}
                            onOpenChange={(isOpen) => {
                                setIsEditFlyoutOpen(isOpen);
                                if (!isOpen) {
                                    setIsHovered(false);
                                }
                            }}
                            onAnimationCurveChange={setLocalAnimationCurve}
                        />
                        <div
                            data-test-id="animation-curves-canvas-wrapper"
                            className={merge([(hasBorder || hasBackground) && 'tw-px-5 tw-py-4'])}
                            style={{
                                ...(hasBackground && getBackgroundColorStyles(backgroundColor)),
                                ...(hasBackground &&
                                    !hasBorder &&
                                    getRadiusStyles(radiusChoice, hasRadius, radiusValue)),
                            }}
                        >
                            <AnimationCanvas
                                animationFunction={animationFunction}
                                showGrid={hasGrid}
                                showEndPoints={hasEndpoints}
                                lineColor={lineColor}
                                endpointColor={endpointsColor}
                                gridColor={gridColor}
                                viewBox={DEFAULT_ANIMATION_CANVAS_VIEWBOX}
                                shouldAnimate={isHovered && hasMotion}
                                setCanvasHeight={setCanvasHeight}
                                title={
                                    title && hasRichTextValue(title)
                                        ? JSON.parse(title)[0].children[0].text
                                        : 'Animation Curve'
                                }
                            />
                        </div>
                        <CardText
                            appBridge={appBridge}
                            title={title ?? ''}
                            description={description ?? ''}
                            hasBorder={hasBorder}
                            designTokens={designTokens}
                            setTitle={onTitleChange}
                            setDescription={onDescriptionChange}
                            updateValueOnChange={false}
                            isEditing={isEditing}
                        />
                        <div className={merge([hasBorder && 'tw-px-4', 'tw-text-s tw-test-text tw-pb-4'])}>
                            {hasParameter && (
                                <p
                                    data-test-id="animation-curve-card-parameters"
                                    className={joinClassNames([
                                        'tw-flex tw-items-center tw-my-0.5',
                                        isCopied ? 'tw-cursor-auto' : 'tw-cursor-copy',
                                    ])}
                                    onClick={() => copy(JSON.stringify(parameters))}
                                >
                                    {`${parameters['x1']}, `} {`${parameters['y1']}, `} {`${parameters['x2']}, `}
                                    {`${parameters['y2']}, `}
                                </p>
                            )}
                            {hasDuration && <p data-test-id="animation-curve-card-duration">Duration: {duration} s</p>}
                        </div>
                    </div>
                </BlockItemWrapper>
                <div
                    className={joinClassNames([
                        !replaceWithPlaceholder && 'tw-hidden',
                        'tw-absolute tw-h-full tw-left-0 tw-top-0 tw-w-full tw-border-2 tw-border-box-selected-strong tw-border-dashed tw-rounded-[4px] tw-bg-box-selected-hover',
                    ])}
                />
            </div>
        );
    }
);

Card.displayName = 'Card';

export const SortableCard = (props: SortableCardProps) => {
    const { animationCurve, isEditing } = props;
    const { id } = animationCurve;
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });

    const transformStyle = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
        transition,
        zIndex: isDragging ? 2 : 1,
    };

    const draggableProps = isEditing ? { ...attributes, ...listeners } : {};

    return (
        <Card
            ref={setNodeRef}
            {...props}
            isDragging={isDragging}
            replaceWithPlaceholder={isDragging}
            transformStyle={transformStyle}
            draggableProps={draggableProps}
        />
    );
};
