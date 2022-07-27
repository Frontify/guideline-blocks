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
} from '@frontify/fondue';
import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

interface ColorBlockDropsViewProps {
    colors: string[];
    colorspaces: string[];
    isEditing: boolean;
}

export const ColorBlockDropsView: FC<ColorBlockDropsViewProps> = ({
    colors,
    colorspaces,
    isEditing,
}: ColorBlockDropsViewProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const copyToClipboard = async (textToCopy: string) => {
        await navigator.clipboard.writeText(textToCopy);
    };

    return (
        <div className="tw-flex tw-flex-wrap tw-gap-y-8">
            {colors?.map((item) => (
                <div key={item} className="tw-group tw-flex tw-flex-col tw-items-center tw-w-1/6">
                    <div className="tw-relative tw-w-[100px] tw-h-[100px] tw-rounded-full tw-mb-3 tw-bg-black-warm tw-transition-all group-hover:tw-shadow-inset-hover">
                        {isEditing && (
                            <div
                                className={joinClassNames([
                                    'tw-absolute tw-hidden tw-top-[-0.25rem] tw-right-[-0.25rem]',
                                    isEditing && 'group-hover:tw-block',
                                ])}
                            >
                                <Button
                                    icon={<IconTrash size={IconSize.Size20}></IconTrash>}
                                    style={ButtonStyle.Secondary}
                                ></Button>
                            </div>
                        )}
                    </div>

                    <div className="tw-flex tw-w-[100px] tw-mb-3 tw-text-m tw-font-bold tw-text-center">
                        <RichTextEditor designTokens={designTokens ?? undefined} readonly={!isEditing} />
                    </div>

                    {colorspaces?.map((color: string) => (
                        <div key={color} className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0">
                            <div className="tw-mr-1 tw-text-s tw-text-black-70">HEX</div>

                            {!isEditing ? (
                                <Tooltip
                                    withArrow
                                    position={TooltipPosition.Right}
                                    hoverDelay={0}
                                    content={
                                        <>
                                            Color Name <br />
                                            #100100 <br />
                                            <span className="tw-text-black-50">Click to copy</span>
                                        </>
                                    }
                                    triggerElement={
                                        <div
                                            className="tw-relative tw-z-[1] tw-cursor-pointer tw-text-s tw-text-black-80"
                                            onClick={() => copyToClipboard('test')}
                                        >
                                            #100100
                                        </div>
                                    }
                                />
                            ) : (
                                <div className="tw-text-s tw-text-black-80">#100100</div>
                            )}
                        </div>
                    ))}
                </div>
            ))}

            {isEditing && (
                <div className="tw-flex tw-flex-col tw-items-center tw-w-1/6">
                    <div className="tw-flex tw-justify-center tw-items-center tw-w-[100px] tw-h-[100px] tw-rounded-full tw-mb-3 tw-text-black tw-bg-[#F1F1F1]">
                        <IconPlus size={IconSize.Size24}></IconPlus>
                    </div>

                    <div className="tw-flex tw-w-[100px] tw-mb-3 tw-text-m tw-font-bold tw-text-center">
                        <RichTextEditor
                            designTokens={designTokens ?? undefined}
                            readonly={!isEditing}
                            placeholder="Color Name"
                        />
                    </div>

                    {colorspaces?.map((color: string) => (
                        <div key={color} className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0">
                            <div className="tw-mr-1 tw-text-s tw-text-black-50">HEX</div>

                            <div className="tw-text-s tw-text-black-50">#100100</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
