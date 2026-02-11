/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { merge } from '@frontify/fondue/rte';
import { Select, Tooltip } from '@frontify/fondue/components';
import { IconCheckMark, IconClipboard } from '@frontify/fondue/icons';
import { type BlockProps, radiusStyleMap, setAlpha, toRgbaString } from '@frontify/guideline-blocks-settings';
import './styles.css';
import { StyleProvider } from '@frontify/guideline-blocks-shared';
import { langs } from '@uiw/codemirror-extensions-langs';
import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror, { type Extension } from '@uiw/react-codemirror';
import debounce from 'lodash-es/debounce';
import { type FC, useEffect, useMemo, useState } from 'react';

import { DEFAULT_BORDER_COLOR } from './constants';
import { headerThemes } from './headerThemes';
import { type Language, type Settings, languageNameMap } from './types';

export const CodeSnippetBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const [contentValue] = useState(blockSettings.content);
    const [selectedLanguage, setSelectedLanguage] = useState(blockSettings.language ?? 'plain');
    const extensions = [] as Extension[];
    const [isCopied, setIsCopied] = useState(false);
    const [isCopyTooltipOpen, setIsCopyTooltipOpen] = useState(false);
    const labelId = useMemo(() => `${appBridge.context('blockId').get()}-header`, [appBridge]);

    useEffect(() => {
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect, react-hooks/set-state-in-effect
        setSelectedLanguage(blockSettings.language ?? 'plain');
    }, [blockSettings.language]);

    const {
        borderStyle,
        borderWidth,
        borderColor,
        hasBorder = false,
        withHeading = false,
        withRowNumbers = false,
        theme = 'default',
    } = blockSettings;

    const getTheme = () => {
        if (theme !== 'default' && Object.keys(themes).includes(theme)) {
            return themes[theme];
        }
        return 'light';
    };

    const getStyle = () => headerThemes[blockSettings.theme ?? 'default'];

    const getCopyButtonText = () =>
        isCopied ? (
            <>
                <IconCheckMark size={16} /> Copied
            </>
        ) : (
            <>
                <IconClipboard size={16} /> Copy
            </>
        );

    const getCurrentLanguageFromLangs = () => {
        if (selectedLanguage !== 'plain' && Object.keys(langs).includes(selectedLanguage)) {
            return langs[selectedLanguage];
        }
        return null;
    };

    const activeLanguage = getCurrentLanguageFromLangs();
    if (activeLanguage) {
        extensions.push(activeLanguage());
    }

    const customCornerRadiusStyle = {
        borderRadius: blockSettings.hasExtendedCustomRadius
            ? `${blockSettings.extendedRadiusTopLeft} ${blockSettings.extendedRadiusTopRight} ${blockSettings.extendedRadiusBottomRight} ${blockSettings.extendedRadiusBottomLeft}`
            : radiusStyleMap[blockSettings.extendedRadiusChoice],
    };

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(blockSettings.content || '');
        setIsCopied(true);
        setIsCopyTooltipOpen(true);
        window.dispatchEvent(new Event('resize')); // trigger resize event to update alignment of the tooltip
        debounce(() => {
            setIsCopied(false);
            window.dispatchEvent(new Event('resize'));
        }, 2000)();
    };

    const handleLanguageChange = (value: Language) => {
        setSelectedLanguage(value);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setBlockSettings({ language: value });
    };

    return (
        <div className="code-snippet-block">
            <StyleProvider>
                <div
                    data-test-id="code-snippet-block"
                    className="tw-overflow-hidden"
                    style={{
                        fontFamily: 'Menlo, Courier, monospace',
                        fontSize: '12px',
                        border: hasBorder
                            ? `${borderStyle} ${borderWidth} ${toRgbaString(borderColor || DEFAULT_BORDER_COLOR)}`
                            : 'none',
                        borderRadius: customCornerRadiusStyle.borderRadius,
                    }}
                >
                    <div className={merge(['tw-relative tw-group/copy', !isEditing && 'CodeMirror-readonly'])}>
                        {withHeading && (
                            <div
                                data-test-id="code-snippet-header"
                                className="tw-py-2 tw-px-3 tw-bg-black-5 tw-border-b tw-border-black-10 tw-text-s tw-flex tw-justify-between tw-items-center"
                                style={getStyle()}
                            >
                                {isEditing ? (
                                    <div
                                        id={labelId}
                                        className="tw-max-w-[150px]"
                                        style={
                                            {
                                                '--base-color': getStyle().backgroundColor,
                                                '--text-color': getStyle().color,
                                                '--line-color-xx-strong': setAlpha(0.8, getStyle().color),
                                            } as React.CSSProperties
                                        }
                                    >
                                        <Select
                                            value={selectedLanguage}
                                            onSelect={(value) => handleLanguageChange(value as Language)}
                                        >
                                            {Object.entries(languageNameMap).map(([value, label]) => (
                                                <Select.Item value={value} key={value}>
                                                    {label}
                                                </Select.Item>
                                            ))}
                                        </Select>
                                    </div>
                                ) : (
                                    <span id={labelId}>{languageNameMap[selectedLanguage]}</span>
                                )}
                                <button
                                    type="button"
                                    data-test-id="header-copy-button"
                                    className="tw-items-center tw-justify-end tw-gap-1 tw-flex"
                                    style={{
                                        ...getStyle(),
                                        color: blockSettings.theme === 'default' ? '#000000' : getStyle().color,
                                    }}
                                    onClick={handleCopy}
                                >
                                    {getCopyButtonText()}
                                </button>
                            </div>
                        )}
                        <CodeMirror
                            theme={getTheme()}
                            value={contentValue}
                            extensions={extensions}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            basicSetup={{
                                lineNumbers: withRowNumbers,
                                searchKeymap: false,
                                highlightActiveLineGutter: false,
                                highlightActiveLine: false,
                                lintKeymap: false,
                                autocompletion: false,
                                syntaxHighlighting: true,
                            }}
                            onCreateEditor={(view) =>
                                view.dom.querySelector('.cm-content')?.setAttribute('aria-labelledby', labelId)
                            }
                            placeholder={isEditing ? '< please add snippet here >' : ''}
                        />
                        {!withHeading && (
                            <div className="tw-absolute tw-p-1 tw-dark tw-top-0 tw-right-0 tw-hidden group-hover/copy:tw-block">
                                {blockSettings.content && (blockSettings.content.match(/\n/g) || []).length > 1 ? (
                                    <Tooltip.Root
                                        open={isCopyTooltipOpen}
                                        onOpenChange={setIsCopyTooltipOpen}
                                        enterDelay={0}
                                    >
                                        <Tooltip.Trigger>
                                            <button
                                                type="button"
                                                data-test-id="copy-button"
                                                className="tw-p-2 tw-rounded-md"
                                                style={getStyle()}
                                                onClick={handleCopy}
                                            >
                                                {isCopied ? <IconCheckMark /> : <IconClipboard />}
                                            </button>
                                        </Tooltip.Trigger>
                                        <Tooltip.Content>{isCopied ? 'Copied' : 'Copy to clipboard'}</Tooltip.Content>
                                    </Tooltip.Root>
                                ) : (
                                    <button
                                        type="button"
                                        className="tw-flex tw-items-center tw-justify-end tw-gap-1 tw-pr-2 tw-rounded-md"
                                        style={getStyle()}
                                        onClick={handleCopy}
                                        aria-live="assertive"
                                    >
                                        {getCopyButtonText()}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </StyleProvider>
        </div>
    );
};
