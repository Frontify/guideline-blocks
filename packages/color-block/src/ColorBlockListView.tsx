import { FC } from 'react';
import {
    Badge,
    BadgeEmphasis,
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

interface ColorBlockListViewProps {
    colors: string[];
    colorspaces: string[];
    isEditing: boolean;
}

export const ColorBlockListView: FC<ColorBlockListViewProps> = ({
    colors,
    colorspaces,
    isEditing,
}: ColorBlockListViewProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const copyToClipboard = async (textToCopy: string) => {
        await navigator.clipboard.writeText(textToCopy);
    };

    return (
        <>
            {colors?.map((item) => (
                <div
                    key={item}
                    className={joinClassNames([
                        "tw-group tw-relative tw-w-full tw-flex before:tw-absolute before:tw-top-0 before:tw-left-0 before:tw-w-full before:tw-h-full before:tw-content-[''] before:tw-shadow-inset-top before:tw-transition-all",
                        isEditing && 'hover:before:tw-shadow-inset-hover',
                        !isEditing &&
                            'last:after:tw-absolute last:after:tw-top-0 last:after:tw-left-0 last:after:tw-w-full last:after:tw-h-full last:after:tw-content-[""] last:after:tw-shadow-inset-bottom hover:tw-bg-black-0',
                    ])}
                >
                    <div className="tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-bg-black-warm"></div>

                    <div className="tw-flex tw-items-center tw-w-[100px] tw-py-4 tw-mr-12 tw-text-m tw-font-bold">
                        <RichTextEditor designTokens={designTokens ?? undefined} readonly={!isEditing} />
                    </div>

                    <div className="tw-flex tw-items-center tw-flex-wrap tw-gap-y-2.5 tw-w-list-color-types tw-py-5">
                        {colorspaces?.map((color: string) => (
                            <div key={color} className="tw-flex tw-items-center tw-w-1/3">
                                <Badge size="s" emphasis={BadgeEmphasis.None}>
                                    HEX
                                </Badge>

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
                                                className="tw-relative tw-z-[1] tw-ml-3 tw-cursor-pointer tw-text-s tw-text-black-80"
                                                onClick={() => copyToClipboard('test')}
                                            >
                                                #100100
                                            </div>
                                        }
                                    />
                                ) : (
                                    <div className="tw-ml-3 tw-text-s tw-text-black-80">#100100</div>
                                )}
                            </div>
                        ))}

                        {isEditing && (
                            <div
                                className={joinClassNames([
                                    'tw-absolute tw-hidden tw-top-1/2 tw-right-3 tw-translate-y-[-50%]',
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
                </div>
            ))}

            {isEditing && (
                <div
                    key={4}
                    className="tw-relative tw-w-full tw-flex before:tw-absolute before:tw-top-0 before:tw-left-0 before:tw-w-full before:tw-h-full before:tw-content-[''] before:tw-shadow-inset-top after:tw-absolute after:tw-top-0 after:tw-left-0 after:tw-w-full after:tw-h-full after:tw-content-[''] after:tw-shadow-inset-bottom"
                >
                    <div className="tw-flex tw-justify-center tw-items-center tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-text-black tw-bg-[#F1F1F1] tw-shadow-inset-add">
                        <IconPlus size={IconSize.Size24}></IconPlus>
                    </div>

                    <div className="tw-flex tw-items-center tw-w-[100px] tw-py-4 tw-mr-12 tw-text-m tw-font-bold">
                        <RichTextEditor
                            designTokens={designTokens ?? undefined}
                            readonly={!isEditing}
                            placeholder="Color Name"
                        />
                    </div>

                    <div className="tw-flex tw-items-center tw-flex-wrap tw-gap-y-2.5 tw-w-list-color-types tw-py-5">
                        {colorspaces?.map((color: string) => (
                            <div key={color} className="tw-flex tw-items-center tw-w-1/3">
                                <Badge size="s" emphasis={BadgeEmphasis.None}>
                                    HEX
                                </Badge>

                                <div className="tw-ml-3 tw-text-s tw-text-black-50">#hexhex</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
