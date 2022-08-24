/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState, useReadyForPrint } from '@frontify/app-bridge';
import { Button, FormControl, FormControlStyle, IconSize, IconStorybook, TextInput } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import { useHover } from '@react-aria/interactions';
import { FC, useCallback, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { RemoveButton } from './components/RemoveButton';
import { BORDER_COLOR_DEFAULT_VALUE, ERROR_MSG, URL_INPUT_PLACEHOLDER } from './settings';
import {
    BlockProps,
    heights,
    Settings,
    StorybookBorderRadius,
    StorybookBorderStyle,
    StorybookHeight,
    StorybookPosition,
    StorybookStyle,
} from './types';
import { buildIframeUrl } from './utils/buildIframeUrl';
import { decodeEntities } from './utils/decodeEntities';
import { ensureHttps } from './utils/ensureHttps';
import { isValidStorybookUrl } from './utils/isValidStorybookUrl';

const DEFAULT_BORDER_WIDTH = '1px';

export const StorybookBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const {
        style = StorybookStyle.Default,
        url = '',
        isCustomHeight = false,
        heightChoice = StorybookHeight.Medium,
        heightValue = '',
        positioning = StorybookPosition.Vertical,
        hasBorder = true,
        borderColor = BORDER_COLOR_DEFAULT_VALUE,
        borderStyle = StorybookBorderStyle.Solid,
        borderWidth = DEFAULT_BORDER_WIDTH,
        hasRadius = false,
        radiusChoice = StorybookBorderRadius.None,
        radiusValue = '',
    } = blockSettings;

    const isEditing = useEditorState(appBridge);
    const [input, setInput] = useState(url);
    const [urlIsValid, setUrlIsValid] = useState(true);
    const [storybookUrl, setStorybookUrl] = useState(url);
    const { hoverProps, isHovered } = useHover({});
    const { setIsReadyForPrint } = useReadyForPrint(appBridge);

    const iframeUrl = buildIframeUrl(decodeEntities(storybookUrl), style === StorybookStyle.WithAddons, positioning);
    const saveInputLink = useCallback(() => {
        setIsReadyForPrint(false);
        if (input.length === 0 || !isValidStorybookUrl(input)) {
            setUrlIsValid(false);
            return;
        }
        setBlockSettings({
            ...blockSettings,
            url: ensureHttps(input),
        });
        setUrlIsValid(true);
    }, [blockSettings, input]);

    useEffect(() => {
        setIsReadyForPrint(true);
    }, [setIsReadyForPrint]);

    useEffect(() => {
        setStorybookUrl(url);
    }, [url]);

    return (
        <div data-test-id="storybook-block" className="tw-relative">
            {iframeUrl ? (
                <div {...hoverProps}>
                    {isEditing && isHovered && (
                        <RemoveButton
                            onClick={() => {
                                setStorybookUrl('');
                                setBlockSettings({
                                    ...blockSettings,
                                    url: '',
                                });
                            }}
                        />
                    )}
                    <iframe
                        onLoad={() => setIsReadyForPrint(true)}
                        onError={() => setIsReadyForPrint(true)}
                        className="tw-w-full"
                        style={
                            hasBorder
                                ? {
                                      borderColor: toRgbaString(borderColor),
                                      borderStyle,
                                      borderWidth,
                                      borderRadius: hasRadius ? radiusValue : radiusStyleMap[radiusChoice],
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
                                <FormControl
                                    helper={!urlIsValid ? { text: ERROR_MSG } : undefined}
                                    style={!urlIsValid ? FormControlStyle.Danger : FormControlStyle.Primary}
                                >
                                    <TextInput
                                        value={input}
                                        onChange={setInput}
                                        onEnterPressed={saveInputLink}
                                        placeholder={URL_INPUT_PLACEHOLDER}
                                    />
                                </FormControl>
                            </div>
                            <Button onClick={saveInputLink}>Confirm</Button>
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
