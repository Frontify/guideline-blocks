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

const DEFAULT_BORDER_WIDTH = '1px';

const decodeEntities = (encodedString: string): string => {
    if (!encodedString) {
        return '';
    }
    const doc = new DOMParser().parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent || '';
};

export const StorybookBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [localUrl, setLocalUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState<URL | null>(null);
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
            setIsReadyForPrint(false);
            const newIframeUrl = new URL(decodeEntities(url));
            newIframeUrl.searchParams.set('nav', 'false');

            const hasAddons = style === StorybookStyle.Default;
            const shouldAddIframeToUrl = !hasAddons;
            const includesIframe = newIframeUrl.pathname.toString().includes('iframe.html');
            const positionValue = positioning === StorybookPosition.Horizontal ? 'right' : 'bottom';
            const panelValue = !hasAddons ? 'false' : positionValue;

            newIframeUrl.searchParams.set('panel', panelValue);

            if (shouldAddIframeToUrl && !includesIframe) {
                newIframeUrl.pathname = `${newIframeUrl.pathname}iframe.html`;
            }

            if (!shouldAddIframeToUrl && includesIframe) {
                const pathname = newIframeUrl.pathname.toString().replace('iframe.html', '');
                newIframeUrl.pathname = pathname;
            }

            setIframeUrl(newIframeUrl);
        } else if (url === '') {
            setIsReadyForPrint(true);
            deleteUrl();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, style, positioning]);

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
