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
    AnchoringType,
    PreviewType,
    type Settings,
    TextPositioningType,
    TextRatioType,
    horizontalAlignmentToCtaSelfAlign,
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
        backgroundColor,
        borderColor_blockCard,
        borderStyle_blockCard,
        borderWidth_blockCard,
        description,
        hasBackground,
        hasBorder_blockCard,
        hasRadius_blockCard,
        preview,
        radiusChoice_blockCard,
        radiusValue_blockCard,
        textAnchoringHorizontal,
        textAnchoringVertical,
        textPositioning,
        textRatio,
        title,
    } = blockSettings;
    const { previewCustom } = blockAssets;

    const hasPreview = preview !== PreviewType.None;
    const borderRadius = hasRadius_blockCard ? radiusValue_blockCard : radiusStyleMap[radiusChoice_blockCard];
    const border = hasBorder_blockCard
        ? `${borderWidth_blockCard} ${borderStyle_blockCard} ${toRgbaString(borderColor_blockCard)}`
        : 'none';

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
        backgroundColor,
        blockSettings,
        border,
        borderRadius,
        contentClasses: getContentClasses(textPositioning, textAnchoringVertical),
        ctaClasses: getCtaClasses(hasPreview, textPositioning, textAnchoringHorizontal),
        description,
        hasBackground,
        hasPreview,
        isEditing,
        lastErrorMessage,
        preview,
        previewClasses: getPreviewClasses(hasPreview, textPositioning, textRatio),
        previewCustom,
        saveDescription,
        saveTitle,
        selectedTemplate,
        templateTextKey,
        textClasses: getTextClasses(hasPreview, textPositioning, textAnchoringHorizontal),
        textCtaWrapperClasses: getTextCtaWrapperClass(hasPreview),
        title,
        updateBlockSettings,
    };
};

const getCtaClasses = (
    hasPreview: boolean,
    textPositioning: TextPositioningType,
    textAnchoringHorizontal: AnchoringType,
) => {
    return hasPreview && [TextPositioningType.Top, TextPositioningType.Bottom].includes(textPositioning)
        ? horizontalAlignmentToCtaSelfAlign[textAnchoringHorizontal]
        : '';
};

const getTextClasses = (
    hasPreview: boolean,
    textPositioning: TextPositioningType,
    textAnchoringHorizontal: AnchoringType,
): string => {
    const textAlign =
        hasPreview && [TextPositioningType.Top, TextPositioningType.Bottom].includes(textPositioning)
            ? horizontalAlignmentToTextAlign[textAnchoringHorizontal]
            : 'tw-text-left';
    return `tw-grow ${textAlign}`;
};

const getTextCtaWrapperClass = (hasPreview: boolean): string => {
    const textCtaWrapperFlexDirection = hasPreview ? 'tw-flex-col' : '';
    return `tw-flex tw-grow ${textCtaWrapperFlexDirection} tw-gap-y-2 tw-gap-x-8`;
};

const getPreviewClasses = (
    hasPreview: boolean,
    textPositioning: TextPositioningType,
    textRatio: TextRatioType,
): string => {
    return hasPreview && [TextPositioningType.Right, TextPositioningType.Left].includes(textPositioning)
        ? textRatioToPreviewFlexBasis[textRatio]
        : '';
};

const getContentClasses = (textPositioning: TextPositioningType, textAnchoringVertical: AnchoringType): string => {
    const alignContentItems = [TextPositioningType.Right, TextPositioningType.Left].includes(textPositioning)
        ? verticalAlignmentToItemAlign[textAnchoringVertical]
        : '';
    return `tw-flex tw-gap-x-8 tw-gap-y-4 ${textPositioningToContentFlexDirection[textPositioning]} ${alignContentItems}`;
};
