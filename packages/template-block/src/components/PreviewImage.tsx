/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorState } from '@frontify/app-bridge';
import { IconArrowSync, IconSpeechBubbleQuote, IconTrashBin } from '@frontify/fondue/icons';
import { merge } from '@frontify/fondue/rte';
import { BlockItemWrapper, type MenuToolbarItem } from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout, ResponsiveImage, useImageContainer } from '@frontify/guideline-blocks-shared';
import { useState } from 'react';

import { PreviewType, previewDisplayValues, previewImageAnchoringValues } from '../types';

import { type PreviewImageProps } from './types';

export const PreviewImage = ({
    appBridge,
    blockSettings,
    template,
    previewCustom,
    updateBlockSettings,
    onOpenTemplateChooser,
    handleDeleteCustomPreview,
}: PreviewImageProps) => {
    const isEditing = useEditorState(appBridge);
    const { preview, previewImageAnchoring, previewDisplay } = blockSettings;

    const hasCustomPreview = preview === PreviewType.Custom && previewCustom;
    // Template previews aren't block assets, but their preview URL takes a width just like an asset's does.
    const previewImage = hasCustomPreview
        ? previewCustom
        : template && {
              previewUrl: template.previewUrl,
              genericUrl: template.previewUrl,
              originUrl: template.previewUrl,
              extension: '',
              width: null,
              height: null,
          };
    const { containerWidth, setContainerRef } = useImageContainer();
    const imageAlt = blockSettings.altText ?? 'Template preview';
    const imageClassName = merge(['tw-relative tw-w-full tw-h-full', previewDisplayValues[previewDisplay]]);
    const imageStyle = {
        objectPosition: previewImageAnchoring ? previewImageAnchoringValues[previewImageAnchoring] : 'center',
    };

    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const [localAltText, setLocalAltText] = useState<string | undefined>(blockSettings.altText);
    const [isHovered, setIsHovered] = useState(false);

    const getItemWrapperMenu = () => {
        const menuItems: MenuToolbarItem['items'][0] = [
            {
                title: 'Set alt text',
                onClick: () => setShowAltTextMenu(true),
                icon: <IconSpeechBubbleQuote size={20} />,
            },
            {
                title: 'Replace template',
                onClick: onOpenTemplateChooser,
                icon: <IconArrowSync size={16} />,
            },
        ];

        if (hasCustomPreview) {
            menuItems.push({
                title: 'Delete custom preview',
                onClick: () => handleDeleteCustomPreview(previewCustom.id),
                style: 'danger',
                icon: <IconTrashBin size={16} />,
            });
        }

        return [menuItems];
    };

    return (
        <>
            <span
                ref={setContainerRef}
                className="tw-block tw-w-full tw-h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {previewImage && (
                    <ResponsiveImage
                        image={previewImage}
                        containerWidth={containerWidth}
                        alt={imageAlt}
                        className={imageClassName}
                        style={imageStyle}
                        testId="preview-img"
                    />
                )}
            </span>
            {isEditing && (
                <div className="tw-absolute tw-top-5 tw-right-0 tw-flex tw-justify-end tw-pt-3 tw-mx-3">
                    <BlockItemWrapper
                        shouldBeShown={isHovered || showAltTextMenu}
                        toolbarItems={[{ type: 'menu', items: getItemWrapperMenu() }]}
                    >
                        <EditAltTextFlyout
                            setShowAltTextMenu={setShowAltTextMenu}
                            showAltTextMenu={showAltTextMenu}
                            setLocalAltText={setLocalAltText}
                            defaultAltText={blockSettings.altText}
                            onSave={() => updateBlockSettings({ altText: localAltText || undefined })}
                            localAltText={localAltText}
                        />
                    </BlockItemWrapper>
                </div>
            )}
        </>
    );
};
