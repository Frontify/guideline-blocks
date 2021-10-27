/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import 'draft-js/dist/Draft.css';
import { ReactElement, FC } from 'react';
import { RichTextEditor, IconApprove, IconRejectCircle, IconSize, TextInput } from '@frontify/arcade';
import { AppBridgeNative } from '@frontify/app-bridge';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge/react';
import { DoDontType, DoDontStyle, DoDontLayout, DoDontSpacing } from './types';

type DosDontsBlockProps = {
    appBridge: AppBridgeNative;
};

type Settings = {
    backgroundColor: string;
    borderColor: string;
    showBorder: boolean;
};

type ItemProps = {
    type: DoDontType;
    style: DoDontStyle;
};

const Item: FC<ItemProps> = ({ itemKey, type, style, doColor, dontColor, setTitle, setContent, title, content }) => {
    const isEditing = useEditorState();

    const headingStyles = (isEditing, type) => {
        if (!isEditing) {
            if (type === DoDontType.Do) {
                return {
                    color: doColor,
                };
            }
            if (type === DoDontType.Dont) {
                return {
                    color: dontColor,
                };
            }
        }
    };

    const dividerStyles = (isEditing, type) => {
        if (!isEditing) {
            if (type === DoDontType.Do) {
                return {
                    backgroundColor: doColor,
                };
            }
            if (type === DoDontType.Dont) {
                return {
                    backgroundColor: dontColor,
                };
            }
        }
    };

    return (
        <div>
            <div style={headingStyles(isEditing, type)} className="tw-flex">
                {style === DoDontStyle.Icons && (
                    <div className="tw-mr-2 tw-w-auto">
                        {type === DoDontType.Do && <IconApprove size={IconSize.Size24} />}
                        {type === DoDontType.Dont && <IconRejectCircle size={IconSize.Size24} />}
                    </div>
                )}
                <div className="tw-w-full">
                    <RichTextEditor
                        onTextChange={(value) => setTitle && setTitle(value, itemKey)}
                        value={title}
                        placeholder="Add a title"
                    />
                </div>
            </div>
            {style === DoDontStyle.Underline && (
                <hr
                    style={dividerStyles(isEditing, type)}
                    className="tw-w-full tw-mt-4 tw-mb-5 tw-h-1 tw-border-none tw-rounded tw-bg-black-40"
                />
            )}
            <div className="tw-mt-2">
                <RichTextEditor
                    onTextChange={(value) => setContent && setContent(value, itemKey)}
                    value={content}
                    placeholder="Add a description"
                />
            </div>
        </div>
    );
};

const spacingClasses: Record<DoDontSpacing, string> = {
    [DoDontSpacing.Small]: 'tw-gap-3',
    [DoDontSpacing.Medium]: 'tw-gap-4',
    [DoDontSpacing.Large]: 'tw-gap-6',
};

const DosDontsBlock: FC<DosDontsBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const { columns, spacing, spacingValue, doColor, dontColor, doTitle } = blockSettings;
    const { layout }: { layout: DoDontLayout } = blockSettings;
    const { style }: { style: DoDontStyle } = blockSettings;
    const { spacingChoice }: { spacingChoice: DoDontSpacing } = blockSettings;

    const setContent = (value, item) => {
        setBlockSettings({
            ...blockSettings,
            itemsContent: {
                ...blockSettings.itemsContent,
                [item]: value,
            },
        });
        console.log('setContent ', blockSettings);
    };

    const setTitle = (value, item) => {
        setBlockSettings({
            ...blockSettings,
            itemsTitle: {
                ...blockSettings.itemsTitle,
                [item]: value,
            },
        });
        console.log('setTitle ', blockSettings);
    };

    const numberOfItems = 4;

    return (
        <div
            className={`tw-grid tw-grid-cols-${columns} ${!spacing && spacingClasses[spacingChoice]}`}
            style={spacing ? { gap: spacingValue } : {}}
        >
            {[...Array(numberOfItems)].map((_, i) => {
                i * i;
                return (
                    <Item
                        key={i}
                        itemKey={i}
                        setContent={setContent}
                        setTitle={setTitle}
                        title={blockSettings.itemsTitle[i]}
                        content={blockSettings.itemsContent[i]}
                        type={i % 2 ? DoDontType.Dont : DoDontType.Do}
                        style={style}
                        doColor={doColor}
                        dontColor={dontColor}
                    />
                );
            })}
        </div>
    );
};

export default DosDontsBlock;
