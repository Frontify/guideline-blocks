/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, IconSize, IconStorybook, TextInput } from '@frontify/arcade';
import '@frontify/arcade/style';
import { joinClassNames, mapRgbaToString } from '@frontify/guideline-blocks-shared';
import { useHover } from '@react-aria/interactions';
import { CSSProperties, FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { RemoveButton } from './components/RemoveButton';
import { BORDER_COLOR_DEFAULT_VALUE } from './settings';
import {
    BlockProps,
    borderRadiusClasses,
    BorderSelectionType,
    borderStyles,
    heights,
    Settings,
    StorybookBorderRadius,
    StorybookBorderStyle,
    StorybookHeight,
    StorybookPosition,
    StorybookStyle,
} from './types';

const getIframeStyles = (borderSelection: BorderSelectionType, borderRadius: string): CSSProperties => {
    // TODO: This check could be removed if defaultValue are returned from blockSettings
    const style = borderSelection[0] ? borderSelection[0] : StorybookBorderStyle.Solid;
    const width = borderSelection[1] ? borderSelection[1] : '1px';
    const rgba = borderSelection[2]?.rgba ? borderSelection[2]?.rgba : BORDER_COLOR_DEFAULT_VALUE.rgba;
    return {
        borderStyle: borderStyles[style],
        borderWidth: width,
        borderColor: mapRgbaToString(rgba),
        borderRadius,
    };
};

const StorybookBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [localUrl, setLocalUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState<URL | null>(null);
    const { hoverProps, isHovered } = useHover({});

    const {
        style = StorybookStyle.Default,
        url = '',
        isCustomHeight = false,
        heightChoice = StorybookHeight.Medium,
        heightValue = '',
        positioning = StorybookPosition.Horizontal,
        hasBorder = true,
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
        } else if (url === '') {
            deleteUrl();
        }
    }, [url, style, positioning]);

    return (
        <div className="tw-relative">
            {iframeUrl ? (
                <div {...hoverProps}>
                    {isEditing && isHovered && <RemoveButton onClick={deleteUrl} />}
                    <iframe
                        className={joinClassNames([
                            'tw-w-full',
                            !hasCustomBorderRadius && borderRadiusClasses[borderRadiusChoice],
                        ])}
                        style={
                            hasBorder
                                ? getIframeStyles(borderSelection, hasCustomBorderRadius ? borderRadiusValue : '')
                                : {}
                        }
                        height={isCustomHeight ? heightValue : heights[heightChoice]}
                        src={iframeUrl.toString()}
                        frameBorder="0"
                    ></iframe>
                </div>
            ) : (
                <>
                    {isEditing ? (
                        <div className="tw-flex tw-items-stretch tw-justify-center tw-bg-black-5 tw-p-20 tw-text-black-40 tw-space-x-2">
                            <IconStorybook size={IconSize.Size32} />
                            <div className="tw-w-full tw-max-w-sm">
                                <TextInput
                                    value={localUrl}
                                    onChange={(value) => setLocalUrl(value)}
                                    onEnterPressed={saveLink}
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
