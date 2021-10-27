/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { debounce } from './utilities/debounce';
import { RichTextEditor, IconApprove, IconRejectCircle, IconSize } from '@frontify/arcade';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { DoDontType, DoDontStyle, DoDontLayout, DoDontSpacing, DoDontContent } from './types';

type DosDontsBlockProps = {
    appBridge: AppBridgeNative;
};

type Settings = {
    columns: number;
    spacing: boolean;
    spacingValue: string;
    doColor: string;
    dontColor: string;
    layout: DoDontLayout;
    style: DoDontStyle;
    spacingChoice: DoDontSpacing;
    items: any;
};

type saveItemProps = {
    itemKey: number;
    value: any;
    type: DoDontContent;
};

type ItemProps = {
    itemKey: number;
    type: DoDontType;
    style: DoDontStyle;
    doColor: string;
    dontColor: string;
    saveItem: any;
    content: { title: any; body: any };
};

const Item: FC<ItemProps> = ({ itemKey, type, style, doColor, dontColor, saveItem, content }) => {
    const isEditing = useEditorState();

    const headingStyles = (isEditing: boolean, type: DoDontType) => {
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
        return {};
    };

    const dividerStyles = (isEditing: boolean, type: DoDontType) => {
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
        return {};
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
                        value={content.title}
                        onTextChange={debounce((value) => saveItem(itemKey, value, DoDontContent.Title), 500)}
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
                    value={content.body}
                    onTextChange={debounce((value) => saveItem(itemKey, value, DoDontContent.Body), 500)}
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

    const { columns, spacing, spacingValue, doColor, dontColor, layout, style, spacingChoice } = blockSettings;

    const saveItem = (itemKey: number, value: string, type: DoDontContent) => {
        let newItem = {};

        if (blockSettings.items && blockSettings.items[itemKey]) {
            newItem = {
                ...blockSettings.items[itemKey],
                [type === DoDontContent.Title ? DoDontContent.Title : DoDontContent.Body]: value,
            };
        } else {
            newItem = {
                [type === DoDontContent.Title ? DoDontContent.Title : DoDontContent.Body]: value,
            };
        }

        const mergeItems = { ...blockSettings.items, [itemKey]: newItem };

        setBlockSettings({
            ...blockSettings,
            items: { ...mergeItems },
        });
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
                        saveItem={saveItem}
                        content={
                            blockSettings.items && blockSettings.items[i] !== 'undefined' ? blockSettings.items[i] : {}
                        }
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
