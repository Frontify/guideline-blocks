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
import { Color, TextStyles, generateRandomId } from '@frontify/fondue';
import {
    type BlockProps,
    BorderStyle,
    Padding,
    Radius,
    convertToRteValue,
    getBackgroundColorStyles,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';

import { TEMPLATE_BLOCK_SETTING_ID } from '../constants';
import {
    AnchoringType,
    PreviewType,
    type Settings,
    TextPositioningType,
    TextRatioType,
    horizontalAlignmentToCtaSelfAlign,
    horizontalAlignmentToTextAlign,
    paddingStyleMap,
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

    const {
        blockAssets: { previewCustom },
    } = useBlockAssets(appBridge);
    const { blockTemplates, updateTemplateIdsFromKey, error } = useBlockTemplates(appBridge);

    const {
        backgroundColor,
        borderColor_blockCard,
        borderStyle_blockCard,
        borderWidth_blockCard,
        description,
        hasBackground,
        hasBorder_blockCard,
        hasCustomPaddingValue_blockCard,
        hasRadius_blockCard,
        paddingChoice_blockCard,
        paddingValue_blockCard,
        preview,
        radiusChoice_blockCard,
        radiusValue_blockCard,
        textAnchoringHorizontal,
        textAnchoringVertical,
        textPositioning,
        textRatio,
        title,
    } = blockSettings;

    const onTemplateSelected = useCallback(
        async (result: { template: TemplateLegacy }) => {
            try {
                await updateTemplateIdsFromKey(TEMPLATE_BLOCK_SETTING_ID, [result.template.id]);
                updateBlockSettings({
                    title: convertToRteValue(TextStyles.heading3, result.template.title),
                    description: result.template.description,
                });
                setTemplateTextKey(generateRandomId());
            } catch (error) {
                setLastErrorMessage(error as string);
            }

            await appBridge.dispatch(closeTemplateChooser());
        },
        [appBridge, updateBlockSettings, updateTemplateIdsFromKey],
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

    const hasPreview = preview !== PreviewType.None;

    return {
        blockSettings,
        cardStyles: getCardStyles(
            hasBackground,
            backgroundColor,
            hasCustomPaddingValue_blockCard,
            paddingValue_blockCard,
            paddingChoice_blockCard,
            hasRadius_blockCard,
            radiusValue_blockCard,
            radiusChoice_blockCard,
            hasBorder_blockCard,
            borderWidth_blockCard,
            borderStyle_blockCard,
            borderColor_blockCard,
        ),
        contentClasses: getContentClasses(textPositioning, textAnchoringVertical),
        ctaClasses: getCtaClasses(hasPreview, textPositioning, textAnchoringHorizontal),
        description,
        hasPreview,
        isEditing,
        lastErrorMessage,
        preview,
        previewClasses: getPreviewClasses(hasPreview, textPositioning, textRatio),
        previewCustom,
        selectedTemplate,
        templateTextKey,
        textClasses: getTextClasses(hasPreview, textPositioning, textAnchoringHorizontal),
        textCtaWrapperClasses: getTextCtaWrapperClass(hasPreview),
        title,
        updateBlockSettings,
    };
};

const getContentClasses = (textPositioning: TextPositioningType, textAnchoringVertical: AnchoringType): string => {
    const alignContentItems = [TextPositioningType.Right, TextPositioningType.Left].includes(textPositioning)
        ? verticalAlignmentToItemAlign[textAnchoringVertical]
        : '';
    return `tw-flex tw-gap-x-8 tw-gap-y-4 ${textPositioningToContentFlexDirection[textPositioning]} ${alignContentItems}`;
};

const getCtaClasses = (
    hasPreview: boolean,
    textPositioning: TextPositioningType,
    textAnchoringHorizontal: AnchoringType,
): string =>
    hasPreview && [TextPositioningType.Top, TextPositioningType.Bottom].includes(textPositioning)
        ? horizontalAlignmentToCtaSelfAlign[textAnchoringHorizontal]
        : '';

const getPreviewClasses = (
    hasPreview: boolean,
    textPositioning: TextPositioningType,
    textRatio: TextRatioType,
): string =>
    hasPreview && [TextPositioningType.Right, TextPositioningType.Left].includes(textPositioning)
        ? textRatioToPreviewFlexBasis[textRatio]
        : '';

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
const getCardStyles = (
    hasBackground: boolean,
    backgroundColor: Color,
    hasCustomPaddingValue_blockCard: boolean,
    paddingValue_blockCard: string,
    paddingChoice_blockCard: Padding,
    hasRadius_blockCard: boolean,
    radiusValue_blockCard: string,
    radiusChoice_blockCard: Radius,
    hasBorder_blockCard: boolean,
    borderWidth_blockCard: string,
    borderStyle_blockCard: BorderStyle,
    borderColor_blockCard: Color,
): React.CSSProperties => ({
    ...(hasBackground && getBackgroundColorStyles(backgroundColor)),
    padding: hasCustomPaddingValue_blockCard ? paddingValue_blockCard : paddingStyleMap[paddingChoice_blockCard],
    borderRadius: hasRadius_blockCard ? radiusValue_blockCard : radiusStyleMap[radiusChoice_blockCard],
    border: hasBorder_blockCard
        ? `${borderWidth_blockCard} ${borderStyle_blockCard} ${toRgbaString(borderColor_blockCard)}`
        : 'none',
});
