/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets } from '@frontify/app-bridge';
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

export const TemplatePreview = ({
    appBridge,
    blockSettings,
    template,
    updateBlockSettings,
    onOpenTemplateChooser,
    isRows,
}: TemplatePreviewProps) => {
    const { blockAssets } = useBlockAssets(appBridge);

    const {
        hasBackgroundTemplatePreview,
        backgroundColorTemplatePreview,
        hasBorder_templatePreview,
        borderWidth_templatePreview,
        borderColor_templatePreview,
        borderStyle_templatePreview,
        hasRadius_templatePreview,
        radiusValue_templatePreview,
        radiusChoice_templatePreview,
        textRatio,
        isPreviewHeightCustom,
        previewHeightSimple,
        previewHeightCustom,
    } = blockSettings;

    const { previewCustom } = blockAssets;

    const borderRadius = hasRadius_templatePreview
        ? radiusValue_templatePreview
        : radiusStyleMap[radiusChoice_templatePreview];
    const border = hasBorder_templatePreview
        ? `${borderWidth_templatePreview} ${borderStyle_templatePreview} ${toRgbaString(borderColor_templatePreview)}`
        : 'none';
    const height = isPreviewHeightCustom ? previewHeightCustom : previewHeightValues[previewHeightSimple];

    return (
        <div
            data-test-id="template-block-preview"
            style={{
                width: isRows ? `${100 - parseInt(textRatio)}%` : '100%',
            }}
        >
            {template !== null || previewCustom ? (
                <div
                    className="tw-relative tw-overflow-hidden"
                    data-test-id="template-block-preview-wrapper"
                    style={{
                        ...(hasBackgroundTemplatePreview && {
                            ...getBackgroundColorStyles(backgroundColorTemplatePreview),
                        }),
                        borderRadius,
                        border,
                        height,
                    }}
                >
                    <PreviewImage
                        appBridge={appBridge}
                        blockSettings={blockSettings}
                        template={template}
                        updateBlockSettings={updateBlockSettings}
                        onOpenTemplateChooser={onOpenTemplateChooser}
                    />
                </div>
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
