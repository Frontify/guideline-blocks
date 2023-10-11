/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useMemo, useState } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { BlockProps, getBackgroundColorStyles, getBorderStyles } from '@frontify/guideline-blocks-settings';
import { SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';

import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';

import { Alignment, Height, type Settings, sandpackThemeValues } from './types';
import {
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

export const UIPatternBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const {
        sandpackTemplate,
        sandpackTheme,
        files,
        alignment,
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
    const [reset, setReset] = useState(false);

    const cssToInject = useMemo(() => {
        const alignmentCss = alignment === Alignment.Center ? centeringCss : '';
        const backgroundCss = hasBackground ? getBackgroundCss(backgroundColor) : '';
        const hasAutoHeight = !isCustomHeight && heightChoice === Height.Auto;
        return getScriptToInject(getCssToInject(hasAutoHeight, alignmentCss, backgroundCss));
    }, [hasBackground, backgroundColor, alignment, isCustomHeight, heightChoice]);

    const templateFiles = useMemo(
        () => ({ ...getDefaultFilesOfTemplate(sandpackTemplate), ...files?.[sandpackTemplate] }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sandpackTemplate, cssToInject, dependencies, reset],
    );

    const onResetToDefault = () => {
        setReset(!reset);
    };

    const onCodeChange = (filename: string, code: string) => {
        if (!isEditing) {
            return;
        }
        debounce(() =>
            setBlockSettings({
                files: {
                    ...blockSettings.files,
                    [sandpackTemplate]: {
                        ...blockSettings.files?.[sandpackTemplate],
                        [filename]: code,
                    },
                },
            }),
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

    const npmDependencies = dependencies?.[sandpackTemplate]?.npm ?? '';
    const externalDependencies = dependencies?.[sandpackTemplate]?.external ?? '';
    const parsedExternalDependencies = useMemo(
        () => getParsedDependencies(externalDependencies, []),
        [externalDependencies],
    );
    const parsedNpmDependencies = useMemo(() => getParsedDependencies(npmDependencies, {}), [npmDependencies]);

    const borderRadius = getRadiusValue(hasRadius, radiusValue, radiusChoice);

    // Remount sandpack provider if any of these change
    const sandpackRestartInitiators = [
        heightChoice,
        customHeightValue,
        cssToInject,
        npmDependencies,
        externalDependencies,
        reset,
    ]
        .map((item) => item.toString())
        .join('');

    return (
        <div key={sandpackTemplate} data-test-id="ui-pattern-block" className="ui-pattern-block">
            <Captions
                appBridge={appBridge}
                title={title}
                description={description}
                onTitleChange={(newValue) => setBlockSettings({ title: newValue })}
                onDescriptionChange={(newValue) => setBlockSettings({ description: newValue })}
                isEditing={isEditing}
            />
            <div
                data-test-id="ui-pattern-block-wrapper"
                style={{
                    ...(hasBorder && getBorderStyles(borderStyle, borderWidth, borderColor)),
                    borderRadius,
                }}
                className="tw-rounded tw-bg-white"
            >
                <SandpackProvider
                    files={templateFiles}
                    template={sandpackTemplate}
                    customSetup={{
                        dependencies: parsedNpmDependencies,
                    }}
                    theme={sandpackThemeValues[sandpackTheme]}
                    key={sandpackRestartInitiators}
                    options={{
                        classes: EDITOR_CLASSES,
                        activeFile: initialActiveFile[sandpackTemplate],
                        externalResources: [cssToInject, ...parsedExternalDependencies],
                    }}
                >
                    <SandpackLayout
                        style={{ borderTopRightRadius: borderRadius, borderTopLeftRadius: borderRadius }}
                        className="tw-flex tw-flex-col"
                    >
                        {isResponsivePreviewOpen && (
                            <ResponsivePreview onClose={() => setIsResponsivePreviewOpen(false)} />
                        )}
                        <SandpackPreview
                            style={{
                                height: getHeightStyle(isCustomHeight, customHeightValue, heightChoice),
                                padding: getPaddingStyle(hasCustomPadding, paddingCustom, paddingChoice),
                                ...(hasBackground && {
                                    ...getBackgroundColorStyles(backgroundColor),
                                    backgroundImage: 'none',
                                }),
                                borderTopRightRadius: borderRadius,
                                borderTopLeftRadius: borderRadius,
                            }}
                            showRefreshButton={false}
                            showOpenInCodeSandbox={false}
                            className="tw-rounded-none tw-shadow-none tw-ml-0"
                        />
                        {(isEditing || showCode) && (
                            <CodeEditor
                                key={`editor_${isEditing.toString()}`}
                                showResetButton={showResetButton}
                                showSandboxLink={showSandboxLink}
                                showResponsivePreview={showResponsivePreview}
                                onResponsivePreviewOpen={() => setIsResponsivePreviewOpen(true)}
                                onCodeChange={onCodeChange}
                                onResetToDefault={onResetToDefault}
                                template={sandpackTemplate}
                                shouldCollapseCodeByDefault={!isEditing && shouldCollapseCodeByDefault}
                            />
                        )}
                    </SandpackLayout>
                </SandpackProvider>

                {(isEditing || showNpmDependencies) && (
                    <NPMDependencies
                        key={`npm_${isEditing.toString()}`}
                        npmDependencies={npmDependencies}
                        shouldCollapseByDefault={!isEditing && shouldCollapseDependenciesByDefault}
                        onNpmDependenciesChanged={(newDependencies) => onDependenciesChanged(newDependencies, 'npm')}
                        borderRadius={showExternalDependencies ? undefined : borderRadius}
                    />
                )}
                {(isEditing || showExternalDependencies) && (
                    <ExternalDependencies
                        key={`external_${isEditing.toString()}`}
                        externalDependencies={externalDependencies}
                        shouldCollapseByDefault={!isEditing && shouldCollapseDependenciesByDefault}
                        onExternalDependenciesChanged={(newDependencies) =>
                            onDependenciesChanged(newDependencies, 'external')
                        }
                        borderRadius={borderRadius}
                    />
                )}
            </div>
        </div>
    );
};
