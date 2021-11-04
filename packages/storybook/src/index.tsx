/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC, useState } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, TextInput, IconReject, IconStorybook, IconSize } from '@frontify/arcade';
import {
    StorybookBorderRadius,
    StorybookBorderStyle,
    StorybookStyle,
    StorybookHeight,
    StorybookPosition,
} from './types';

type StorybookBlockProps = {
    appBridge: AppBridgeNative;
};

type borderSelectionType = [StorybookBorderStyle, string, string];

type Settings = {
    style: StorybookStyle;
    url: string;
    isCustomHeight: boolean;
    heightChoice: StorybookHeight;
    heightValue: string;
    positioning: StorybookPosition;
    hasBorder: boolean;
    borderSelection: borderSelectionType;
    hasCustomBorderRadius: boolean;
    borderRadiusChoice: StorybookBorderRadius;
    borderRadiusValue: string;
};

const iframeStyles = (
    borderSelection: borderSelectionType,
    hasCustomBorderRadius: boolean,
    borderRadiusValue: string
) => ({
    borderStyle: borderSelection[0],
    borderWidth: borderSelection[1],
    borderColor: borderSelection[2],
    borderRadius: hasCustomBorderRadius ? borderRadiusValue : '',
});

const borderRadiusClasses: Record<StorybookBorderRadius, string> = {
    [StorybookBorderRadius.None]: 'tw-rounded-none',
    [StorybookBorderRadius.Small]: 'tw-rounded',
    [StorybookBorderRadius.Medium]: 'tw-rounded-md',
    [StorybookBorderRadius.Large]: 'tw-rounded-lg',
};

const heights: Record<StorybookHeight, string> = {
    [StorybookHeight.Small]: '400px',
    [StorybookHeight.Medium]: '600px',
    [StorybookHeight.Large]: '800px',
};

const StorybookBlock: FC<StorybookBlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [localUrl, setLocalUrl] = useState('');

    const {
        style = StorybookStyle.Default,
        url = '',
        isCustomHeight = false,
        heightChoice = StorybookHeight.Medium,
        heightValue = '',
        positioning = StorybookPosition.Horizontal,
        hasBorder = false,
        borderSelection = [StorybookBorderStyle.Solid, '1px', '#CCCCCC'],
        hasCustomBorderRadius = false,
        borderRadiusChoice = StorybookBorderRadius.None,
        borderRadiusValue = '',
    } = blockSettings;

    let iframeUrl;

    if (url !== '') {
        iframeUrl = new URL(url);
        iframeUrl.searchParams.set('nav', 'false');
        if (style === StorybookStyle.WithoutAddons) {
            iframeUrl.searchParams.set('panel', 'false');
        } else if (positioning === StorybookPosition.Horizontal) {
            iframeUrl.searchParams.set('panel', 'right');
        } else {
            iframeUrl.searchParams.set('panel', 'bottom');
        }
    }

    const deleteUrl = () => {
        setBlockSettings({
            ...blockSettings,
            url: '',
        });
    };

    const saveLink = () => {
        setBlockSettings({
            ...blockSettings,
            url: localUrl,
        });
    };

    return (
        <div className="tw-relative">
            {iframeUrl ? (
                <>
                    {isEditing && (
                        <button
                            onClick={deleteUrl}
                            className="tw-absolute tw-w-9 tw-h-9 tw-flex tw-items-center tw-justify-center tw-bg-black-20 hover:tw-bg-black-30 tw-transition-colors tw-rounded tw-top-4 tw-right-4 tw-text-black"
                        >
                            <IconReject size={IconSize.Size20} />
                        </button>
                    )}

                    <iframe
                        className={`tw-w-full ${!hasCustomBorderRadius && borderRadiusClasses[borderRadiusChoice]}`}
                        style={
                            hasBorder === true
                                ? iframeStyles(borderSelection, hasCustomBorderRadius, borderRadiusValue)
                                : {}
                        }
                        height={isCustomHeight ? heightValue : heights[heightChoice]}
                        src={iframeUrl.toString()}
                        frameBorder="0"
                    ></iframe>
                </>
            ) : (
                <>
                    {isEditing ? (
                        <div className="tw-flex tw-items-center tw-justify-center tw-bg-black-5 tw-p-20 tw-text-black-40 tw-space-x-2">
                            <IconStorybook size={IconSize.Size32} />
                            <TextInput
                                value={localUrl}
                                onChange={(value) => setLocalUrl(value)}
                                placeholder="Add your Storybook-URL"
                            />
                            <Button onClick={saveLink}>Save</Button>
                        </div>
                    ) : (
                        <div className="tw-flex tw-items-center tw-justify-center tw-bg-black-5 tw-p-20">
                            No Storybook-URL defined.
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StorybookBlock;
