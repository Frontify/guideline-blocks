/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Badge,
    BadgeEmphasis,
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
import { TooltipContent } from '../TooltipContent';
import { ColorsBlockColorPicker } from '../ColorsBlockColorPicker';

export const ListItem = ({ color, colorSpaces, isEditing, onUpdate, onDelete }: ItemProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const { copy, status } = useCopy();

    return (
        <div className="tw-group tw-relative tw-flex tw-shadow-t-inner-line tw-transition-all last:tw-border-b last:tw-border-black/[.1] hover:tw-shadow-t-inner-line-strong">
            {!isEditing ? (
                <Tooltip
                    withArrow
                    position={TooltipPosition.Right}
                    hoverDelay={0}
                    content={<TooltipContent color={color.name || ''} status={status} />}
                    triggerElement={
                        <div
                            className="tw-w-[120px] tw-h-full tw-min-h-[60px] tw-mr-9 tw-cursor-pointer tw-shadow-t-inner-line tw-transition-all group-hover:tw-shadow-t-inner-line-strong"
                            style={{
                                backgroundColor: `#${color.hex}`,
                            }}
                            onClick={() => copy(color.name || '')}
                        ></div>
                    }
                />
            ) : (
                <ColorsBlockColorPicker
                    currentColor={color}
                    onConfirm={(colorPatch) => {
                        console.log('CALLING ON CONFIRM');
                        onUpdate(colorPatch);
                    }}
                >
                    <div
                        className="tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-shadow-t-inner-line tw-transition-all group-hover:tw-shadow-t-inner-line-strong"
                        style={{
                            backgroundColor: `#${color.hex}`,
                        }}
                    ></div>
                </ColorsBlockColorPicker>
            )}

            <div className="tw-flex tw-items-center tw-w-[100px] tw-py-4 tw-mr-12 tw-text-m tw-text-black tw-font-bold">
                <RichTextEditor designTokens={designTokens ?? undefined} readonly={!isEditing} />
            </div>

            <div className="tw-flex tw-items-center tw-flex-wrap tw-gap-y-2.5 tw-w-list-color-types tw-py-5">
                {colorSpaces?.map((colorSpaceID: string) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceID);

                    return (
                        <div key={colorSpaceID} className="tw-flex tw-items-center tw-w-1/3">
                            <Badge size="s" emphasis={BadgeEmphasis.None}>
                                {mappedColorSpace.value}
                            </Badge>

                            {!isEditing ? (
                                <Tooltip
                                    withArrow
                                    position={TooltipPosition.Right}
                                    hoverDelay={0}
                                    content={<TooltipContent color={color.name || ''} status={status} />}
                                    triggerElement={
                                        <div
                                            className="tw-ml-3 tw-cursor-pointer tw-text-s tw-text-black-80"
                                            onClick={() => copy(color.name || '')}
                                        >
                                            {mappedColorSpace.placeholder}
                                        </div>
                                    }
                                />
                            ) : (
                                <div className="tw-ml-3 tw-text-s tw-text-black-80">{mappedColorSpace.placeholder}</div>
                            )}
                        </div>
                    );
                })}

                {isEditing && (
                    <div
                        className={joinClassNames([
                            'tw-absolute tw-hidden tw-top-1/2 tw-right-3 tw-translate-y-[-50%]',
                            isEditing && 'group-hover:tw-block',
                        ])}
                    >
                        <Button
                            icon={<IconTrash size={IconSize.Size20} />}
                            style={ButtonStyle.Secondary}
                            onClick={() => {
                                onDelete(color.id);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
