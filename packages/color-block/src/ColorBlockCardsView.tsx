/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';

import {
    Button,
    ButtonStyle,
    IconPlus,
    IconSize,
    IconTrash,
    RichTextEditor,
    Tooltip,
    TooltipPosition,
    useCopy,
} from '@frontify/fondue';
import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { ColorBlockCardsViewProps } from './types';
import { mapColorSpaces } from './helpers/mapColorSpaces';
import { ColorsBlockColorPicker } from './components/ColorsBlockColorPicker';

export const ColorBlockCardsView: FC<ColorBlockCardsViewProps> = ({
    colors,
    colorSpaces,
    isEditing,
}: ColorBlockCardsViewProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const { copy, status } = useCopy();

    return (
        <div className="tw-grid tw-gap-4 tw-grid-cols-4">
            {colors?.map((item) => (
                <div
                    key={item}
                    className={joinClassNames([
                        "tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded before:tw-absolute before:tw-top-0 before:tw-left-0 before:tw-z-[1] before:tw-w-full before:tw-h-full before:tw-content-[''] before:tw-rounded before:tw-shadow-inset-full before:tw-transition-all",
                        isEditing && 'hover:before:tw-shadow-inset-hover-strong',
                        !isEditing && 'hover:before:tw-shadow-inset-hover-weak',
                    ])}
                >
                    <div className="tw-relative tw-w-full tw-h-[60px] tw-bg-black-warm tw-shadow-inset-bottom">
                        {isEditing && (
                            <div
                                className={joinClassNames([
                                    'tw-absolute tw-z-[2] tw-hidden tw-top-1 tw-right-1',
                                    isEditing && 'group-hover:tw-block',
                                ])}
                            >
                                <Button icon={<IconTrash size={IconSize.Size20} />} style={ButtonStyle.Secondary} />
                            </div>
                        )}
                    </div>

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
                                                    <div>#100100</div>
                                                    <span className="tw-text-black-50">
                                                        {status === 'idle' && 'Click to copy'}
                                                        {status === 'success' && 'Copied!'}
                                                    </span>
                                                </>
                                            }
                                            triggerElement={
                                                <div
                                                    className="tw-relative tw-z-[1] tw-cursor-pointer tw-text-s tw-text-black-80"
                                                    onClick={() => copy('test')}
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
            ))}

            {isEditing && (
                <div className="tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded before:tw-absolute before:tw-top-0 before:tw-left-0 before:tw-z-[2] before:tw-w-full before:tw-h-full before:tw-content-[''] before:tw-rounded before:tw-shadow-inset-full">
                    <ColorsBlockColorPicker onSelect={(value) => console.log(value)}>
                        <div className="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-[60px] tw-cursor-pointer tw-text-black tw-bg-gray-add-button tw-shadow-inset-card-add">
                            <IconPlus size={IconSize.Size24} />
                        </div>
                    </ColorsBlockColorPicker>

                    <div className="tw-pt-4 tw-px-6 tw-pb-5">
                        <div className="tw-relative tw-z-[1] tw-w-[100px] tw-mb-3 tw-text-m tw-text-black tw-font-bold">
                            <RichTextEditor
                                designTokens={designTokens ?? undefined}
                                readonly={!isEditing}
                                placeholder="Color Name"
                            />
                        </div>

                        {colorSpaces?.map((colorSpaceID: string) => {
                            const mappedColorSpace = mapColorSpaces(colorSpaceID);

                            return (
                                <div key={colorSpaceID} className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0">
                                    <div className="tw-mr-1 tw-text-s tw-text-black-50">{mappedColorSpace.value}</div>

                                    <div className="tw-text-s tw-text-black-50">{mappedColorSpace.placeholder}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
