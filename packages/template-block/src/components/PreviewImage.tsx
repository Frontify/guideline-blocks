/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorState } from '@frontify/app-bridge';
import { IconArrowSync, IconSpeechBubbleQuote, IconTrashBin } from '@frontify/fondue/icons';
import { merge } from '@frontify/fondue/rte';
import { BlockItemWrapper, type MenuToolbarItem } from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { previewSrc, width, height } = hasCustomPreview
        ? {
              previewSrc: previewCustom.previewUrl,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              width: previewCustom.width,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
            <img
                data-test-id="preview-img"
                src={previewSrc}
                className={merge(['tw-relative tw-w-full tw-h-full', previewDisplayValues[previewDisplay]])}
                style={{
                    objectPosition: previewImageAnchoring
                        ? previewImageAnchoringValues[previewImageAnchoring]
                        : 'center',
                }}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                width={width}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
