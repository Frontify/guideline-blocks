/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorState } from '@frontify/app-bridge';
import { PreviewType, previewDisplayValues, previewImageAnchoringValues } from '../types';
import { IconArrowSync, IconSpeechBubbleQuote20, IconTrashBin, merge } from '@frontify/fondue';
import { BlockItemWrapper, MenuToolbarItem } from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';
import { useState } from 'react';
import { PreviewImageProps } from './types';

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
    const { previewSrc, width, height } = hasCustomPreview
        ? {
              previewSrc: previewCustom.previewUrl,
              width: previewCustom.width,
              height: previewCustom.height,
          }
        : {
              previewSrc: template?.previewUrl,
              width: 'auto',
              height: 'auto',
          };

    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const [localAltText, setLocalAltText] = useState<string | undefined>(blockSettings.altText);
    const [isHovered, setIsHovered] = useState(false);

    const getItemWrapperMenu = () => {
        const menuItems: MenuToolbarItem['items'][0] = [
            {
                title: 'Set alt text',
                onClick: () => setShowAltTextMenu(true),
                icon: <IconSpeechBubbleQuote20 />,
            },
            {
                title: 'Replace template',
                onClick: onOpenTemplateChooser,
                icon: <IconArrowSync />,
            },
        ];

        if (hasCustomPreview) {
            menuItems.push({
                title: 'Delete custom preview',
                onClick: () => handleDeleteCustomPreview(previewCustom.id),
                style: 'danger',
                icon: <IconTrashBin />,
            });
        }

        return [menuItems];
    };

    return (
        <>
            <img
                data-test-id="preview-img"
                src={previewSrc}
                className={merge(['tw-relative tw-w-full tw-h-full', previewDisplayValues[previewDisplay]])}
                style={{
                    objectPosition: previewImageAnchoring
                        ? previewImageAnchoringValues[previewImageAnchoring]
                        : 'center',
                }}
                width={width}
                height={height}
                alt={blockSettings.altText ?? 'Template preview'}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
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
