/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useEditorState } from '@frontify/app-bridge';
import { PreviewType, previewDisplayValues, previewImageAnchoringValues } from '../types';
import { IconArrowSync, IconSpeechBubbleQuote20, IconTrashBin, MenuItemStyle, merge } from '@frontify/fondue';
import { BlockItemWrapper, FlyoutToolbarItem } from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
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
    const previewSrc =
        preview === PreviewType.Custom && blockAssets.previewCustom !== undefined
            ? blockAssets.previewCustom[0].previewUrl
            : template?.previewUrl;
    const [currentPreviewSrc, setCurrentPreviewSrc] = useState(previewSrc);
    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const [localAltText, setLocalAltText] = useState<string | undefined>(blockSettings.altText);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setCurrentPreviewSrc(previewSrc);
    }, [preview, template, blockAssets.previewCustom]);

    const onDeleteCustomPreview = async () => {
        if (
            preview === PreviewType.Custom &&
            Array.isArray(blockAssets.previewCustom) &&
            blockAssets.previewCustom.length > 0
        ) {
            await deleteAssetIdsFromKey('previewCustom', [blockAssets.previewCustom[0].id]);
            await updateBlockSettings({ altText: undefined });
            setLocalAltText(undefined);
        }
    };

    const getItemWrapperMenu = () => {
        const menuItems: FlyoutToolbarItem[] = [
            {
                title: 'Set alt text',
                onClick: () => setShowAltTextMenu(true),
                icon: <IconSpeechBubbleQuote20 />,
            },
            {
                title: 'Replace template',
                onClick: () => onOpenTemplateChooser(),
                icon: <IconArrowSync />,
            },
        ];

        if (preview === PreviewType.Custom && blockAssets.previewCustom) {
            menuItems.push({
                title: 'Delete custom preview',
                onClick: () => onDeleteCustomPreview(),
                style: MenuItemStyle.Danger,
                icon: <IconTrashBin />,
            });
        }

        return [menuItems];
    };

    return (
        <>
            <img
                data-test-id="template-block-preview-img"
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
                alt={blockSettings.altText || undefined}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
            {isEditing && (
                <div className="tw-absolute tw-top-5 tw-right-0 tw-flex tw-justify-end tw-pt-3 tw-mx-3">
                    <BlockItemWrapper
                        shouldBeShown={isHovered || showAltTextMenu}
                        toolbarItems={[]}
                        toolbarFlyoutItems={getItemWrapperMenu()}
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
