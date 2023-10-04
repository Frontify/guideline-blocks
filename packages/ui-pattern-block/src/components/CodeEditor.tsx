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
    onResponsivePreviewOpen: () => void;
    onCodeChange: (filename: string, code: string) => void;
    onResetToDefault: () => void;
}

export const CodeEditor = ({
    onCodeChange,
    onResetToDefault,
    onResponsivePreviewOpen,
    template,
    showResetButton,
    showResponsivePreview,
    showSandboxLink,
    shouldCollapseCodeByDefault,
}: Props): ReactElement => {
    const { code } = useActiveCode();
    const { sandpack } = useSandpack();
    const { activeFile } = sandpack;
    const [isEditorCollapsed, setIsEditorCollapsed] = useState(shouldCollapseCodeByDefault);

    useEffect(() => {
        onCodeChange(activeFile, code);
    }, [code]);

    return (
        <div className="tw-max-w-full">
            <Toolbar
                template={template}
                isEditorCollapsed={isEditorCollapsed}
                setIsEditorCollapsed={setIsEditorCollapsed}
                onResetToDefault={onResetToDefault}
                onResponsivePreviewOpen={onResponsivePreviewOpen}
                showResetButton={showResetButton}
                showSandboxLink={showSandboxLink}
                showResponsivePreview={showResponsivePreview}
            />
            {!isEditorCollapsed && <SandpackCodeEditor showRunButton={false} showTabs={false} />}
        </div>
    );
};
