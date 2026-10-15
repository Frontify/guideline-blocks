/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    CodeEditor as SandpackCodeMirror,
    SandpackStack,
    useActiveCode,
    useClassNames,
    useSandpack,
} from '@codesandbox/sandpack-react';
import { type ReactElement, useEffect, useId, useState } from 'react';

import { getFilePanelId, getFileTabId } from '../helpers';
import { type Preprocessor, type SandpackTemplate } from '../types';

import { Toolbar } from './Toolbar';

interface Props {
    template: SandpackTemplate;
    showResetButton: boolean;
    showSandboxLink: boolean;
    showResponsivePreview: boolean;
    shouldCollapseCodeByDefault: boolean;
    isCodeEditable: boolean;
    hasCodeChanges: boolean;
    preprocessor: Preprocessor;
    onResponsivePreviewOpen: () => void;
    onCodeChange: (filename: string, code: string) => void;
    onResetFilesToDefault: () => void;
    onResetRun: () => void;
}

export const CodeEditor = ({
    onCodeChange,
    onResetFilesToDefault,
    onResetRun,
    onResponsivePreviewOpen,
    template,
    showResetButton,
    showResponsivePreview,
    showSandboxLink,
    shouldCollapseCodeByDefault,
    isCodeEditable,
    hasCodeChanges,
    preprocessor,
}: Props): ReactElement => {
    const { code, updateCode, readOnly: isReadOnlyFile } = useActiveCode();
    const { sandpack } = useSandpack();
    const { activeFile } = sandpack;
    const sandpackClassNames = useClassNames();
    const [isEditorCollapsed, setIsEditorCollapsed] = useState(shouldCollapseCodeByDefault);
    const [prevShouldCollapseCodeByDefault, setPrevShouldCollapseCodeByDefault] = useState(shouldCollapseCodeByDefault);

    // Re-apply the default when it changes (e.g. on edit mode toggle) instead of remounting the editor
    if (shouldCollapseCodeByDefault !== prevShouldCollapseCodeByDefault) {
        setPrevShouldCollapseCodeByDefault(shouldCollapseCodeByDefault);
        setIsEditorCollapsed(shouldCollapseCodeByDefault);
    }
    const tabsId = useId();
    const isEmptyReadOnlyFile = !isCodeEditable && code.trim() === '';

    useEffect(() => {
        onCodeChange(activeFile, code);
        // oxlint-disable-next-line @eslint-react/exhaustive-deps
    }, [code]);

    return (
        <div className="tw-max-w-full">
            <Toolbar
                template={template}
                isCodeEditable={isCodeEditable}
                isEditorCollapsed={isEditorCollapsed}
                setIsEditorCollapsed={setIsEditorCollapsed}
                onResetFilesToDefault={onResetFilesToDefault}
                onResetRun={onResetRun}
                hasCodeChanges={hasCodeChanges}
                onResponsivePreviewOpen={onResponsivePreviewOpen}
                showResetButton={showResetButton}
                showSandboxLink={showSandboxLink}
                showResponsivePreview={showResponsivePreview}
                preprocessor={preprocessor}
                tabsId={tabsId}
            />
            <div
                id={getFilePanelId(tabsId)}
                data-test-id="ui-pattern-code-panel"
                role="tabpanel"
                aria-labelledby={getFileTabId(tabsId, activeFile)}
                // A read-only editor renders a static <pre> that can't take focus, so the panel does
                tabIndex={!isCodeEditable || isReadOnlyFile ? 0 : undefined}
                hidden={isEditorCollapsed}
                className="focus-visible:tw-ring-4 focus-visible:tw-ring-inset focus-visible:tw-ring-blue focus-visible:tw-outline-none"
            >
                {!isEditorCollapsed &&
                    (isEmptyReadOnlyFile ? (
                        <p
                            data-test-id="ui-pattern-empty-file"
                            className="tw-m-0 tw-px-4 tw-py-3 tw-text-small tw-text-secondary"
                        >
                            This file is empty.
                        </p>
                    ) : (
                        // Mirrors SandpackCodeEditor, minus its own role="tabpanel" that would nest in ours
                        <SandpackStack className={sandpackClassNames('editor')}>
                            <div
                                className={sandpackClassNames('code-editor', [
                                    'tw-relative tw-flex-1 tw-overflow-auto tw-bg-[var(--sp-colors-surface1)] [&_.cm-scroller]:tw-py-[var(--sp-space-4)] [&_.sp-pre-placeholder]:tw-py-[var(--sp-space-4)]',
                                ])}
                            >
                                <SandpackCodeMirror
                                    key={activeFile}
                                    code={code}
                                    filePath={activeFile}
                                    editorState={sandpack.editorState}
                                    initMode={sandpack.initMode}
                                    onCodeUpdate={(newCode) => updateCode(newCode, sandpack.autoReload ?? true)}
                                    readOnly={!isCodeEditable || isReadOnlyFile}
                                    showReadOnly={false}
                                />
                            </div>
                        </SandpackStack>
                    ))}
            </div>
        </div>
    );
};
