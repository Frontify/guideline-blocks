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
import { ReactElement, useEffect, useState } from 'react';
import {
    BlockInjectButton,
    BlockProps,
    convertToRteValue,
    getBackgroundColorStyles,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import {
    AnchoringType,
    PreviewType,
    Settings,
    TextPositioningType,
    justifyHorizontal,
    textPositioningToStyles,
} from './types';
import { GAP, TEMPLATE_BLOCK_SETTING_ID, VERTICAL_GAP } from './constants';
import { IconPlus24, TextStyles, generateRandomId, merge } from '@frontify/fondue';
import { getCardPadding, getIsRows, getLayoutClasses } from './helpers/layout';
import { TemplatePreview } from './components/TemplatePreview';
import { AlertError } from './components/AlertError';
import { TemplateText } from './components/TemplateText';
import { CustomButton } from './components/CustomButton';

export const TemplateBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [lastErrorMessage, setLastErrorMessage] = useState('');
    const [templateTextKey, setTemplateTextKey] = useState(generateRandomId);
    const isEditing = useEditorState(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const { blockTemplates, updateTemplateIdsFromKey, error } = useBlockTemplates(appBridge);

    const {
        title,
        description,
        preview,
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

    const hasPreview = preview !== PreviewType.None;
    const flexDirectionStyles = hasPreview
        ? textPositioningToStyles[textPositioning]
        : textPositioningToStyles[TextPositioningType.Right];
    const isRows = getIsRows(hasPreview, textPositioning);
    const borderRadius = hasRadius_blockCard ? radiusValue_blockCard : radiusStyleMap[radiusChoice_blockCard];
    const border = hasBorder_blockCard
        ? `${borderWidth_blockCard} ${borderStyle_blockCard} ${toRgbaString(borderColor_blockCard)}`
        : 'none';

    useEffect(() => {
        const unsubscribeTemplateChooser = appBridge.subscribe('templateChosen', onTemplateSelected);

        return () => {
            if (typeof unsubscribeTemplateChooser === 'function') {
                unsubscribeTemplateChooser();
            }
        };
    }, []);

    useEffect(() => {
        if (error !== null) {
            setLastErrorMessage(error);
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

    const saveDescription = async (newDescription: string) => {
        if (description !== newDescription) {
            await updateBlockSettings({ description: newDescription });
        }
    };

    const saveTitle = async (newTitle: string) => {
        if (title !== newTitle) {
            await updateBlockSettings({ title: newTitle });
        }
    };

    const handleNewPublication = async () => {
        if (selectedTemplate !== null) {
            const previewUrl =
                preview === PreviewType.Custom && Array.isArray(previewCustom) && previewCustom.length > 0
                    ? previewCustom[0].previewUrl
                    : selectedTemplate.previewUrl;

            const options: OpenNewPublicationPayload = {
                template: {
                    ...selectedTemplate,
                    previewUrl,
                },
            };

            await appBridge.dispatch(openNewPublication(options));
        }
    };

    const onTemplateSelected = async (result: { template: TemplateLegacy }) => {
        try {
            await updateTemplateIdsFromKey(TEMPLATE_BLOCK_SETTING_ID, [result.template.id]);
            updateBlockSettings({
                template: result.template,
                templateId: result.template.id,
            });
            await saveTitle(convertToRteValue(TextStyles.heading3, result.template.title));
            await saveDescription(result.template.description);
            setTemplateTextKey(generateRandomId());
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
                    data-test-id="template-block-card"
                    className="tw-border tw-border-black-20"
                    style={{
                        ...(hasBackground && getBackgroundColorStyles(backgroundColor)),
                        borderRadius,
                        border,
                        padding: getCardPadding(blockSettings),
                    }}
                >
                    {isEditing && lastErrorMessage !== '' && <AlertError errorMessage={lastErrorMessage} />}
                    <div
                        data-test-id="template-block-content"
                        className={`tw-flex ${flexDirectionStyles}`}
                        style={{
                            gap: GAP,
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
                                isRows={isRows}
                            />
                        )}
                        <div
                            className={merge(['tw-flex', getLayoutClasses(hasPreview, textPositioning)])}
                            style={{
                                width: isRows && hasPreview ? `${textRatio}%` : '100%',
                                textAlign: !isRows && hasPreview ? textAnchoringHorizontal : AnchoringType.Start,
                                gap: VERTICAL_GAP,
                            }}
                        >
                            <div className={merge(['tw-grow tw-min-w-0', !hasPreview && 'tw-col-span-2'])}>
                                <TemplateText
                                    appBridge={appBridge}
                                    title={title}
                                    blockSettings={blockSettings}
                                    description={description}
                                    pageCount={selectedTemplate?.pages.length ?? 0}
                                    isEditing={isEditing}
                                    key={templateTextKey}
                                    setTitle={saveTitle}
                                    setDescription={saveDescription}
                                />
                            </div>
                            <div
                                className={
                                    hasPreview
                                        ? justifyHorizontal[textAnchoringHorizontal]
                                        : 'tw-flex tw-justify-end tw-items-start'
                                }
                            >
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
