/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum, iconsMap } from '@frontify/fondue';
import { CssValueDisplayProps } from '../types';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

export const CssValueDisplay = ({ cssValue, isCopied, handleCopy }: CssValueDisplayProps) => {
    const getCopyButtonText = isCopied ? (
        <>{iconsMap[IconEnum.CheckMark16]} Copied</>
    ) : (
        <>{iconsMap[IconEnum.Clipboard16]} Copy</>
    );

    return (
        <div
            data-test-id="gradient-css-snippet-block"
            className="tw-mt-8 tw-overflow-hidden tw-border tw-border-line tw-rounded tw-text-sm"
            style={{
                fontFamily: 'Courier, monospace',
            }}
        >
            <div className="tw-relative tw-group/copy CodeMirror-readonly">
                <div
                    data-test-id="gradient-css-snippet-header"
                    className="tw-py-2.5 tw-pl-5 tw-pr-3 tw-bg-black-5 tw-border-b tw-border-black-10 tw-text-s tw-flex tw-justify-between tw-items-center"
                >
                    <span
                        className="tw-text-text-weak"
                        style={{
                            fontFamily: 'Space Grotesk Frontify, sans-serif',
                        }}
                    >
                        CSS
                    </span>
                    <button
                        data-test-id="gradient-css-copy-button"
                        className="tw-items-center tw-justify-end tw-gap-1 tw-flex"
                        onClick={handleCopy}
                    >
                        {getCopyButtonText}
                    </button>
                </div>
                <CodeMirror
                    theme="light"
                    value={cssValue}
                    extensions={[langs['css']()]}
                    readOnly={true}
                    basicSetup={{
                        highlightActiveLineGutter: false,
                        highlightActiveLine: false,
                    }}
                    placeholder={cssValue ? '' : '<add colors to generate CSS code>'}
                />
            </div>
        </div>
    );
};
