/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorState } from '@frontify/app-bridge';
import { IconPlus24 } from '@frontify/fondue';
import { PreviewHeightType, previewHeightValues } from '../types';
import {
    BlockInjectButton,
    getBackgroundColorStyles,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import { PreviewImage } from './PreviewImage';
import { TemplatePreviewProps } from './types';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR } from '../settings';

export const TemplatePreview = ({
    appBridge,
    blockSettings,
    template,
    previewCustom,
    previewClasses,
    updateBlockSettings,
    onOpenTemplateChooser,
    handleNewPublication,
    handleDeleteCustomPreview,
}: TemplatePreviewProps) => {
    const isEditing = useEditorState(appBridge);

    const {
        backgroundColorTemplatePreview,
        borderColor_templatePreview,
        borderStyle_templatePreview,
        borderWidth_templatePreview,
        hasBackgroundTemplatePreview,
        hasBorder_templatePreview,
        hasRadius_templatePreview,
        isPreviewHeightCustom,
        previewHeightCustom,
        previewHeightSimple,
        radiusChoice_templatePreview,
        radiusValue_templatePreview,
    } = blockSettings;

    const borderRadius = hasRadius_templatePreview
        ? radiusValue_templatePreview
        : radiusStyleMap[radiusChoice_templatePreview];
    const border = hasBorder_templatePreview
        ? `${borderWidth_templatePreview} ${borderStyle_templatePreview} ${toRgbaString(borderColor_templatePreview || DEFAULT_BORDER_COLOR)}`
        : 'none';
    const height = isPreviewHeightCustom ? previewHeightCustom : previewHeightValues[previewHeightSimple];
    const enableCta = !isEditing && template !== null;

    return (
        <div className={previewClasses} data-test-id="preview">
            {template !== null || previewCustom ? (
                <button
                    className="tw-relative tw-overflow-hidden tw-w-full tw-h-full"
                    data-test-id="preview-wrapper"
                    style={{
                        ...(hasBackgroundTemplatePreview && {
                            ...getBackgroundColorStyles(backgroundColorTemplatePreview || DEFAULT_BACKGROUND_COLOR),
                        }),
                        borderRadius,
                        border,
                        height,
                    }}
                    onClick={handleNewPublication}
                    disabled={!enableCta}
                    aria-label="Use this template"
                >
                    <PreviewImage
                        appBridge={appBridge}
                        blockSettings={blockSettings}
                        template={template}
                        previewCustom={previewCustom}
                        updateBlockSettings={updateBlockSettings}
                        onOpenTemplateChooser={onOpenTemplateChooser}
                        handleDeleteCustomPreview={handleDeleteCustomPreview}
                    />
                </button>
            ) : (
                <div style={{ height: previewHeightValues[PreviewHeightType.Small] }}>
                    <BlockInjectButton
                        label="Choose existing template"
                        icon={<IconPlus24 />}
                        withMenu={false}
                        fillParentContainer={true}
                        onClick={onOpenTemplateChooser}
                    />
                </div>
            )}
        </div>
    );
};
