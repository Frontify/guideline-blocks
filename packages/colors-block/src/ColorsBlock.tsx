/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import 'tailwindcss/tailwind.css';

import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { Badge, BadgeEmphasis, IconPlus, IconSize, RichTextEditor } from '@frontify/fondue';
import { FC } from 'react';
import { FULL_WIDTH } from './settings';

type Settings = {
    width: string;
    nameValue: string;
    descriptionValue: string;
    colorspaces: any;
};

type Props = {
    appBridge: AppBridgeNative;
};

export const ColorsBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const { width = FULL_WIDTH, nameValue, descriptionValue, colorspaces } = blockSettings;

    console.log('colorspaces', colorspaces);

    const customStyles = {
        width,
    };

    const onNameChange = (value: string): Promise<void> => setBlockSettings({ nameValue: value });
    const onDescriptionChange = (value: string): Promise<void> => setBlockSettings({ descriptionValue: value });

    const { designTokens } = useGuidelineDesignTokens();

    console.log('🚀 ~ designTokens', designTokens);

    const demoColors = [1, 2, 3];

    return (
        <div style={customStyles}>
            <div>
                <div className="tw-w-full tw-mb-3 tw-text-l tw-font-bold">
                    <RichTextEditor
                        designTokens={designTokens ?? undefined}
                        onTextChange={onNameChange}
                        readonly={!isEditing}
                        value={nameValue}
                        placeholder={isEditing ? 'Color pallete name' : ''}
                    />
                </div>

                <div className="tw-w-full tw-mb-12 tw-text-sm">
                    <RichTextEditor
                        designTokens={designTokens ?? undefined}
                        onTextChange={onDescriptionChange}
                        readonly={!isEditing}
                        value={descriptionValue}
                        placeholder={isEditing ? 'Describe this color palette here' : ''}
                    />
                </div>

                {demoColors.map((item) => (
                    <div
                        key={item}
                        className="tw-relative tw-w-full tw-flex tw-items-center tw-shadow-inner tw-transition-shadow hover:tw-cursor-pointer hover:tw-shadow-3xl"
                    >
                        <div
                            className="tw-absolute tw-t-0 tw-l-0 tw-w-full tw-h-full"
                            style={{
                                boxShadow: 'inset 0 1px 0 0 rgba(8, 8, 8, 0.1)',
                            }}
                        ></div>

                        <div
                            className="tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-bg-black"
                            style={{
                                width: '120px',
                                marginRight: '36px',
                                backgroundColor: '#E6DCDC',
                            }}
                        ></div>

                        <div
                            className="tw-max-w-[100px] tw-mr-12"
                            style={{
                                width: '100px',
                                marginRight: '48px',
                            }}
                        >
                            <RichTextEditor designTokens={designTokens ?? undefined} readonly={!isEditing} />
                        </div>

                        <div className="tw-flex tw-flex-wrap tw-gap-y-2 tw-grow">
                            {colorspaces.map((color: any) => (
                                <div key={color} className="tw-flex tw-items-center tw-w-1/3">
                                    <Badge size={'s'} emphasis={BadgeEmphasis.None}>
                                        HEX
                                    </Badge>

                                    <div
                                        className="tw-ml-3 tw-text-sm tw-leading-4 tw-text-weak"
                                        style={{
                                            marginLeft: '12px',
                                        }}
                                    >
                                        #100100
                                    </div>
                                </div>
                            ))}

                            {/* <div className="tw-flex tw-items-center tw-w-1/3">
                                <Badge emphasis={BadgeEmphasis.None}>RGB</Badge>
                                <div
                                    className="tw-ml-3 tw-text-sm tw-leading-4 tw-text-weak"
                                    style={{
                                        marginLeft: '12px',
                                    }}
                                >
                                    100/100/100
                                </div>
                            </div>
                            <div className="tw-flex tw-items-center tw-w-1/3">
                                <Badge emphasis={BadgeEmphasis.None}>CMYK</Badge>
                                <div
                                    className="tw-ml-3 tw-text-sm tw-leading-4 tw-text-weak"
                                    style={{
                                        marginLeft: '12px',
                                    }}
                                >
                                    0/23/90/1
                                </div>
                            </div> */}
                        </div>
                    </div>
                ))}

                <div
                    key={4}
                    className="tw-relative tw-w-full tw-flex tw-items-center tw-border-transparent hover:tw-border"
                >
                    <div
                        className="tw-absolute tw-t-0 tw-l-0 tw-w-full tw-h-full tw-content-none"
                        style={{
                            boxShadow: 'inset 0 1px 0 0 rgba(8, 8, 8, 0.1)',
                        }}
                    ></div>

                    <div
                        className="tw-absolute tw-t-0 tw-l-0 tw-w-full tw-h-full tw-content-none"
                        style={{
                            boxShadow: 'inset 0 -1px 0 0 rgba(8, 8, 8, 0.1)',
                        }}
                    ></div>

                    <div
                        className="tw-flex tw-justify-center tw-items-center tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-bg-black"
                        style={{
                            width: '120px',
                            marginRight: '36px',
                            backgroundColor: '#000',
                        }}
                    >
                        <IconPlus size={IconSize.Size20}></IconPlus>
                    </div>

                    <div
                        className="tw-max-w-[100px] tw-mr-12 tw-bg-blue"
                        style={{
                            width: '100px',
                            marginRight: '48px',
                        }}
                    >
                        <RichTextEditor readonly={true} placeholder="Color Name" />
                    </div>

                    <div className="tw-flex tw-grow">
                        <div className="tw-flex tw-items-center tw-w-1/3">
                            <Badge emphasis={BadgeEmphasis.None}>HEX</Badge>

                            <div
                                className="tw-ml-3 tw-text-sm tw-leading-4 tw-text-disabled"
                                style={{
                                    marginLeft: '12px',
                                }}
                            >
                                #hexhex
                            </div>
                        </div>

                        <div className="tw-flex tw-items-center tw-w-1/3">
                            <Badge emphasis={BadgeEmphasis.None}>RGB</Badge>

                            <div
                                className="tw-ml-3 tw-text-sm tw-leading-4 tw-text-disabled"
                                style={{
                                    marginLeft: '12px',
                                }}
                            >
                                rrr/ggg/bbb
                            </div>
                        </div>

                        <div className="tw-flex tw-items-center tw-w-1/3">
                            <Badge emphasis={BadgeEmphasis.None}>CMYK</Badge>

                            <div
                                className="tw-ml-3 tw-text-sm tw-leading-4 tw-text-disabled"
                                style={{
                                    marginLeft: '12px',
                                }}
                            >
                                cc/mm/yy/kk
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
