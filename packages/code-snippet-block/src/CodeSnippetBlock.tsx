/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { debounce } from '@frontify/fondue';
import { radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import { langNames, langs, loadLanguage } from '@uiw/codemirror-extensions-langs';
import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror from '@uiw/react-codemirror';
import { FC, ReactElement } from 'react';
import 'tailwindcss/tailwind.css';
import { CodeSnippetProps, Settings } from './types';

export const CodeSnippetBlock: FC<CodeSnippetProps> = ({ appBridge }): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

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

    loadLanguage('tsx');

    langs.tsx();

    console.log('langNames:', langNames);

    const getTheme = () => {
        if (theme === 'default') {
            return 'light';
        } else if (Object.keys(themes).includes(theme)) {
            return themes[theme];
        }
        return 'light';
    };

    const getLanguage = () => {
        if (langNames.includes(language)) {
            console.log('found language!', language);
            return langs[language];
        }
        return langs['html'];
    };

    console.log(getLanguage());

    const customCornerRadiusStyle = {
        borderRadius: blockSettings.hasExtendedCustomRadius
            ? `${blockSettings.extendedRadiusTopLeft} ${blockSettings.extendedRadiusTopRight} ${blockSettings.extendedRadiusBottomRight} ${blockSettings.extendedRadiusBottomLeft}`
            : radiusStyleMap[blockSettings.extendedRadiusChoice],
    };

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    return (
        <div
            className="tw-overflow-hidden"
            style={{
                border: hasBorder ? `${borderStyle} ${borderWidth} ${toRgbaString(borderColor)}` : 'none',
                borderRadius: customCornerRadiusStyle.borderRadius,
            }}
        >
            {withHeading && (
                <header className="tw-p-2 tw-bg-[#f5f5f5] tw-border-b tw-border-current">{language}</header>
            )}
            <CodeMirror
                theme={getTheme()}
                value={content}
                extensions={[langs.tsx()]}
                onChange={handleChange}
                editable={isEditing}
                basicSetup={{ lineNumbers: withRowNumbers }}
                placeholder="< please add snippet here >"
            />
        </div>
    );
};
