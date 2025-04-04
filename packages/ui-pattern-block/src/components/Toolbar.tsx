/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { getToolbarButtons } from '../helpers';
import { Preprocessor, SandpackTemplate } from '../types';
import {
    Button,
    ButtonEmphasis,
    ButtonSize,
    FOCUS_VISIBLE_STYLE,
    IconArrowExpand16,
    IconArrowRoundAntiClockwise16,
    IconClipboard16,
    useCopy,
} from '@frontify/fondue';
import { ToolbarButton } from './ToolbarButton';
import { OpenInSandboxButton } from './OpenInSandboxButton';

interface Props {
    isEditorCollapsed: boolean;
    template: SandpackTemplate;
    setIsEditorCollapsed: (isEditorCollapsed: boolean) => void;
    onResetFilesToDefault: () => void;
    onResetRun: () => void;
    onResponsivePreviewOpen: () => void;
    showResetButton: boolean;
    showSandboxLink: boolean;
    showResponsivePreview: boolean;
    isCodeEditable: boolean;
    hasCodeChanges: boolean;
    preprocessor: Preprocessor;
}

export const Toolbar = ({
    isEditorCollapsed,
    setIsEditorCollapsed,
    onResponsivePreviewOpen,
    onResetFilesToDefault,
    onResetRun,
    template,
    showResetButton,
    showResponsivePreview,
    showSandboxLink,
    isCodeEditable,
    hasCodeChanges,
    preprocessor,
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
                'tw-flex tw-justify-between tw-box-content tw-items-center tw-h-10  tw-px-2 tw-bg-white tw-border-t tw-border-line',
                !isEditorCollapsed && 'tw-border-b',
            ])}
        >
            <div className="tw-flex tw-h-full">
                {getToolbarButtons(preprocessor)[template].map((button) => (
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
            <div className="tw-flex tw-items-center tw-gap-3 tw-h-full">
                <div className="tw-flex tw-gap-0.5 tw-items-center">
                    {showSandboxLink && (
                        <ToolbarButton triggerElement={<OpenInSandboxButton />} tooltip="Open in CodeSandbox" />
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
                    <>
                        <div className="tw-h-[calc(100%-8px)] tw-w-[1px] tw-bg-line" />
                        <ToolbarButton
                            icon={<IconArrowRoundAntiClockwise16 />}
                            tooltip="Reset pattern"
                            onClick={() => onResetRun()}
                        />
                    </>
                )}
                {isCodeEditable && hasCodeChanges && (
                    <>
                        <div className="tw-h-[calc(100%-8px)] tw-w-[1px] tw-bg-line" />
                        <Button
                            data-test-id="ui-pattern-discard-changes"
                            size={ButtonSize.Small}
                            emphasis={ButtonEmphasis.Weak}
                            onClick={() => onResetFilesToDefault()}
                        >
                            Discard changes
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
