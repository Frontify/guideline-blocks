/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useMemo, useRef, useState } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    BlockProps,
    getBackgroundColorStyles,
    getBorderStyles,
    joinClassNames,
    withAttachmentsProvider,
} from '@frontify/guideline-blocks-settings';
import { SandpackLayout, SandpackPreview, SandpackPreviewRef, SandpackProvider } from '@codesandbox/sandpack-react';

import { Alignment, Height, SandpackTemplate, type Settings, TextAlignment, sandpackThemeValues } from './types';
import {
    BACKGROUND_COLOR_DEFAULT_VALUE,
    BORDER_COLOR_DEFAULT_VALUE,
    DEFAULT_BLOCK_SETTINGS,
    EDITOR_CLASSES,
    centeringCss,
    getBackgroundCss,
    getCssToInject,
    getDefaultFilesOfTemplate,
    getHeightStyle,
    getPaddingStyle,
    getParsedDependencies,
    getRadiusValue,
    getScriptToInject,
    initialActiveFile,
} from './helpers';
import { useDebounce } from './hooks';
import { Captions, CodeEditor, ExternalDependencies, NPMDependencies, ResponsivePreview } from './components';
import { ATTACHMENTS_ASSET_ID } from './settings';
import { AttachmentsButton } from './components/AttachmentsButton';
import { StyleProvider } from '@frontify/guideline-blocks-shared';

export const UIPatternBlock = withAttachmentsProvider(({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const {
        sandpackTemplate,
        sandpackTheme,
        preprocessor,
        files,
        alignment,
        labelPosition,
        dependencies: blockDependencies,
        paddingChoice,
        paddingCustom,
        hasCustomPadding,
        heightChoice,
        customHeightValue,
        isCustomHeight,
        showResetButton,
        showSandboxLink,
        showResponsivePreview,
        showCode,
        isCodeEditable,
        showNpmDependencies,
        showExternalDependencies,
        shouldCollapseCodeByDefault,
        shouldCollapseDependenciesByDefault,
        backgroundColor,
        hasBackground,
        borderColor,
        borderStyle,
        borderWidth,
        hasBorder,
        hasRadius,
        radiusChoice,
        radiusValue,
        description,
        title,
    } = { ...DEFAULT_BLOCK_SETTINGS, ...blockSettings };

    const { debounce } = useDebounce();
    const isEditing = useEditorState(appBridge);
    const [isResponsivePreviewOpen, setIsResponsivePreviewOpen] = useState(false);
    const [dependencies, setDependencies] = useState(blockDependencies);
    const [resetFiles, setResetFiles] = useState(false);
    const [hasCodeChanges, setHasCodeChanges] = useState(false);
    const previewRef = useRef<SandpackPreviewRef>(null);

    const cssToInject = useMemo(() => {
        const alignmentCss = alignment === Alignment.Center ? centeringCss : '';
        const backgroundCss = hasBackground ? getBackgroundCss(backgroundColor || BACKGROUND_COLOR_DEFAULT_VALUE) : '';
        const hasAutoHeight = !isCustomHeight && heightChoice === Height.Auto;
        return getScriptToInject(getCssToInject(hasAutoHeight, alignmentCss, backgroundCss));
    }, [hasBackground, backgroundColor, alignment, isCustomHeight, heightChoice]);

    const npmDependencies = dependencies?.[sandpackTemplate]?.npm ?? '';
    const externalDependencies = dependencies?.[sandpackTemplate]?.external ?? '';

    // Remount sandpack provider if any of these change
    const sandpackRestartInitiators = [
        heightChoice,
        customHeightValue,
        cssToInject,
        npmDependencies,
        externalDependencies,
        resetFiles,
        sandpackTheme,
        sandpackTemplate,
        preprocessor,
    ];

    const onResetFiles = () => {
        setResetFiles(!resetFiles);
        setHasCodeChanges(false);
    };

    const templateFiles = useMemo(
        () => ({ ...getDefaultFilesOfTemplate(sandpackTemplate, preprocessor), ...files?.[sandpackTemplate] }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        sandpackRestartInitiators
    );

    const onResetRun = () => {
        previewRef.current?.getClient()?.dispatch({ type: 'refresh' });
    };

    const onCodeChange = (filename: string, code: string) => {
        if (!isEditing) {
            const existingFiles = {
                ...getDefaultFilesOfTemplate(sandpackTemplate, preprocessor),
                ...files?.[sandpackTemplate],
            };
            if (existingFiles[filename] !== code) {
                setHasCodeChanges(true);
            }
            return;
        }
        setHasCodeChanges(false);
        debounce(() =>
            setBlockSettings({
                files: {
                    ...blockSettings.files,
                    [sandpackTemplate]: {
                        ...blockSettings.files?.[sandpackTemplate],
                        [filename]: code,
                    },
                },
            })
        );
    };

    const onDependenciesChanged = (newDependencies: string, source: 'npm' | 'external') => {
        if (isEditing) {
            setBlockSettings({
                dependencies: {
                    ...blockSettings.dependencies,
                    [sandpackTemplate]: {
                        ...blockSettings.dependencies?.[sandpackTemplate],
                        [source]: newDependencies,
                    },
                },
            });
        }
        setDependencies({
            ...dependencies,
            [sandpackTemplate]: {
                ...dependencies?.[sandpackTemplate],
                [source]: newDependencies,
            },
        });
    };

    const parsedExternalDependencies = useMemo(
        () => getParsedDependencies(externalDependencies, []),
        [externalDependencies]
    );
    const parsedNpmDependencies = useMemo(
        () => ({ dependencies: getParsedDependencies(npmDependencies, {}) }),
        [npmDependencies]
    );

    const borderRadius = hasBorder ? getRadiusValue(hasRadius, radiusValue, radiusChoice) : 0;

    return (
        <div key={sandpackTemplate} data-test-id="ui-pattern-block" className="ui-pattern-block">
            <StyleProvider>
                <div
                    className={joinClassNames([
                        'tw-flex tw-gap-3',
                        labelPosition === TextAlignment.Top ? 'tw-flex-col' : 'tw-flex-col-reverse',
                    ])}
                >
                    <div className="tw-flex tw-justify-between tw-gap-3 tw-items-start">
                        <Captions
                            appBridge={appBridge}
                            title={title}
                            description={description}
                            onTitleChange={(newValue) => setBlockSettings({ title: newValue })}
                            onDescriptionChange={(newValue) => setBlockSettings({ description: newValue })}
                            isEditing={isEditing}
                        />
                        <AttachmentsButton appBridge={appBridge} />
                    </div>

                    <div
                        data-test-id="ui-pattern-block-wrapper"
                        style={{
                            ...(hasBorder &&
                                getBorderStyles(borderStyle, borderWidth, borderColor || BORDER_COLOR_DEFAULT_VALUE)),
                            borderRadius,
                        }}
                        className={joinClassNames([
                            'tw-rounded tw-bg-white tw-overflow-hidden tw-group',
                            // Used to hide border-bottom of last elements in component from also applying a border (eg. Accordion.tsx).
                            hasBorder && 'bordered',
                        ])}
                    >
                        <SandpackProvider
                            files={templateFiles}
                            template={sandpackTemplate}
                            customSetup={parsedNpmDependencies}
                            theme={sandpackThemeValues[sandpackTheme]}
                            key={sandpackRestartInitiators.map((i) => i.toString()).join('')}
                            options={{
                                classes: EDITOR_CLASSES,
                                activeFile: initialActiveFile[sandpackTemplate],
                                externalResources: [cssToInject, ...parsedExternalDependencies],
                            }}
                        >
                            <SandpackLayout className="tw-flex tw-flex-col">
                                {isResponsivePreviewOpen && (
                                    <ResponsivePreview onClose={() => setIsResponsivePreviewOpen(false)} />
                                )}
                                <SandpackPreview
                                    ref={previewRef}
                                    style={{
                                        height: getHeightStyle(isCustomHeight, customHeightValue, heightChoice),
                                        padding: getPaddingStyle(hasCustomPadding, paddingCustom, paddingChoice),
                                        ...(hasBackground && {
                                            ...getBackgroundColorStyles(
                                                backgroundColor || BACKGROUND_COLOR_DEFAULT_VALUE
                                            ),
                                            backgroundImage: 'none',
                                        }),
                                    }}
                                    showRefreshButton={false}
                                    showOpenInCodeSandbox={false}
                                    className="tw-rounded-none tw-shadow-none tw-ml-0 tw-bg-white [&>div>iframe]:!tw-max-h-none"
                                />
                                {(isEditing || showCode) && (
                                    <CodeEditor
                                        key={`editor_${isEditing.toString()}`}
                                        isCodeEditable={isEditing || isCodeEditable}
                                        showResetButton={showResetButton}
                                        showSandboxLink={showSandboxLink}
                                        showResponsivePreview={showResponsivePreview}
                                        onResponsivePreviewOpen={() => setIsResponsivePreviewOpen(true)}
                                        onCodeChange={onCodeChange}
                                        onResetFilesToDefault={onResetFiles}
                                        onResetRun={onResetRun}
                                        hasCodeChanges={!isEditing && hasCodeChanges}
                                        template={sandpackTemplate}
                                        shouldCollapseCodeByDefault={!isEditing && shouldCollapseCodeByDefault}
                                        preprocessor={preprocessor}
                                    />
                                )}
                            </SandpackLayout>
                        </SandpackProvider>

                        {(isEditing || showNpmDependencies) && sandpackTemplate !== SandpackTemplate.Static && (
                            <NPMDependencies
                                key={`npm_${isEditing.toString()}`}
                                npmDependencies={npmDependencies}
                                shouldCollapseByDefault={!isEditing && shouldCollapseDependenciesByDefault}
                                onNpmDependenciesChanged={(newDependencies) =>
                                    onDependenciesChanged(newDependencies, 'npm')
                                }
                                borderRadius={showExternalDependencies ? undefined : borderRadius}
                                readOnly={!isEditing}
                            />
                        )}
                        {(isEditing || showExternalDependencies) && sandpackTemplate !== SandpackTemplate.Static && (
                            <ExternalDependencies
                                key={`external_${isEditing.toString()}`}
                                externalDependencies={externalDependencies}
                                shouldCollapseByDefault={!isEditing && shouldCollapseDependenciesByDefault}
                                onExternalDependenciesChanged={(newDependencies) =>
                                    onDependenciesChanged(newDependencies, 'external')
                                }
                                borderRadius={borderRadius}
                                readOnly={!isEditing}
                            />
                        )}
                    </div>
                </div>
            </StyleProvider>
        </div>
    );
}, ATTACHMENTS_ASSET_ID);
