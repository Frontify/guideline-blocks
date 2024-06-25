/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useCallback, useMemo } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { BlockProps, RichTextEditor } from '@frontify/guideline-blocks-settings';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';
import { PLACEHOLDER } from './settings';
import { Settings, spacingValues } from './types';
import { getPlugins } from './getPlugins';
import { getResponsiveColumnClasses } from './helpers';

export const TextBlock = ({ appBridge }: BlockProps): ReactElement => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { content, columnNumber, columnGutterSimple, columnGutterCustom, isColumnGutterCustom } = blockSettings;
    const gap = isColumnGutterCustom ? columnGutterCustom : spacingValues[columnGutterSimple];

    const customClass = getResponsiveColumnClasses(columnNumber);
    const plugins = useMemo(() => getPlugins(appBridge, customClass, gap), [appBridge, customClass, gap]);

    const handleTextChange = useCallback((content: string) => setBlockSettings({ content }), [setBlockSettings]);

    return (
        <div className="text-block">
            <RichTextEditor
                id={appBridge.getBlockId().toString()}
                isEditing={isEditing}
                value={content}
                customClass={customClass}
                gap={gap}
                plugins={plugins}
                placeholder={PLACEHOLDER}
                onTextChange={handleTextChange}
            />
        </div>
    );
};
