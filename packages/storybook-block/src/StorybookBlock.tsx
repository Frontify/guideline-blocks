/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, IconSize, IconStorybook, TextInput } from '@frontify/arcade';
import { joinClassNames, mapRgbaToString } from '@frontify/guideline-blocks-shared';
import { useHover } from '@react-aria/interactions';
import { CSSProperties, FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { RemoveButton } from './components/RemoveButton';
import { BORDER_COLOR_DEFAULT_VALUE, URL_INPUT_PLACEHOLDER } from './settings';
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

const DEFAULT_BORDER_WIDTH = '1px';

const getIframeStyles = (borderSelection: BorderSelectionType, borderRadius: string): CSSProperties => {
    // TODO: This check could be removed if defaultValue are returned from blockSettings (ticket: https://app.clickup.com/t/1p69p6a)
    const style = borderSelection[0] ?? StorybookBorderStyle.Solid;
    const width = borderSelection[1] ?? DEFAULT_BORDER_WIDTH;
    const rgba = borderSelection[2]?.rgba ?? BORDER_COLOR_DEFAULT_VALUE.rgba;
    return {
        borderStyle: borderStyles[style],
        borderWidth: width,
        borderColor: mapRgbaToString(rgba),
        borderRadius,
    };
};

export const StorybookBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
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
        borderSelection = [StorybookBorderStyle.Solid, DEFAULT_BORDER_WIDTH, BORDER_COLOR_DEFAULT_VALUE],
        hasRadius = false,
        radiusChoice = StorybookBorderRadius.None,
        radiusValue = '',
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
            const newIframeUrl = new URL(url);
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
        <div data-test-id="storybook-block" className="tw-relative">
            {iframeUrl ? (
                <div {...hoverProps}>
                    {isEditing && isHovered && <RemoveButton onClick={deleteUrl} />}
                    <iframe
                        className={joinClassNames(['tw-w-full', !hasRadius && borderRadiusClasses[radiusChoice]])}
                        style={hasBorder ? getIframeStyles(borderSelection, hasRadius ? radiusValue : '') : {}}
                        height={isCustomHeight ? heightValue : heights[heightChoice]}
                        src={iframeUrl.toString()}
                        frameBorder="0"
                        data-test-id="storybook-iframe"
                    ></iframe>
                </div>
            ) : (
                <>
                    {isEditing ? (
                        <div
                            className="tw-flex tw-items-stretch tw-justify-center tw-bg-black-5 tw-p-20 tw-text-black-40 tw-space-x-2"
                            data-test-id="storybook-empty-wrapper"
                        >
                            <IconStorybook size={IconSize.Size32} />
                            <div className="tw-w-full tw-max-w-sm">
                                <TextInput
                                    value={localUrl}
                                    onChange={setLocalUrl}
                                    onEnterPressed={saveLink}
                                    placeholder={URL_INPUT_PLACEHOLDER}
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
