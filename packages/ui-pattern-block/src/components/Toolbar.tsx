/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { UnstyledOpenInCodeSandboxButton, useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { toolbarButtons } from '../helpers';
import { SandpackTemplate } from '../types';
import {
    FOCUS_VISIBLE_STYLE,
    IconArrowExpand16,
    IconArrowRoundAntiClockwise16,
    IconClipboard16,
    useCopy,
} from '@frontify/fondue';
import { IconSandBox } from './icons';
import { ToolbarButton } from './ToolbarButton';

interface Props {
    isEditorCollapsed: boolean;
    template: SandpackTemplate;
    setIsEditorCollapsed: (isEditorCollapsed: boolean) => void;
    onResetToDefault: () => void;
    onResponsivePreviewOpen: () => void;
    showResetButton: boolean;
    showSandboxLink: boolean;
    showResponsivePreview: boolean;
}

export const Toolbar = ({
    isEditorCollapsed,
    setIsEditorCollapsed,
    onResetToDefault,
    onResponsivePreviewOpen,
    template,
    showResetButton,
    showResponsivePreview,
    showSandboxLink,
}: Props): ReactElement => {
    const { copy, status } = useCopy(3000);
    const { sandpack } = useSandpack();
    const { code } = useActiveCode();
    const { openFile, activeFile } = sandpack;

    const toggleFile = (file: string) => {
        if (activeFile === file) {
            setIsEditorCollapsed(!isEditorCollapsed);
        } else {
            openFile(file);
            setIsEditorCollapsed(false);
        }
    };

    return (
        <div
            data-test-id="ui-pattern-files-toolbar"
            className={joinClassNames([
                'tw-flex tw-justify-between tw-box-content tw-items-center tw-h-10  tw-px-2 tw-bg-white tw-border-t tw-border-b tw-border-line',
            ])}
        >
            <div className="tw-flex tw-h-full">
                {toolbarButtons[template].map((button) => (
                    <button
                        data-test-id="toolbar-tab-btn"
                        className={joinClassNames([
                            'tw-px-2 tw-h-full tw-text-s tw-text-text-weak hover:tw-text-text-x-weak tw-font-body tw-relative focus-visible:tw-z-20',
                            FOCUS_VISIBLE_STYLE,
                        ])}
                        key={button.file}
                        onClick={() => toggleFile(button.file)}
                    >
                        {button.label}
                        {activeFile === button.file && !isEditorCollapsed && (
                            <div className="tw-w-full tw-h-0.5 tw-absolute tw-bottom-0 tw-left-0 tw-bg-[#2180EF]" />
                        )}
                    </button>
                ))}
            </div>
            <div className="tw-flex">
                <div className="tw-flex tw-gap-0.5 tw-px-3">
                    {showSandboxLink && (
                        <UnstyledOpenInCodeSandboxButton>
                            <ToolbarButton icon={<IconSandBox />} tooltip="Open in CodeSandbox" />
                        </UnstyledOpenInCodeSandboxButton>
                    )}
                    <ToolbarButton
                        icon={<IconClipboard16 />}
                        tooltip={status === 'idle' ? 'Copy code' : 'Copied!'}
                        onClick={() => copy(code)}
                    />
                    {showResponsivePreview && (
                        <ToolbarButton
                            icon={<IconArrowExpand16 />}
                            tooltip="Responsive preview"
                            onClick={onResponsivePreviewOpen}
                        />
                    )}
                </div>
                {showResetButton && (
                    <div className="tw-pl-3 tw-pr-1 tw-relative">
                        <div className="tw-absolute tw-h-full tw-w-[1px] tw-bg-line tw-right-full tw-top-0"></div>
                        <ToolbarButton
                            icon={<IconArrowRoundAntiClockwise16 />}
                            tooltip="Reset pattern"
                            onClick={() => onResetToDefault()}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
