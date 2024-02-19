/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useEditorState } from '@frontify/app-bridge';
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
    updateBlockSettings,
    onOpenTemplateChooser,
}: PreviewImageProps) => {
    const isEditing = useEditorState(appBridge);
    const { blockAssets, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const { preview, previewImageAnchoring, previewDisplay } = blockSettings;
    const previewSrc = useMemo(
        () =>
            preview === PreviewType.Custom && blockAssets.previewCustom !== undefined
                ? blockAssets.previewCustom[0].previewUrl
                : template?.previewUrl,
        [blockAssets.previewCustom, preview, template?.previewUrl]
    );
    const [currentPreviewSrc, setCurrentPreviewSrc] = useState(previewSrc);
    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const [localAltText, setLocalAltText] = useState<string | undefined>(blockSettings.altText);
    const [isHovered, setIsHovered] = useState(false);
    const hasCustomPreview = useMemo(
        () => preview === PreviewType.Custom && blockAssets.previewCustom?.length > 0,
        [blockAssets.previewCustom?.length, preview]
    );

    useEffect(() => {
        setCurrentPreviewSrc(previewSrc);
    }, [previewSrc]);

    const handleDeleteCustomPreview = async () => {
        if (hasCustomPreview) {
            await deleteAssetIdsFromKey('previewCustom', [blockAssets.previewCustom[0].id]);
            await updateBlockSettings({ altText: undefined });
            setLocalAltText(undefined);
        }
    };

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
                width={
                    preview === PreviewType.Custom && blockAssets.previewCustom
                        ? blockAssets.previewCustom[0].width
                        : 'auto'
                }
                height={
                    preview === PreviewType.Custom && blockAssets.previewCustom
                        ? blockAssets.previewCustom[0].height
                        : 'auto'
                }
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
