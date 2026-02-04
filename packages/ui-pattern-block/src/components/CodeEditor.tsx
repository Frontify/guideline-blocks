/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SandpackCodeEditor, useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { type ReactElement, useEffect, useState } from 'react';

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
                preprocessor={preprocessor}
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
