/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/arcade-tokens/styles';
import 'tailwindcss/tailwind.css';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, IconSize, IconStorybook, TextInput } from '@frontify/arcade';
import { joinClassNames, toRgbaString } from '@frontify/guideline-blocks-shared';
import { useHover } from '@react-aria/interactions';
import { FC, useEffect, useState } from 'react';
import { RemoveButton } from './components/RemoveButton';
import { BORDER_COLOR_DEFAULT_VALUE, URL_INPUT_PLACEHOLDER } from './settings';
import {
    BlockProps,
    Settings,
    StorybookBorderRadius,
    StorybookBorderStyle,
    StorybookHeight,
    StorybookPosition,
    StorybookStyle,
    borderRadiusClasses,
    heights,
} from './types';

const DEFAULT_BORDER_WIDTH = '1px';

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
        borderColor = BORDER_COLOR_DEFAULT_VALUE,
        borderStyle = StorybookBorderStyle.Solid,
        borderWidth = DEFAULT_BORDER_WIDTH,
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
        if (url !== '') {
            const newIframeUrl = new URL(url);
            newIframeUrl.searchParams.set('nav', 'false');

            let panelValue = 'bottom';
            let shouldAddIframeToUrl = false;
            if (style === StorybookStyle.WithoutAddons) {
                panelValue = 'false';
                shouldAddIframeToUrl = true;
            } else if (positioning === StorybookPosition.Horizontal) {
                panelValue = 'right';
            }

            newIframeUrl.searchParams.set('panel', panelValue);

            if (!newIframeUrl.pathname.toString().includes('iframe.html') && shouldAddIframeToUrl) {
                newIframeUrl.pathname = '/iframe.html';
            }

            setIframeUrl(newIframeUrl);
        } else if (url === '') {
            deleteUrl();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, style, positioning]);

    return (
        <div data-test-id="storybook-block" className="tw-relative">
            {iframeUrl ? (
                <div {...hoverProps}>
                    {isEditing && isHovered && <RemoveButton onClick={deleteUrl} />}
                    <iframe
                        className={joinClassNames(['tw-w-full', !hasRadius && borderRadiusClasses[radiusChoice]])}
                        style={
                            hasBorder
                                ? {
                                      borderColor: toRgbaString(borderColor),
                                      borderStyle,
                                      borderWidth,
                                      borderRadius: radiusValue,
                                  }
                                : {}
                        }
                        height={isCustomHeight ? heightValue : heights[heightChoice]}
                        src={iframeUrl.toString()}
                        frameBorder="0"
                        data-test-id="storybook-iframe"
                    />
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
