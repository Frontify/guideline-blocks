/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState, useReadyForPrint } from '@frontify/app-bridge';
import { FormControl, FormControlStyle } from '@frontify/fondue';
import { IconStorybook } from '@frontify/fondue/icons';
import { Button, TextInput } from '@frontify/fondue/components';
import { BlockProps, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-settings';
import { FC, useCallback, useEffect, useState } from 'react';
import { Resizeable } from './components/Resizable';
import { BORDER_COLOR_DEFAULT_VALUE, ERROR_MSG, URL_INPUT_PLACEHOLDER } from './settings';
import {
    Settings,
    StorybookBorderRadius,
    StorybookBorderStyle,
    StorybookHeight,
    StorybookPosition,
    StorybookStyle,
    heights,
} from './types';
import { addMissingUrlProtocol } from './utils/addMissingUrlProtocol';
import { buildIframeUrl } from './utils/buildIframeUrl';
import { decodeEntities } from './utils/decodeEntities';
import { isValidStorybookUrl } from './utils/isValidStorybookUrl';
import { StyleProvider } from '@frontify/guideline-blocks-shared';

const DEFAULT_BORDER_WIDTH = '1px';

export const StorybookBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const {
        style = StorybookStyle.Default,
        url = '',
        isCustomHeight = false,
        heightChoice = !url ? StorybookHeight.Small : StorybookHeight.Medium,
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
    const [submittedUrl, setSubmittedUrl] = useState(url);
    const { setIsReadyForPrint } = useReadyForPrint(appBridge);

    const activeHeight = isCustomHeight ? heightValue : heights[heightChoice];

    const iframeUrl = buildIframeUrl(decodeEntities(submittedUrl), style === StorybookStyle.WithAddons, positioning);
    const saveInputLink = useCallback(() => {
        setIsReadyForPrint(false);
        setSubmittedUrl(input);

        if (isValidStorybookUrl(input)) {
            setBlockSettings({
                url: addMissingUrlProtocol(input),
            });
        }
    }, [blockSettings, input, setBlockSettings, setIsReadyForPrint]);

    useEffect(() => {
        setIsReadyForPrint(true);
    }, [setIsReadyForPrint]);

    useEffect(() => {
        setSubmittedUrl(url);
        setInput(url);
    }, [url]);

    const saveHeight = (height: number) => {
        setBlockSettings({
            heightValue: `${height}px`,
            isCustomHeight: true,
        });
    };
    const iframe = iframeUrl && (
        <iframe
            onLoad={() => setIsReadyForPrint(true)}
            onError={() => setIsReadyForPrint(true)}
            className="tw-w-full tw-flex tw-shrink tw-grow"
            style={
                hasBorder
                    ? {
                          borderColor: toRgbaString(borderColor || BORDER_COLOR_DEFAULT_VALUE),
                          borderStyle,
                          borderWidth,
                          borderRadius: hasRadius ? radiusValue : radiusStyleMap[radiusChoice],
                      }
                    : {}
            }
            src={iframeUrl.toString()}
            height={activeHeight}
            frameBorder="0"
            loading="lazy"
            data-test-id="storybook-iframe"
            title="storybook-iframe"
            allow="clipboard-write"
        />
    );

    return (
        <div className="storybook-block">
            <StyleProvider>
                <div data-test-id="storybook-block" className="tw-relative">
                    {iframe ? (
                        isEditing ? (
                            <Resizeable saveHeight={saveHeight} initialHeight={activeHeight}>
                                <div>{iframe}</div>
                            </Resizeable>
                        ) : (
                            <div style={{ height: activeHeight }}>{iframe}</div>
                        )
                    ) : // eslint-disable-next-line unicorn/no-nested-ternary
                    isEditing ? (
                        <Resizeable saveHeight={saveHeight} initialHeight={activeHeight}>
                            <div
                                className="tw-flex tw-justify-center tw-items-center tw-bg-black-5 tw-p-20 tw-text-black-40 tw-space-x-2 tw-resize-y"
                                data-test-id="storybook-empty-wrapper"
                            >
                                <IconStorybook size={32} />
                                <div
                                    className={`tw-w-full tw-max-w-sm ${!isValidStorybookUrl(submittedUrl) && 'tw-pt-6'}`}
                                >
                                    <FormControl
                                        helper={!isValidStorybookUrl(submittedUrl) ? { text: ERROR_MSG } : undefined}
                                        style={
                                            !isValidStorybookUrl(submittedUrl)
                                                ? FormControlStyle.Danger
                                                : FormControlStyle.Primary
                                        }
                                    >
                                        <TextInput
                                            value={input}
                                            onChange={(event) => setInput(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    saveInputLink();
                                                }
                                            }}
                                            placeholder={URL_INPUT_PLACEHOLDER}
                                        />
                                    </FormControl>
                                </div>
                                <Button onPress={saveInputLink}>Confirm</Button>
                            </div>
                        </Resizeable>
                    ) : (
                        <div
                            className="tw-flex tw-items-center tw-justify-center tw-bg-black-5"
                            style={{ height: activeHeight }}
                        >
                            No Storybook-URL defined.
                        </div>
                    )}
                </div>
            </StyleProvider>
        </div>
    );
};
