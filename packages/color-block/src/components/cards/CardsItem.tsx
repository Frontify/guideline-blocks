/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';

import {
    Button,
    ButtonStyle,
    IconSize,
    IconTrash,
    RichTextEditor,
    Tooltip,
    TooltipPosition,
    useCopy,
} from '@frontify/fondue';
import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { ItemProps } from '../../types';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';

export const CardsItem: FC<ItemProps> = ({ color, colorSpaces, isEditing }) => {
    const { designTokens } = useGuidelineDesignTokens();

    const { copy, status } = useCopy();

    return (
        <div
            className={joinClassNames([
                "tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded before:tw-absolute before:tw-top-0 before:tw-left-0 before:tw-z-[1] before:tw-w-full before:tw-h-full before:tw-content-[''] before:tw-rounded before:tw-shadow-inset-full before:tw-transition-all",
                isEditing && 'hover:before:tw-shadow-inset-hover-strong',
                !isEditing && 'hover:before:tw-shadow-inset-hover-weak',
            ])}
        >
            {!isEditing ? (
                <Tooltip
                    withArrow
                    position={TooltipPosition.Right}
                    hoverDelay={0}
                    content={
                        <>
                            <div>Color Name</div>
                            <div>{color}</div>
                            <span className="tw-text-black-50">
                                {status === 'error' && 'Error copying. Try again.'}
                                {status === 'idle' && 'Click to copy'}
                                {status === 'success' && 'Copied!'}
                            </span>
                        </>
                    }
                    triggerElement={
                        <div
                            className="tw-relative tw-z-[1] tw-w-full tw-h-[60px] tw-cursor-pointer tw-shadow-inset-bottom"
                            style={{
                                backgroundColor: color,
                            }}
                            onClick={() => copy(color)}
                        ></div>
                    }
                />
            ) : (
                <div
                    className="tw-relative tw-w-full tw-h-[60px] tw-shadow-inset-bottom"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <div
                        className={joinClassNames([
                            'tw-absolute tw-z-[2] tw-hidden tw-top-1 tw-right-1',
                            isEditing && 'group-hover:tw-block',
                        ])}
                    >
                        <Button icon={<IconTrash size={IconSize.Size20} />} style={ButtonStyle.Secondary} />
                    </div>
                </div>
            )}

            <div className="tw-pt-4 tw-px-6 tw-pb-5">
                <div className="tw-relative tw-z-[1] tw-w-[100px] tw-mb-3 tw-text-m tw-text-black tw-font-bold">
                    <RichTextEditor designTokens={designTokens ?? undefined} readonly={!isEditing} />
                </div>

                {colorSpaces?.map((colorSpaceID: string) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceID);

                    return (
                        <div key={colorSpaceID} className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0">
                            <div className="tw-mr-1 tw-text-s tw-text-black-70">{mappedColorSpace.value}</div>

                            {!isEditing ? (
                                <Tooltip
                                    withArrow
                                    position={TooltipPosition.Right}
                                    hoverDelay={0}
                                    content={
                                        <>
                                            <div>Color Name</div>
                                            <div>{color}</div>
                                            <span className="tw-text-black-50">
                                                {status === 'idle' && 'Click to copy'}
                                                {status === 'success' && 'Copied!'}
                                            </span>
                                        </>
                                    }
                                    triggerElement={
                                        <div
                                            className="tw-relative tw-z-[1] tw-cursor-pointer tw-text-s tw-text-black-80"
                                            onClick={() => copy(color)}
                                        >
                                            {mappedColorSpace.placeholder}
                                        </div>
                                    }
                                />
                            ) : (
                                <div className="tw-text-s tw-text-black-80">{mappedColorSpace.placeholder}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
