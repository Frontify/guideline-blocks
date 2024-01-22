/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useState } from 'react';
import {
    type Template,
    type TemplateLegacy,
    closeTemplateChooser,
    useBlockAssets,
    useBlockSettings,
    useBlockTemplates,
    useEditorState,
} from '@frontify/app-bridge';
import { TextStyles, generateRandomId } from '@frontify/fondue';
import { type BlockProps, convertToRteValue, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-settings';

import { TEMPLATE_BLOCK_SETTING_ID } from '../constants';
import {
    PreviewType,
    type Settings,
    TextPositioningType,
    horizontalAlignmentToTextAlign,
    textPositioningToContentFlexDirection,
    textRatioToPreviewFlexBasis,
    verticalAlignmentToItemAlign,
} from '../types';

export const useTemplateBlockData = (appBridge: BlockProps['appBridge']) => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [lastErrorMessage, setLastErrorMessage] = useState('');
    const [templateTextKey, setTemplateTextKey] = useState(generateRandomId());
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
    const borderRadius = hasRadius_blockCard ? radiusValue_blockCard : radiusStyleMap[radiusChoice_blockCard];
    const border = hasBorder_blockCard
        ? `${borderWidth_blockCard} ${borderStyle_blockCard} ${toRgbaString(borderColor_blockCard)}`
        : 'none';

    // Content
    const alignContentItems = [TextPositioningType.Right, TextPositioningType.Left].includes(textPositioning)
        ? verticalAlignmentToItemAlign[textAnchoringVertical]
        : '';
    const contentClasses = `tw-flex tw-gap-x-8 tw-gap-y-4 ${textPositioningToContentFlexDirection[textPositioning]} ${alignContentItems}`;

    // Preview
    const previewFlexBasis =
        hasPreview && [TextPositioningType.Right, TextPositioningType.Left].includes(textPositioning)
            ? textRatioToPreviewFlexBasis[textRatio]
            : '';
    const previewClasses = `${previewFlexBasis}`;

    // Text/CTA Wrapper
    const textCtaWrapperFlexDirection = hasPreview ? 'tw-flex-col' : 'tw-flex-row';
    const textCtaWrapperClasses = `tw-flex ${textCtaWrapperFlexDirection} tw-gap-y-2`;

    // Text
    const textAlign =
        hasPreview && [TextPositioningType.Top, TextPositioningType.Bottom].includes(textPositioning)
            ? horizontalAlignmentToTextAlign[textAnchoringHorizontal]
            : 'tw-text-left';
    const textClasses = `tw-grow ${textAlign}`;

    const saveDescription = useCallback(
        async (newDescription: string) => {
            if (description !== newDescription) {
                await updateBlockSettings({ description: newDescription });
            }
        },
        [description, updateBlockSettings],
    );

    const saveTitle = useCallback(
        async (newTitle: string) => {
            if (title !== newTitle) {
                await updateBlockSettings({ title: newTitle });
            }
        },
        [title, updateBlockSettings],
    );

    const onTemplateSelected = useCallback(
        async (result: { template: TemplateLegacy }) => {
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
        },
        [appBridge, saveDescription, saveTitle, updateBlockSettings, updateTemplateIdsFromKey],
    );

    useEffect(() => {
        const unsubscribeTemplateChooser = appBridge.subscribe('templateChosen', onTemplateSelected);

        return () => {
            if (typeof unsubscribeTemplateChooser === 'function') {
                unsubscribeTemplateChooser();
            }
        };
    }, [appBridge, onTemplateSelected]);

    useEffect(() => {
        if (error !== null) {
            setLastErrorMessage(error);
        }
    }, [error]);

    useEffect(() => {
        const templates = blockTemplates[TEMPLATE_BLOCK_SETTING_ID];
        if (!templates || templates.length === 0) {
            return;
        }

        const lastTemplate = templates[templates.length - 1];
        if (lastTemplate) {
            setSelectedTemplate(lastTemplate);
        }
    }, [blockTemplates]);

    return {
        selectedTemplate,
        preview,
        previewCustom,
        isEditing,
        hasBackground,
        backgroundColor,
        borderRadius,
        border,
        blockSettings,
        lastErrorMessage,
        contentClasses,
        previewClasses,
        textCtaWrapperClasses,
        textClasses,
        hasPreview,
        title,
        description,
        templateTextKey,
        saveDescription,
        saveTitle,
        updateBlockSettings,
    };
};
