/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    OpenNewPublicationPayload,
    Template,
    TemplateLegacy,
    openNewPublication,
    useBlockAssets,
    useBlockSettings,
    useBlockTemplates,
    useEditorState,
    useTemplateChooser,
} from '@frontify/app-bridge';
import { ReactElement, useEffect, useReducer, useState } from 'react';
import {
    BlockInjectButton,
    BlockProps,
    getBackgroundColorStyles,
    paddingStyleMap,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import { PreviewType, Settings, textPositioningToFlexDirection } from './types';
import { GAP, TEMPLATE_BLOCK_SETTING_ID } from './constants';
import { IconPlus24, merge } from '@frontify/fondue';
import { TemplatePreview } from './components/TemplatePreview';
import { AlertError } from './components/AlertError';
import { TemplateDataActionType, templateDataReducer } from './reducers/templateDataReducer';
import { TemplateText } from './components/TemplateText';
import { CustomButton } from './components/CustomButton';

export const TemplateBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [lastErrorMessage, setLastErrorMessage] = useState('');
    const isEditing = useEditorState(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const { blockTemplates, updateTemplateIdsFromKey, error } = useBlockTemplates(appBridge);
    const { openTemplateChooser, closeTemplateChooser } = useTemplateChooser(appBridge);

    const {
        title,
        description,
        preview,
        hasCustomPaddingValue_blockCard,
        paddingValue_blockCard,
        paddingChoice_blockCard,
        hasBackground,
        backgroundColor,
        hasBorder_blockCard,
        borderWidth_blockCard,
        borderColor_blockCard,
        borderStyle_blockCard,
        hasRadius_blockCard,
        radiusValue_blockCard,
        radiusChoice_blockCard,
        textPositioning,
        textRatio,
        textAnchoringHorizontal,
        textAnchoringVertical,
    } = blockSettings;
    const { previewCustom } = blockAssets;

    const [{ templateTitle, templateDescription }, dispatch] = useReducer(templateDataReducer, {
        templateTitle: title ?? '',
        templateDescription: description ?? '',
    });

    const hasPreview = preview !== PreviewType.None;
    const flexDirection = hasPreview ? textPositioningToFlexDirection[textPositioning] : 'row';
    const isRows = hasPreview && (flexDirection === 'row' || flexDirection === 'row-reverse');
    const borderRadius = hasRadius_blockCard ? radiusValue_blockCard : radiusStyleMap[radiusChoice_blockCard];
    const border = hasBorder_blockCard
        ? `${borderWidth_blockCard} ${borderStyle_blockCard} ${toRgbaString(borderColor_blockCard)}`
        : 'none';

    useEffect(() => {
        updateBlockSettings({ title: templateTitle });
    }, [templateTitle]);

    useEffect(() => {
        updateBlockSettings({ description: templateDescription });
    }, [templateDescription]);

    useEffect(() => {
        if (error !== null) {
            setLastErrorMessage(error);
            dispatch({ type: TemplateDataActionType.UPDATE_TITLE, payload: { newValue: '' } });
            dispatch({ type: TemplateDataActionType.UPDATE_DESCRIPTION, payload: { newValue: '' } });
        }
    }, [error]);

    useEffect(() => {
        if (blockTemplates[TEMPLATE_BLOCK_SETTING_ID] && blockTemplates[TEMPLATE_BLOCK_SETTING_ID].length > 0) {
            const lastTemplate = blockTemplates[TEMPLATE_BLOCK_SETTING_ID].pop();

            if (lastTemplate) {
                setSelectedTemplate(lastTemplate);
            }
        }
    }, [blockTemplates]);

    const handleNewPublication = () => {
        if (selectedTemplate !== null) {
            if (Array.isArray(previewCustom) && previewCustom.length > 0) {
                selectedTemplate.previewUrl = previewCustom[0].previewUrl;
            }

            const options: OpenNewPublicationPayload = {
                template: selectedTemplate,
            };

            appBridge.dispatch(openNewPublication(options));
        }
    };

    const onTemplateSelected = async (result: TemplateLegacy) => {
        const { title, description } = blockSettings;

        try {
            await updateTemplateIdsFromKey(TEMPLATE_BLOCK_SETTING_ID, [result.id]);
            updateBlockSettings({
                template: result,
                templateId: result.id,
            });
            dispatch({
                type: TemplateDataActionType.UPDATE_TITLE,
                payload: { newValue: result.title, prevValue: title },
            });
            dispatch({
                type: TemplateDataActionType.UPDATE_DESCRIPTION,
                payload: { newValue: result.description, prevValue: description },
            });
        } catch (error) {
            setLastErrorMessage(error as string);
        }

        closeTemplateChooser();
    };

    const handleOpenTemplateChooser = () => openTemplateChooser(onTemplateSelected);

    return (
        <div data-test-id="template-block-container" className="template-block">
            {selectedTemplate || isEditing ? (
                <div
                    data-test-id="template-block"
                    className="tw-border tw-border-black-20"
                    style={{
                        ...(hasBackground && getBackgroundColorStyles(backgroundColor)),
                        borderRadius,
                        border,
                        padding: hasCustomPaddingValue_blockCard
                            ? paddingValue_blockCard
                            : paddingStyleMap[paddingChoice_blockCard],
                    }}
                >
                    {isEditing && lastErrorMessage !== '' && <AlertError errorMessage={lastErrorMessage} />}
                    <div
                        data-test-id="template-block-content"
                        className="tw-flex"
                        style={{
                            flexDirection,
                            gap: GAP,
                            alignItems: isRows ? textAnchoringHorizontal : undefined,
                        }}
                    >
                        {hasPreview && (
                            <TemplatePreview
                                appBridge={appBridge}
                                blockSettings={blockSettings}
                                template={selectedTemplate}
                                onOpenTemplateChooser={handleOpenTemplateChooser}
                            />
                        )}
                        <div
                            className={merge(['tw-flex', isRows && hasPreview ? 'tw-flex-col' : 'tw-flex-row'])}
                            style={{
                                width: isRows && hasPreview ? `${textRatio}%` : '100%',
                                textAlign: !isRows ? textAnchoringVertical : undefined,
                                gap: GAP,
                            }}
                        >
                            <div className="tw-grow tw-min-w-0">
                                <TemplateText
                                    appBridge={appBridge}
                                    title={templateTitle}
                                    blockSettings={blockSettings}
                                    description={templateDescription}
                                    pageCount={selectedTemplate?.pages.length ?? 0}
                                    isEditing={isEditing}
                                    setTitle={(newValue, prevValue) =>
                                        dispatch({
                                            type: TemplateDataActionType.UPDATE_TITLE,
                                            payload: { newValue, prevValue },
                                        })
                                    }
                                    setDescription={(newValue, prevValue) =>
                                        dispatch({
                                            type: TemplateDataActionType.UPDATE_DESCRIPTION,
                                            payload: { newValue, prevValue },
                                        })
                                    }
                                />
                            </div>
                            <div className="tw-shrink-0">
                                <CustomButton
                                    blockSettings={blockSettings}
                                    isEditing={isEditing}
                                    isDisabled={!selectedTemplate}
                                    updateBlockSettings={updateBlockSettings}
                                    handleNewPublication={handleNewPublication}
                                />
                            </div>
                        </div>
                    </div>
                    {!hasPreview && isEditing && (
                        <div className="tw-pt-2 tw-w-3/4 tw-h-[70px]">
                            <BlockInjectButton
                                label="Choose existing template"
                                icon={<IconPlus24 />}
                                withMenu={false}
                                fillParentContainer
                                onClick={handleOpenTemplateChooser}
                            />
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};
