/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorState } from '@frontify/app-bridge';
import { PreviewType, previewDisplayValues, previewImageAnchoringValues } from '../types';
import { IconArrowSync, IconSpeechBubbleQuote20, IconTrashBin, MenuItemStyle, merge } from '@frontify/fondue';
import { BlockItemWrapper, ToolbarFlyoutMenuItem } from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';
import { useEffect, useMemo, useState } from 'react';
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

    const previewSrc = useMemo(
        () =>
            preview === PreviewType.Custom && previewCustom !== undefined
                ? previewCustom[0].previewUrl
                : template?.previewUrl,
        [previewCustom, preview, template?.previewUrl]
    );
    const hasCustomPreview = preview === PreviewType.Custom && previewCustom.length > 0;

    const [currentPreviewSrc, setCurrentPreviewSrc] = useState(previewSrc);
    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const [localAltText, setLocalAltText] = useState<string | undefined>(blockSettings.altText);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setCurrentPreviewSrc(previewSrc);
    }, [previewSrc]);

    const getItemWrapperMenu = () => {
        const menuItems: ToolbarFlyoutMenuItem[] = [
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
                onClick: handleDeleteCustomPreview,
                style: MenuItemStyle.Danger,
                icon: <IconTrashBin />,
            });
        }

        return [menuItems];
    };

    return (
        <>
            <img
                data-test-id="preview-img"
                src={currentPreviewSrc}
                className={merge(['tw-relative tw-w-full tw-h-full', previewDisplayValues[previewDisplay]])}
                style={{
                    objectPosition: previewImageAnchoring
                        ? previewImageAnchoringValues[previewImageAnchoring]
                        : 'center',
                }}
                width={preview === PreviewType.Custom && previewCustom ? previewCustom[0].width : 'auto'}
                height={preview === PreviewType.Custom && previewCustom ? previewCustom[0].height : 'auto'}
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
