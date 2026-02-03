/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/sortable';
import { merge } from '@frontify/fondue';
import { IconArrowMove, IconDotsHorizontal, IconTrashBin } from '@frontify/fondue/icons';
import {
    BlockItemWrapper,
    getBackgroundColorStyles,
    getBorderStyles,
    getRadiusStyles,
    hasRichTextValue,
    joinClassNames,
} from '@frontify/guideline-blocks-settings';
import { CssValueDisplay } from '@frontify/guideline-blocks-shared';
import { forwardRef, useState } from 'react';

import {
    DEFAULT_ANIMATION_CANVAS_VIEWBOX,
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_BORDER_COLOR,
    DEFAULT_GRID_COLOR,
    DEFAULT_LINE_COLOR,
} from '../constants';
import { type AnimationCurve, type CardProps, type SortableCardProps } from '../types';

import { AnimationCanvas, AnimationCurveFlyout, CardText } from './';

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            appBridge,
            animationCurve,
            isEditing,
            blockSettings,
            onUpdate,
            onDelete,
            setCanvasHeight,
            transformStyle = {},
            draggableProps = {},
            setActivatorNodeRef,
            isDragging = false,
            replaceWithPlaceholder = false,
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = useState(false);
        const [isEditFlyoutOpen, setIsEditFlyoutOpen] = useState(false);
        const initialAnimationCurve = animationCurve;
        const [localAnimationCurve, setLocalAnimationCurve] = useState<AnimationCurve>(initialAnimationCurve);
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
            displayCss,
        } = blockSettings;

        const { title, description, animationFunction } = localAnimationCurve;
        const { parameters, duration } = animationFunction;

        const onTitleChange = (title: string) => {
            setLocalAnimationCurve({ ...localAnimationCurve, title });
            onUpdate(animationCurve.id, { title });
        };
        const onDescriptionChange = (description: string) => {
            setLocalAnimationCurve({ ...localAnimationCurve, description });
            onUpdate(animationCurve.id, { description });
        };

        const parametersString = `${parameters.x1}, ${parameters.y1}, ${parameters.x2}, ${parameters.y2}`;

        const textShown = hasRichTextValue(title) || hasRichTextValue(description) || isEditing;

        return (
            <div
                ref={ref}
                className={isDragging ? 'tw-bg-base' : ''}
                style={{ ...transformStyle, ...(!isDragging ? { zIndex: undefined } : {}) }}
            >
                <BlockItemWrapper
                    isDragging={isDragging}
                    shouldHideWrapper={replaceWithPlaceholder || !isEditing}
                    shouldHideComponent={replaceWithPlaceholder}
                    toolbarItems={[
                        { type: 'dragHandle', icon: <IconArrowMove size={16} />, draggableProps, setActivatorNodeRef },
                        {
                            type: 'button',
                            icon: <IconTrashBin size={16} />,
                            tooltip: 'Delete Item',
                            onClick: () => onDelete(animationCurve.id),
                        },
                        {
                            type: 'button',
                            icon: <IconDotsHorizontal size={16} />,
                            tooltip: 'Edit Item',
                            onClick: () => setIsEditFlyoutOpen(true),
                        },
                    ]}
                    shouldBeShown={isEditFlyoutOpen || isDragging}
                >
                    <div
                        data-test-id="animation-curve-card"
                        onMouseEnter={!isEditFlyoutOpen ? () => setIsHovered(true) : undefined}
                        onMouseLeave={!isEditFlyoutOpen ? () => setIsHovered(false) : undefined}
                        className={joinClassNames([
                            (textShown || hasParameter) && 'tw-pb-4',
                            'tw-flex tw-flex-col tw-relative',
                        ])}
                        style={{
                            ...(hasBorder &&
                                getBorderStyles(borderStyle, borderWidth, borderColor || DEFAULT_BORDER_COLOR)),
                            ...getRadiusStyles(radiusChoice, hasRadius, radiusValue),
                        }}
                    >
                        <AnimationCurveFlyout
                            animationCurve={localAnimationCurve}
                            initialAnimationFunction={initialAnimationCurve.animationFunction}
                            isFlyoutOpen={isEditFlyoutOpen}
                            onSave={(id) => {
                                onUpdate(id, localAnimationCurve);
                                setIsEditFlyoutOpen(false);
                                setIsHovered(false);
                            }}
                            onCancel={() => {
                                setLocalAnimationCurve(initialAnimationCurve);
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
                            className={merge([
                                (hasBorder || hasBackground) && 'tw-px-5 tw-py-4',
                                hasBorder && '!tw-rounded-b-none',
                            ])}
                            style={{
                                ...(hasBackground && {
                                    ...getBackgroundColorStyles(backgroundColor || DEFAULT_BACKGROUND_COLOR),
                                    ...getRadiusStyles(radiusChoice, hasRadius, radiusValue),
                                }),
                            }}
                        >
                            <AnimationCanvas
                                animationFunction={animationFunction}
                                showGrid={hasGrid}
                                showEndPoints={hasEndpoints}
                                lineColor={lineColor || DEFAULT_LINE_COLOR}
                                endpointColor={endpointsColor || DEFAULT_LINE_COLOR}
                                gridColor={gridColor || DEFAULT_GRID_COLOR}
                                viewBox={DEFAULT_ANIMATION_CANVAS_VIEWBOX}
                                shouldAnimate={isHovered && hasMotion}
                                setCanvasHeight={setCanvasHeight}
                                title={
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                    title && hasRichTextValue(title)
                                        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                          JSON.parse(title)[0].children[0].text
                                        : 'Animation Curve'
                                }
                            />
                        </div>
                        {textShown && (
                            <CardText
                                appBridge={appBridge}
                                title={title ?? ''}
                                description={description ?? ''}
                                hasBorder={hasBorder}
                                setTitle={onTitleChange}
                                setDescription={onDescriptionChange}
                                isEditing={isEditing}
                            />
                        )}
                        <div className={merge([hasBorder && 'tw-px-4', 'tw-text-s tw-test-text'])}>
                            {hasParameter && (
                                <p
                                    data-test-id="animation-curve-card-parameters"
                                    className={merge(['tw-flex tw-items-center tw-my-0.5', !textShown && 'tw-mt-4'])}
                                >
                                    {parametersString}
                                </p>
                            )}
                            {hasDuration && <p data-test-id="animation-curve-card-duration">Duration: {duration} s</p>}
                        </div>

                        {displayCss && <CssValueDisplay cssValue={`cubic-bezier(${parametersString})`} />}
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
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
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
            setActivatorNodeRef={setActivatorNodeRef}
            replaceWithPlaceholder={isDragging}
            transformStyle={transformStyle}
            draggableProps={draggableProps}
        />
    );
};
