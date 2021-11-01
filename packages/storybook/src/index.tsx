/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC, useState } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { TextInput, IconReject, IconSize } from '@frontify/arcade';
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

type Settings = {
    style: StorybookStyle;
    url: string;
    height: boolean;
    heightChoice: StorybookHeight;
    heightValue: string;
    positioning: StorybookPosition;
    border: boolean;
    borderStyle: StorybookBorderStyle;
    borderWidth: string;
    borderColor: string;
    borderRadius: boolean;
    borderRadiusChoice: StorybookBorderRadius;
    borderRadiusValue: string;
};

const iframeStyles = (
    borderStyle: StorybookBorderStyle,
    borderWidth: string,
    borderColor: string,
    borderRadius: boolean,
    borderRadiusValue: string
) => {
    return {
        borderStyle: borderStyle,
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius ? borderRadiusValue : '',
    };
};

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
        height = false,
        heightChoice = StorybookHeight.Medium,
        heightValue = '',
        positioning = StorybookPosition.Horizontal,
        border = false,
        borderStyle = StorybookBorderStyle.Solid,
        borderWidth = '1px',
        borderColor = '#CCCCCC',
        borderRadius = false,
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
            {iframeUrl && isEditing && (
                <button
                    onClick={deleteUrl}
                    className="tw-absolute tw-w-9 tw-h-9 tw-flex tw-items-center tw-justify-center tw-bg-black-20 hover:tw-bg-black-30 tw-transition-colors tw-rounded tw-top-4 tw-right-4 tw-text-black"
                >
                    <IconReject size={IconSize.Size20} />
                </button>
            )}
            {iframeUrl && (
                <iframe
                    className={`tw-w-full ${!borderRadius && borderRadiusClasses[borderRadiusChoice]}`}
                    style={
                        border === true
                            ? iframeStyles(borderStyle, borderWidth, borderColor, borderRadius, borderRadiusValue)
                            : {}
                    }
                    height={height ? heightValue : heights[heightChoice]}
                    src={iframeUrl.toString()}
                    frameBorder="0"
                ></iframe>
            )}
            {!iframeUrl && isEditing && (
                <div className="tw-flex tw-items-center tw-justify-center tw-bg-black-5 tw-p-16">
                    <div className="tw-w-full">
                        <TextInput
                            value={localUrl}
                            onChange={(value) => setLocalUrl(value)}
                            placeholder="Add your Storybook-URL"
                        />
                    </div>
                    <button onClick={saveLink} className="tw-p-2 tw-mx-2 tw-bg-black-40">
                        Save
                    </button>
                </div>
            )}
            {!iframeUrl && !isEditing && (
                <div className="tw-flex tw-items-center tw-justify-center tw-bg-black-5 tw-p-16">
                    No Storybook-URL defined.
                </div>
            )}
        </div>
    );
};

export default StorybookBlock;
