/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState, useReadyForPrint } from '@frontify/app-bridge';
import { Button, FormControl, FormControlStyle, IconSize, IconStorybook, TextInput } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import { useHover } from '@react-aria/interactions';
import { FC, useCallback, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { RemoveButton } from './components/RemoveButton';
import { Resizeable } from './components/Resizable';
import { ERROR_MSG, URL_INPUT_PLACEHOLDER } from './settings';
import {
    BlockProps,
    Settings,
    StorybookBorderRadius,
    StorybookHeight,
    StorybookPosition,
    StorybookStyle,
    heights,
} from './types';
import { addMissingUrlProtocol } from './utils/addMissingUrlProtocol';
import { buildIframeUrl } from './utils/buildIframeUrl';
import { decodeEntities } from './utils/decodeEntities';
import { isValidStorybookUrl } from './utils/isValidStorybookUrl';

export const StorybookBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const [input, setInput] = useState(blockSettings.url ?? '');
    const [submittedUrl, setSubmittedUrl] = useState(blockSettings.url ?? '');
    const { hoverProps, isHovered } = useHover({});
    const { setIsReadyForPrint } = useReadyForPrint(appBridge);

    const activeHeight = blockSettings.isCustomHeight
        ? blockSettings.heightValue ?? ''
        : heights[blockSettings.heightChoice ?? (!blockSettings.url ? StorybookHeight.Small : StorybookHeight.Medium)];

    const iframeUrl = buildIframeUrl(
        decodeEntities(submittedUrl),
        blockSettings.style === StorybookStyle.WithAddons,
        blockSettings.positioning ?? StorybookPosition.Vertical
    );
    const saveInputLink = useCallback(() => {
        setIsReadyForPrint(false);
        setSubmittedUrl(input);

        if (isValidStorybookUrl(input)) {
            setBlockSettings({
                ...blockSettings,
                url: addMissingUrlProtocol(input),
            });
        }
    }, [blockSettings, input, setBlockSettings, setIsReadyForPrint]);

    useEffect(() => {
        setIsReadyForPrint(true);
    }, [setIsReadyForPrint]);

    useEffect(() => {
        setSubmittedUrl(blockSettings.url ?? '');
        setInput(blockSettings.url ?? '');
    }, [blockSettings.url]);

    const saveHeight = (height: number) => {
        setBlockSettings({
            ...blockSettings,
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
                blockSettings.hasBorder
                    ? {
                          borderColor: toRgbaString(blockSettings.borderColor),
                          borderStyle: blockSettings.borderStyle,
                          borderWidth: blockSettings.borderWidth ?? '1px',
                          borderRadius: blockSettings.hasRadius
                              ? blockSettings.radiusValue
                              : radiusStyleMap[blockSettings.radiusChoice ?? StorybookBorderRadius.None],
                      }
                    : {}
            }
            src={iframeUrl.toString()}
            height={activeHeight}
            frameBorder="0"
            data-test-id="storybook-iframe"
        />
    );

    return (
        <div data-test-id="storybook-block" className="tw-relative">
            {iframe ? (
                isEditing ? (
                    <Resizeable saveHeight={saveHeight} initialHeight={activeHeight} {...hoverProps}>
                        {isHovered && (
                            <RemoveButton
                                onClick={() => {
                                    setBlockSettings({
                                        ...blockSettings,
                                        url: '',
                                    });
                                }}
                            />
                        )}
                        <div>{iframe}</div>
                    </Resizeable>
                ) : (
                    <div style={{ height: activeHeight }}>{iframe}</div>
                )
            ) : (
                <>
                    {isEditing ? (
                        <Resizeable saveHeight={saveHeight} initialHeight={activeHeight}>
                            <div
                                className="tw-flex tw-justify-center tw-items-center tw-bg-black-5 tw-p-20 tw-text-black-40 tw-space-x-2 tw-resize-y"
                                data-test-id="storybook-empty-wrapper"
                            >
                                <IconStorybook size={IconSize.Size32} />
                                <div
                                    className={`tw-w-full tw-max-w-sm ${
                                        !isValidStorybookUrl(submittedUrl) && 'tw-pt-6'
                                    }`}
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
                                            onChange={setInput}
                                            onEnterPressed={saveInputLink}
                                            placeholder={URL_INPUT_PLACEHOLDER}
                                        />
                                    </FormControl>
                                </div>
                                <Button onClick={saveInputLink}>Confirm</Button>
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
                </>
            )}
        </div>
    );
};
