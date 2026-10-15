/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { Button } from '@frontify/fondue/components';
import { IconArrowExpand, IconArrowRoundAntiClockwise, IconCaretDown, IconClipboard } from '@frontify/fondue/icons';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { useCopy } from '@frontify/guideline-blocks-shared';
import { type ReactElement } from 'react';

import { getFilePanelId, getToolbarButtons } from '../helpers';
import { type Preprocessor, type SandpackTemplate } from '../types';

import { FileTabs } from './FileTabs';
import { OpenInSandboxButton } from './OpenInSandboxButton';
import { ToolbarButton } from './ToolbarButton';

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
    tabsId: string;
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
    tabsId,
}: Props): ReactElement => {
    const { copy, status } = useCopy(3000);
    const { sandpack } = useSandpack();
    const { code } = useActiveCode();
    const { openFile, activeFile } = sandpack;

    const panelId = getFilePanelId(tabsId);

    const selectFile = (file: string) => {
        openFile(file);
        setIsEditorCollapsed(false);
    };

    return (
        <div
            data-test-id="ui-pattern-files-toolbar"
            className={joinClassNames([
                'tw-flex tw-justify-between tw-box-content tw-items-center tw-h-10 tw-px-2 tw-bg-surface tw-border-t tw-border-line-mid',
                !isEditorCollapsed && 'tw-border-b',
            ])}
        >
            <FileTabs
                tabs={getToolbarButtons(preprocessor)[template]}
                activeFile={isEditorCollapsed ? undefined : activeFile}
                tabsId={tabsId}
                panelId={panelId}
                onSelect={selectFile}
            />
            <div className="tw-flex tw-items-center tw-gap-3 tw-h-full">
                <div className="tw-flex tw-gap-0.5 tw-items-center">
                    {showSandboxLink && (
                        <ToolbarButton triggerElement={<OpenInSandboxButton />} tooltip="Open in CodeSandbox" />
                    )}

                    <ToolbarButton
                        icon={<IconClipboard size={16} />}
                        tooltip={status === 'idle' ? 'Copy code' : 'Copied!'}
                        onClick={() => copy(code)}
                    />
                    {showResponsivePreview && (
                        <ToolbarButton
                            icon={<IconArrowExpand size={16} />}
                            tooltip="Responsive preview"
                            onClick={onResponsivePreviewOpen}
                        />
                    )}
                    <ToolbarButton
                        icon={<IconCaretDown size={16} className={isEditorCollapsed ? '' : 'tw-rotate-180'} />}
                        tooltip="Code"
                        onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
                        ariaExpanded={!isEditorCollapsed}
                        ariaControls={panelId}
                    />
                </div>
                {showResetButton && (
                    <>
                        <div className="tw-h-[calc(100%-8px)] tw-w-px tw-border-line-mid" />
                        <ToolbarButton
                            icon={<IconArrowRoundAntiClockwise size={16} />}
                            tooltip="Reset pattern"
                            onClick={() => onResetRun()}
                        />
                    </>
                )}
                {isCodeEditable && hasCodeChanges && (
                    <>
                        <div className="tw-h-[calc(100%-8px)] tw-w-px tw-border-line-mid" />
                        <Button
                            data-test-id="ui-pattern-discard-changes"
                            size="small"
                            emphasis="weak"
                            onPress={() => onResetFilesToDefault()}
                        >
                            Discard changes
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
