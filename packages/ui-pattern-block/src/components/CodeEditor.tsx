/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useEffect, useState } from 'react';
import { SandpackCodeEditor, useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { Toolbar } from './Toolbar';
import { SandpackTemplate } from '../types';

interface Props {
    template: SandpackTemplate;
    showResetButton: boolean;
    showSandboxLink: boolean;
    showResponsivePreview: boolean;
    shouldCollapseCodeByDefault: boolean;
    isCodeEditable: boolean;
    hasCodeChanges: boolean;
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
}: Props): ReactElement => {
    const { code } = useActiveCode();
    const { sandpack } = useSandpack();
    const { activeFile } = sandpack;
    const [isEditorCollapsed, setIsEditorCollapsed] = useState(shouldCollapseCodeByDefault);

    useEffect(() => {
        onCodeChange(activeFile, code);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            />
            {!isEditorCollapsed && (
                <SandpackCodeEditor
                    showReadOnly={false}
                    readOnly={!isCodeEditable}
                    showRunButton={false}
                    showTabs={false}
                />
            )}
        </div>
    );
};
