/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState, useReadyForPrint } from '@frontify/app-bridge';
import { Button, IconSize, IconStorybook, TextInput } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { joinClassNames, toRgbaString } from '@frontify/guideline-blocks-shared';
import { useHover } from '@react-aria/interactions';
import { FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
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
import { decodeEntities } from './utilities';

const DEFAULT_BORDER_WIDTH = '1px';

const validURL = (string: string) => {
    if (string === '') {
        return true;
    }
    if (string.split('?').length >= 2 && string.includes('path')) {
        return true;
    }
    return false;
};

const addHttps = (testUrl: string) => {
    if (testUrl.startsWith('http://')) {
        return testUrl.replace('http://', 'https://');
    } else if (!testUrl.startsWith('https://')) {
        return `https://${testUrl}`;
    }
    return testUrl;
};

export const StorybookBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [localUrl, setLocalUrl] = useState('');
    const { hoverProps, isHovered } = useHover({});
    const { containerRef, setIsReadyForPrint } = useReadyForPrint();

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

    const isUrlValid = validURL(localUrl);
    const iframeUrl = url !== '' ? new URL(url) : undefined;

    const deleteUrl = () => {
        setLocalUrl('');
        setBlockSettings({
            ...blockSettings,
            url: '',
        });
    };

    const saveLink = () => {
        setBlockSettings({
            ...blockSettings,
            url: addHttps(localUrl),
        });
    };

    useEffect(() => {
        if (!url) {
            setLocalUrl('');
        }
        if (url !== '') {
            setIsReadyForPrint(false);
            const newIframeUrl = new URL(decodeEntities(url));
            newIframeUrl.searchParams.set('nav', 'false');
        } else if (url === '') {
            setIsReadyForPrint(true);
        }
    }, [url]);

    if (validURL(url)) {
        iframeUrl?.searchParams.set('nav', 'false');

        const hasAddons = style === StorybookStyle.Default;
        const includesIframe = iframeUrl?.pathname.toString().includes('iframe.html');
        const positionValue = positioning === StorybookPosition.Horizontal ? 'right' : 'bottom';

        iframeUrl?.searchParams.set('panel', !hasAddons ? 'false' : positionValue);

        if (iframeUrl && !hasAddons && !includesIframe) {
            iframeUrl.pathname = `${iframeUrl.pathname}iframe.html`;
        }

        if (iframeUrl && hasAddons && includesIframe) {
            const pathname = iframeUrl.pathname.toString().replace('iframe.html', '');
            iframeUrl.pathname = pathname;
        }
    }

    return (
        <div ref={containerRef} data-test-id="storybook-block" className="tw-relative">
            {iframeUrl ? (
                <div {...hoverProps}>
                    {isEditing && isHovered && <RemoveButton onClick={deleteUrl} />}
                    <iframe
                        onLoad={() => setIsReadyForPrint(true)}
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
                                    onEnterPressed={isUrlValid ? saveLink : undefined}
                                    placeholder={URL_INPUT_PLACEHOLDER}
                                />
                                {!isUrlValid && (
                                    <div className="tw-text-s tw-text-text-negative tw-mt-2">
                                        Please enter a valid Storybook URL
                                    </div>
                                )}
                            </div>
                            <Button onClick={saveLink} disabled={!isUrlValid}>
                                Confirm
                            </Button>
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
