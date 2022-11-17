/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Extension } from '@codemirror/state';
import { showPanel } from '@codemirror/view';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { debounce } from '@frontify/fondue';
import { radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import { langs } from '@uiw/codemirror-extensions-langs';
import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror from '@uiw/react-codemirror';
import { FC, ReactElement } from 'react';
import 'tailwindcss/tailwind.css';
import { CodeSnippetProps, Settings } from './types';

export const CodeSnippetBlock: FC<CodeSnippetProps> = ({ appBridge }): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const extensions = [] as Extension[];

    const {
        content,
        language = 'html',
        borderStyle,
        borderWidth,
        borderColor,
        hasBorder = false,
        withHeading = false,
        withRowNumbers = false,
        theme = 'default',
    } = blockSettings;

    const getTheme = () => {
        if (theme === 'default') {
            return 'light';
        } else if (Object.keys(themes).includes(theme)) {
            return themes[theme];
        }
        return 'light';
    };

    const getCurrentLanguageFromLangs = () => {
        if (Object.keys(langs).includes(language)) {
            return langs[language];
        }
        return langs.html;
    };

    const activeLanguage = getCurrentLanguageFromLangs();
    if (activeLanguage) {
        extensions.push(activeLanguage());
    }

    const panelExtension = () => {
        const dom = document.createElement('div');
        dom.textContent = language?.toUpperCase() ?? '';
        dom.setAttribute('data-test-id', 'code-snippet-header');
        dom.className = 'cm-header-panel tw-p-2 tw-text-s';
        return showPanel.of(() => ({ dom, top: true }));
    };

    if (withHeading) {
        extensions.push(panelExtension());
    }

    const customCornerRadiusStyle = {
        borderRadius: blockSettings.hasExtendedCustomRadius
            ? `${blockSettings.extendedRadiusTopLeft} ${blockSettings.extendedRadiusTopRight} ${blockSettings.extendedRadiusBottomRight} ${blockSettings.extendedRadiusBottomLeft}`
            : radiusStyleMap[blockSettings.extendedRadiusChoice],
    };

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    return (
        <div
            data-test-id="code-snippet-block"
            className="tw-overflow-hidden"
            style={{
                border: hasBorder ? `${borderStyle} ${borderWidth} ${toRgbaString(borderColor)}` : 'none',
                borderRadius: customCornerRadiusStyle.borderRadius,
            }}
        >
            <CodeMirror
                theme={getTheme()}
                value={content}
                extensions={extensions}
                onChange={handleChange}
                editable={isEditing}
                basicSetup={{ lineNumbers: withRowNumbers }}
                placeholder="< please add snippet here >"
            />
        </div>
    );
};
