/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC, useState, useEffect } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, TextInput, IconStorybook, IconSize } from '@frontify/arcade';
import { CloseButton } from './components/CloseButton';
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

const getIframeStyles = (borderSelection: borderSelectionType, borderRadius: string) => ({
    borderStyle: borderSelection[0],
    borderWidth: borderSelection[1],
    borderColor: borderSelection[2],
    borderRadius,
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
    const [iframeUrl, setIframeUrl] = useState<URL | null>(null);

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

    const deleteUrl = () => {
        setIframeUrl(null);
        setLocalUrl('');
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

    useEffect(() => {
        if (url) {
            let newIframeUrl = new URL(url);
            newIframeUrl.searchParams.set('nav', 'false');

            let panelValue = 'bottom';
            if (style === StorybookStyle.WithoutAddons) {
                panelValue = 'false';
            } else if (positioning === StorybookPosition.Horizontal) {
                panelValue = 'right';
            }

            newIframeUrl.searchParams.set('panel', panelValue);

            setIframeUrl(newIframeUrl);
        }
    }, [url, style, positioning]);

    return (
        <div className="tw-relative">
            {iframeUrl ? (
                <>
                    {isEditing && <CloseButton onClick={deleteUrl} />}
                    <iframe
                        className={`tw-w-full ${!hasCustomBorderRadius && borderRadiusClasses[borderRadiusChoice]}`}
                        style={
                            hasBorder
                                ? getIframeStyles(borderSelection, hasCustomBorderRadius ? borderRadiusValue : '')
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
                                placeholder="https://brand.storybook.com/?path=/story/buttons"
                            />
                            <Button onClick={saveLink}>Confirm</Button>
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
