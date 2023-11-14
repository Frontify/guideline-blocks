/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    OpenNewPublicationPayload,
    Template,
    TemplateLegacy,
    closeTemplateChooser,
    openNewPublication,
    openTemplateChooser,
    useBlockAssets,
    useBlockSettings,
    useBlockTemplates,
    useEditorState,
} from '@frontify/app-bridge';
import { ReactElement, useEffect, useReducer, useState } from 'react';
import {
    BlockInjectButton,
    BlockProps,
    getBackgroundColorStyles,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import {
    AnchoringType,
    PreviewType,
    Settings,
    TextPositioningType,
    paddingStyleMap,
    textPositioningToFlexDirection,
} from './types';
import { GAP, TEMPLATE_BLOCK_SETTING_ID, VERTICAL_GAP } from './constants';
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

    const {
        title,
        template,
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

    const getCardPadding = () => {
        if (hasBorder_blockCard || hasBackground) {
            return hasCustomPaddingValue_blockCard ? paddingValue_blockCard : paddingStyleMap[paddingChoice_blockCard];
        }

        return undefined;
    };

    const getLayoutClasses = () => {
        let classNames = '';

        if (hasPreview) {
            classNames = isRows ? 'tw-flex-col' : 'tw-grid tw-grid-rows-2 grid-flow-col';
        } else {
            classNames = 'tw-grid tw-grid-cols-3';
        }

        return classNames;
    };

    useEffect(() => {
        const unsubscribeTemplateChooser = appBridge.subscribe('templateChosen', onTemplateSelected);

        return () => {
            unsubscribeTemplateChooser();
        };
    }, []);

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

    const handleNewPublication = async () => {
        console.log(preview);
        if (selectedTemplate !== null) {
            switch (preview) {
                case PreviewType.Custom:
                    if (Array.isArray(previewCustom) && previewCustom.length > 0) {
                        selectedTemplate.previewUrl = previewCustom[0].previewUrl;
                    }
                    break;
                default:
                    if (template?.previewUrl) {
                        selectedTemplate.previewUrl = template.previewUrl;
                    }
                    break;
            }

            const options: OpenNewPublicationPayload = {
                template: selectedTemplate,
            };

            await appBridge.dispatch(openNewPublication(options));
        }
    };

    const onTemplateSelected = async (result: { template: TemplateLegacy }) => {
        const { title, description } = blockSettings;

        try {
            await updateTemplateIdsFromKey(TEMPLATE_BLOCK_SETTING_ID, [result.template.id]);
            updateBlockSettings({
                template: result.template,
                templateId: result.template.id,
            });
            dispatch({
                type: TemplateDataActionType.UPDATE_TITLE,
                payload: { newValue: result.template.title, prevValue: title },
            });
            dispatch({
                type: TemplateDataActionType.UPDATE_DESCRIPTION,
                payload: { newValue: result.template.description, prevValue: description },
            });
        } catch (error) {
            setLastErrorMessage(error as string);
        }

        await appBridge.dispatch(closeTemplateChooser());
    };

    const handleOpenTemplateChooser = () => appBridge.dispatch(openTemplateChooser());

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
                        padding: getCardPadding(),
                    }}
                >
                    {isEditing && lastErrorMessage !== '' && <AlertError errorMessage={lastErrorMessage} />}
                    <div
                        data-test-id="template-block-content"
                        className="tw-flex"
                        style={{
                            flexDirection,
                            gap: textPositioning !== TextPositioningType.Top ? GAP : undefined,
                            alignItems: isRows ? textAnchoringVertical : undefined,
                        }}
                    >
                        {hasPreview && (
                            <TemplatePreview
                                appBridge={appBridge}
                                blockSettings={blockSettings}
                                template={selectedTemplate}
                                updateBlockSettings={updateBlockSettings}
                                onOpenTemplateChooser={handleOpenTemplateChooser}
                            />
                        )}
                        <div
                            className={merge(['tw-flex', getLayoutClasses()])}
                            style={{
                                width: isRows && hasPreview ? `${textRatio}%` : '100%',
                                textAlign: !isRows && hasPreview ? textAnchoringHorizontal : AnchoringType.Start,
                                gap: VERTICAL_GAP,
                            }}
                        >
                            <div className={merge(['tw-grow tw-min-w-0', hasPreview ? '' : 'tw-col-span-2'])}>
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
                            <div className={hasPreview ? '' : 'tw-flex tw-justify-end tw-items-start'}>
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
