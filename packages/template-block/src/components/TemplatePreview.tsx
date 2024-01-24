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
    previewClasses,
    updateBlockSettings,
    onOpenTemplateChooser,
}: TemplatePreviewProps) => {
    const { blockAssets } = useBlockAssets(appBridge);

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

    const { previewCustom } = blockAssets;

    const borderRadius = hasRadius_templatePreview
        ? radiusValue_templatePreview
        : radiusStyleMap[radiusChoice_templatePreview];
    const border = hasBorder_templatePreview
        ? `${borderWidth_templatePreview} ${borderStyle_templatePreview} ${toRgbaString(borderColor_templatePreview)}`
        : 'none';
    const height = isPreviewHeightCustom ? previewHeightCustom : previewHeightValues[previewHeightSimple];

    return (
        <div className={previewClasses} data-test-id="preview">
            {template !== null || previewCustom ? (
                <div
                    className="tw-relative tw-overflow-hidden"
                    data-test-id="preview-wrapper"
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
