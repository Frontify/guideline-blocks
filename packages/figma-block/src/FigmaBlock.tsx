/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetChooserObjectType,
    AssetChooserProjectType,
    FrontifyAsset,
    useAssetChooser,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
} from '@frontify/app-bridge';
import { Button, ButtonStyle, IconArrowExpand, IconCross, IconSize, IconSuitcase } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import 'tailwindcss/tailwind.css';
import { ImageStage } from './ImageStage';
import { ASSET_ID, heights } from './settings';
import { BlockPreview, BlockProps, HeightChoices, Settings } from './types';
import { extractUrlParameterFromUriQueries } from './utilities';

const FIGMA_BLOCK_MODAL_CLASSES = 'tw-overflow-y-hidden';

export const FigmaBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [showFigmaLiveModal, toggleFigmaLiveModal] = useState<boolean>(false);
    const [isLivePreview, setIsLivePreview] = useState<boolean>(false);
    const [assetExternalUrl, setAssetExternalUrl] = useState<string>('');
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const isInEditMode = useEditorState(appBridge);

    const asset = blockAssets?.[ASSET_ID]?.[0];
    const isAssetAvailable = !!asset;

    const {
        figmaPreviewId = BlockPreview.Image,
        hasBorder = true,
        isCustomHeight = false,
        heightValue = heights[HeightChoices.Small],
        heightChoice = HeightChoices.Small,
        showFigmaLink = true,
        hasBackground = false,
        hasLimitedOptions = true,
    } = blockSettings;

    useEffect(() => {
        setAssetExternalUrl(extractUrlParameterFromUriQueries(asset?.externalUrl ?? undefined));
        setIsLivePreview(figmaPreviewId === BlockPreview.Live);
    }, [asset, figmaPreviewId]);

    const onOpenAssetChooser = () => {
        openAssetChooser(
            (result: FrontifyAsset[]) => {
                const resultId = result[0].id;
                updateAssetIdsFromKey(ASSET_ID, [resultId]);
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
            onClick={onOpenAssetChooser}
        >
            <div className="tw-text-xl tw-mb-4 tw-flex tw-justify-center tw-text-black-40 group-hover:tw-text-violet-60">
                <IconSuitcase size={IconSize.Size32} />
            </div>
            <span className="tw-text-text-x-weak group-hover:tw-text-black">Choose Figma asset</span>
        </div>
    );

    const ShowFigmaLink = useCallback(
        ({ title, assetExternalUrl }) => (
            <div className="tw-p-2 tw-text-sm">
                <a href={assetExternalUrl} target="_blank" rel="noreferrer" className="tw-underline">
                    {title}
                </a>
            </div>
        ),
        []
    );

    const ShowImagePreview = useCallback(
        ({ hasBorder, height, showFigmaLink, hasBackground }) => (
            <div data-test-id="figma-image-preview" className="tw-flex tw-flex-col tw-justify-center">
                <ImageStage
                    title={asset.title}
                    url={asset.previewUrl}
                    hasLimitedOptions={hasLimitedOptions}
                    height={height}
                    hasBorder={hasBorder}
                    hasBackground={!hasLimitedOptions && hasBackground}
                />
                {showFigmaLink && <ShowFigmaLink title={asset?.title} assetExternalUrl={assetExternalUrl} />}
            </div>
        ),
        [ShowFigmaLink, asset?.previewUrl, asset?.title, assetExternalUrl, hasLimitedOptions]
    );

    const ShowFigmaLive = useCallback(
        () => (
            <div
                data-test-id="figma-live-preview"
                className="tw-relative tw-flex tw-justify-center tw-h-[500px] tw-group"
            >
                <div className="tw-absolute tw-top-4 tw-right-4 tw-opacity-0 tw-transition-opacity group-hover:tw-opacity-100">
                    <Button
                        icon={<IconArrowExpand />}
                        onClick={() => toggleFigmaLiveModal(true)}
                        style={ButtonStyle.Secondary}
                    />
                </div>
                <iframe
                    src={asset?.externalUrl ?? undefined}
                    className="tw-h-full tw-w-full tw-border-none"
                    loading="lazy"
                />
            </div>
        ),
        [asset]
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
                        icon={<IconCross />}
                        onClick={() => {
                            toggleFigmaLiveModal(false);
                            modalRoot?.classList.remove(FIGMA_BLOCK_MODAL_CLASSES);
                        }}
                        style={ButtonStyle.Secondary}
                    />
                </div>

                <div className="tw-relative tw-w-full tw-h-full">
                    <iframe
                        src={asset?.externalUrl ?? undefined}
                        className="tw-h-full tw-w-full tw-border-none"
                        loading="lazy"
                    />
                </div>
            </div>
        );

        return createPortal(modal, modalRoot);
    }, [asset?.externalUrl]);

    return (
        <div data-test-id="figma-block">
            {isInEditMode && !isAssetAvailable && <FigmaEmptyBlock />}
            {isAssetAvailable && !isLivePreview && (
                <ShowImagePreview
                    hasBorder={hasBorder}
                    hasBackground={hasBackground}
                    height={isCustomHeight ? heightValue : heights[heightChoice]}
                    showFigmaLink={showFigmaLink}
                />
            )}
            {isAssetAvailable && isLivePreview && <ShowFigmaLive />}
            {showFigmaLiveModal && <FigmaLivePortal />}
        </div>
    );
};
