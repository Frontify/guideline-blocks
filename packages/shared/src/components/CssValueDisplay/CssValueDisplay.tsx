/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

import { IconCheckMark16, IconClipboard16, useCopy } from '@frontify/fondue';

import { CssValueDisplayProps } from './types';

const CSS_LANG = langs.css();

export const CssValueDisplay = ({ cssValue, placeholder = 'No CSS value' }: CssValueDisplayProps) => {
    const { copy, status } = useCopy();
    const isCopied = status === 'success';

    return (
        <div
            data-test-id="css-value-display"
            className="tw-mt-8 tw-overflow-hidden tw-border tw-border-line tw-rounded"
            style={{
                fontFamily: 'Menlo, Courier, monospace',
                fontSize: '12px',
            }}
        >
            <div className="tw-relative tw-group/copy CodeMirror-readonly">
                <div className="tw-py-2 tw-px-3 tw-bg-black-5 tw-border-b tw-border-black-10 tw-text-s tw-flex tw-justify-between tw-items-center">
                    <span className="tw-text-text-weak">CSS</span>
                    <button
                        data-test-id="css-value-display-copy-button"
                        className="tw-items-center tw-justify-end tw-gap-1 tw-flex"
                        onClick={() => copy(cssValue)}
                    >
                        {isCopied ? (
                            <>
                                <IconCheckMark16 /> Copied
                            </>
                        ) : (
                            <>
                                <IconClipboard16 /> Copy
                            </>
                        )}
                    </button>
                </div>
                <CodeMirror
                    value={cssValue}
                    extensions={[CSS_LANG]}
                    readOnly={true}
                    basicSetup={{
                        highlightActiveLineGutter: false,
                        highlightActiveLine: false,
                    }}
                    placeholder={cssValue ? '' : placeholder}
                />
            </div>
        </div>
    );
};
