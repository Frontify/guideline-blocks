/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC, useState, useEffect } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, TextInput, IconStorybook, IconSize, Color } from '@frontify/arcade';
import { mapRgbaToString } from '@frontify/guideline-blocks-shared';
import { RemoveButton } from './components/RemoveButton';
import {
    BlockProps,
    BorderSelectionType,
    Settings,
    StorybookBorderRadius,
    StorybookBorderStyle,
    StorybookStyle,
    StorybookHeight,
    StorybookPosition,
    borderStyles,
    borderRadiusClasses,
    heights,
} from './types';
import { BORDER_COLOR_DEFAULT_VALUE } from './settings';

const getIframeStyles = (borderSelection: BorderSelectionType, borderRadius: string) => ({
    borderStyle: borderStyles[borderSelection[0]],
    borderWidth: borderSelection[1],
    borderRadius,
    ...(borderSelection[2]?.rgba ? { borderColor: mapRgbaToString(borderSelection[2].rgba) } : {}),
});

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
        borderSelection = [StorybookBorderStyle.Solid, '1px', BORDER_COLOR_DEFAULT_VALUE],
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
                    {isEditing && <RemoveButton onClick={deleteUrl} />}
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
                        <div className="tw-flex tw-items-stretch tw-justify-center tw-bg-black-5 tw-p-20 tw-text-black-40 tw-space-x-2">
                            <IconStorybook size={IconSize.Size32} />
                            <div className="tw-w-full tw-max-w-sm">
                                <TextInput
                                    value={localUrl}
                                    onChange={(value) => setLocalUrl(value)}
                                    placeholder="https://brand.storybook.com/?path=/story/buttons"
                                />
                            </div>
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
