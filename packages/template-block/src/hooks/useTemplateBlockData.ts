/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Template,
    type TemplateLegacy,
    closeTemplateChooser,
    useBlockAssets,
    useBlockSettings,
    useBlockTemplates,
    useEditorState,
} from '@frontify/app-bridge';
import { type Color, TextStyles } from '@frontify/fondue';
import {
    type BlockProps,
    type BorderStyle,
    type Padding,
    type Radius,
    convertToRteValue,
    getBackgroundColorStyles,
    hasRichTextValue,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import { useCallback, useEffect, useState } from 'react';

import { TEMPLATE_BLOCK_SETTING_ID } from '../constants';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR } from '../settings';
import {
    type AnchoringType,
    PreviewType,
    type Settings,
    TextPositioningType,
    type TextRatioType,
    horizontalAlignmentToCtaSelfAlign,
    horizontalAlignmentToTextAlign,
    paddingStyleMap,
    textPositioningToContentFlexDirection,
    textRatioToFlexBasis,
    textRatioToInverseFlexBasis,
    verticalAlignmentToItemAlign,
} from '../types';

export const useTemplateBlockData = (appBridge: BlockProps['appBridge']) => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [lastErrorMessage, setLastErrorMessage] = useState('');
    const [templateTextKey, setTemplateTextKey] = useState(0);
    const [hasAuthenticatedUser, setHasAuthenticatedUser] = useState(false);
    const isEditing = useEditorState(appBridge);

    const { blockAssets, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
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
        hasPageCount,
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

    const hasPreview = preview !== PreviewType.None;
    const hasTitleOnly = !hasPreview && !hasPageCount && !hasRichTextValue(description);

    // eslint-disable-next-line @eslint-react/no-unnecessary-use-callback
    const onTemplateSelected = useCallback(
        async (result: { template: TemplateLegacy }) => {
            try {
                await updateTemplateIdsFromKey(TEMPLATE_BLOCK_SETTING_ID, [result.template.id]);
                await updateBlockSettings({
                    title: convertToRteValue(TextStyles.heading3, result.template.title),
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    description: convertToRteValue(TextStyles.p, result.template.description),
                });
                setTemplateTextKey(templateTextKey + 1);
            } catch (error) {
                setLastErrorMessage(error as string);
            }

            await appBridge.dispatch(closeTemplateChooser());
        },
        [appBridge, templateTextKey, updateBlockSettings, updateTemplateIdsFromKey]
    );

    const handleDeleteCustomPreview = useCallback(
        async (assetId: number) => {
            await deleteAssetIdsFromKey('previewCustom', [assetId]);
            await updateBlockSettings({
                preview: PreviewType.Template,
                altText: undefined,
            });
        },
        [deleteAssetIdsFromKey, updateBlockSettings]
    );

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const unsubscribeTemplateChooser = appBridge.subscribe('templateChosen', onTemplateSelected);

        return () => {
            if (typeof unsubscribeTemplateChooser === 'function') {
                unsubscribeTemplateChooser();
            }
        };
    }, [appBridge, onTemplateSelected]);

    useEffect(() => {
        if (error !== null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
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
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedTemplate(lastTemplate);
        }
    }, [blockTemplates]);

    useEffect(() => {
        const isAuthenticated = appBridge.context('isAuthenticated').get();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasAuthenticatedUser(isAuthenticated);
    }, [appBridge]);

    return {
        blockSettings,
        cardStyles: getCardStyles(
            hasBackground,
            backgroundColor || DEFAULT_BACKGROUND_COLOR,
            hasCustomPaddingValue_blockCard,
            paddingValue_blockCard,
            paddingChoice_blockCard,
            hasRadius_blockCard,
            radiusValue_blockCard,
            radiusChoice_blockCard,
            hasBorder_blockCard,
            borderWidth_blockCard,
            borderStyle_blockCard,
            borderColor_blockCard || DEFAULT_BORDER_COLOR
        ),
        contentClasses: getContentClasses(hasPreview, textPositioning, textAnchoringVertical),
        ctaClasses: getCtaClasses(hasPreview, hasTitleOnly, textPositioning, textAnchoringHorizontal),
        description,
        handleDeleteCustomPreview,
        hasAuthenticatedUser,
        hasPreview,
        hasTitleOnly,
        isEditing,
        lastErrorMessage,
        preview,
        previewClasses: getPreviewClasses(hasPreview, textPositioning, textRatio),
        previewCustom: blockAssets.previewCustom?.length > 0 ? blockAssets.previewCustom[0] : null,
        selectedTemplate,
        templateTextKey,
        textClasses: getTextClasses(hasPreview, hasTitleOnly, textPositioning, textAnchoringHorizontal),
        textCtaWrapperClasses: getTextCtaWrapperClass(hasPreview, textPositioning, textRatio),
        title,
        updateBlockSettings,
    };
};

const getContentClasses = (
    hasPreview: boolean,
    textPositioning: TextPositioningType,
    textAnchoringVertical: AnchoringType
): string => {
    const alignContentItems =
        hasPreview && [TextPositioningType.Right, TextPositioningType.Left].includes(textPositioning)
            ? verticalAlignmentToItemAlign[textAnchoringVertical]
            : '';
    return `tw-flex tw-gap-x-6 tw-gap-y-4 ${textPositioningToContentFlexDirection[textPositioning]} ${alignContentItems}`;
};

const getCtaClasses = (
    hasPreview: boolean,
    hasTitleOnly: boolean,
    textPositioning: TextPositioningType,
    textAnchoringHorizontal: AnchoringType
): string => {
    if (hasTitleOnly) {
        return 'tw-self-center';
    }
    return hasPreview && [TextPositioningType.Top, TextPositioningType.Bottom].includes(textPositioning)
        ? horizontalAlignmentToCtaSelfAlign[textAnchoringHorizontal]
        : '';
};

const getPreviewClasses = (
    hasPreview: boolean,
    textPositioning: TextPositioningType,
    textRatio: TextRatioType
): string => {
    const flexBasis =
        hasPreview && [TextPositioningType.Right, TextPositioningType.Left].includes(textPositioning)
            ? textRatioToInverseFlexBasis[textRatio]
            : '';

    return `${flexBasis} tw-w-full`;
};

const getTextClasses = (
    hasPreview: boolean,
    hasTitleOnly: boolean,
    textPositioning: TextPositioningType,
    textAnchoringHorizontal: AnchoringType
): string => {
    const textAlign =
        hasPreview && [TextPositioningType.Top, TextPositioningType.Bottom].includes(textPositioning)
            ? horizontalAlignmentToTextAlign[textAnchoringHorizontal]
            : 'tw-text-left';
    const selfAlign = hasTitleOnly ? 'tw-self-center tw-w-full @sm:tw-w-auto' : '';
    return `tw-grow ${textAlign} ${selfAlign}`;
};

const getTextCtaWrapperClass = (
    hasPreview: boolean,
    textPositioning: TextPositioningType,
    textRatio: TextRatioType
): string => {
    const textCtaWrapperFlexDirection = hasPreview ? 'tw-flex-col' : 'tw-flex-col @sm:tw-flex-row';
    const flexBasis =
        hasPreview && [TextPositioningType.Right, TextPositioningType.Left].includes(textPositioning)
            ? textRatioToFlexBasis[textRatio]
            : '';
    return `tw-flex tw-grow tw-gap-y-2 tw-gap-x-8 ${textCtaWrapperFlexDirection} ${flexBasis}`;
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
    borderColor_blockCard: Color
): React.CSSProperties => ({
    ...(hasBackground && getBackgroundColorStyles(backgroundColor)),
    padding: hasCustomPaddingValue_blockCard ? paddingValue_blockCard : paddingStyleMap[paddingChoice_blockCard],
    borderRadius: hasRadius_blockCard ? radiusValue_blockCard : radiusStyleMap[radiusChoice_blockCard],
    border: hasBorder_blockCard
        ? `${borderWidth_blockCard} ${borderStyle_blockCard} ${toRgbaString(borderColor_blockCard)}`
        : 'none',
});
