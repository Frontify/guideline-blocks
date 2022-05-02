/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/arcade-tokens/styles';
import 'tailwindcss/tailwind.css';
import { createPortal } from 'react-dom';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Button, ButtonStyle, IconExpand, IconProjects, IconSize } from '@frontify/arcade';
import {
    AssetChooserObjectType,
    AssetChooserProjectType,
    AssetChooserResult,
    useAssetChooser,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
} from '@frontify/app-bridge';
import { BlockPreview, BlockProps, Settings } from './types';

const FIGMA_BLOCK_MODAL_CLASSES = 'tw-overflow-y-hidden';

export const FigmaBlock = ({ appBridge, onClickOpenAssetChooser }: BlockProps): ReactElement => {
    const [showFigmaLiveModal, toggleFigmaLiveModal] = useState<boolean>(false);
    const [isLivePreview, setIsLivePreview] = useState<boolean>(false);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);

    const asset = blockAssets?.['asset']?.[0];
    const isAssetAvailable = !!asset;

    useEffect(() => {
        setIsLivePreview(blockSettings.figmaPreviewId === BlockPreview.Live);
    }, [blockSettings]);

    const onOpenAssetChooser = () => {
        openAssetChooser(
            (result: AssetChooserResult) => {
                const resultId = result.screenData[0].id;
                updateAssetIdsFromKey('asset', [resultId]);
                closeAssetChooser();
            },
            {
                selectedValueId: asset?.id,
                projectTypes: [AssetChooserProjectType.Workspace],
                objectTypes: [AssetChooserObjectType.Url],
                urlContains: 'https://www.figma',
            }
        );
    };

    const FigmaEmptyBlock = () => (
        <div
            data-test-id="figma-empty-block"
            className="tw-group tw-py-16 tw-px-4 tw-border-dashed tw-border tw-cursor-pointer tw-text-center tw-border-line-x-strong hover:tw-border-black"
            onClick={onClickOpenAssetChooser ?? onOpenAssetChooser}
        >
            <div className="tw-text-xl tw-mb-4 tw-flex tw-justify-center tw-text-black-40 group-hover:tw-text-violet-60">
                <IconProjects size={IconSize.Size32} />
            </div>
            <span className="tw-text-text-x-weak group-hover:tw-text-black">Choose Figma asset</span>
        </div>
    );

    const ShowFigmaPreview = useCallback(
        () => (
            <div data-test-id="figma-image-preview" className="tw-flex tw-justify-center">
                <img data-test-id="callout-icon" alt={asset.title} src={asset.preview_url} />
            </div>
        ),
        [asset]
    );

    const ShowFigmaLive = useCallback(
        () => (
            <div
                data-test-id="figma-live-preview"
                className="tw-relative tw-flex tw-justify-center tw-h-[500px] tw-group"
            >
                <div className="tw-absolute tw-top-4 tw-right-4 tw-opacity-0 tw-transition-opacity group-hover:tw-opacity-100">
                    <Button
                        icon={<IconExpand />}
                        onClick={() => toggleFigmaLiveModal(true)}
                        style={ButtonStyle.Secondary}
                    />
                </div>
                <iframe src={asset?.external_url} className="tw-h-full tw-w-full tw-border-none" loading="lazy" />
            </div>
        ),
        [asset?.external_url]
    );

    const FigmaLivePortal = useCallback(() => {
        const modalRoot = document.body;
        modalRoot.classList.add(FIGMA_BLOCK_MODAL_CLASSES);

        const modal = (
            <div
                data-test-id="figma-full-screen"
                className="tw-animate-fade-in-forwards tw-fixed tw-flex tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-[200]"
            >
                <div className="tw-fixed tw-flex tw-top-4 tw-right-4 tw-z-[200]">
                    <Button
                        icon={<IconExpand />}
                        onClick={() => {
                            toggleFigmaLiveModal(false);
                            modalRoot?.classList.remove(FIGMA_BLOCK_MODAL_CLASSES);
                        }}
                        style={ButtonStyle.Secondary}
                    />
                </div>

                <div className="tw-relative tw-w-full tw-h-full">
                    <iframe src={asset?.external_url} className="tw-h-full tw-w-full tw-border-none" loading="lazy" />
                </div>
            </div>
        );

        return createPortal(modal, modalRoot);
    }, [asset?.external_url]);

    return (
        <div data-test-id="figma-block">
            {isEditing && !isAssetAvailable && <FigmaEmptyBlock />}
            {isAssetAvailable && !isLivePreview && <ShowFigmaPreview />}
            {isAssetAvailable && isLivePreview && <ShowFigmaLive />}
            {showFigmaLiveModal && <FigmaLivePortal />}
        </div>
    );
};
