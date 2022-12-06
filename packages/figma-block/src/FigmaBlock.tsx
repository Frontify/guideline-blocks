/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    AssetChooserObjectType,
    AssetChooserProjectType,
    useAssetChooser,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
} from '@frontify/app-bridge';
import { Color } from '@frontify/guideline-blocks-settings';
import { Button, ButtonEmphasis, IconArrowExpand, IconCross, IconSize, IconSuitcase } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'tailwindcss/tailwind.css';
import { getBorderOfBlock, getHeightOfBlock } from './helpers';
import { ImageStage } from './ImageStage';
import ReferenceErrorMessage from './ReferenceErrorMessage';
import { ASSET_ID, heights } from './settings';
import { BlockPreview, HeightChoices, Settings } from './types';
import { extractUrlParameterFromUriQueries } from './utilities';

const FIGMA_BLOCK_MODAL_CLASSES = 'tw-overflow-y-hidden';

export const FigmaBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [showFigmaLiveModal, toggleFigmaLiveModal] = useState<boolean>(false);
    const [isLivePreview, setIsLivePreview] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(false);
    const [assetExternalUrl, setAssetExternalUrl] = useState<string>('');
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const isInEditMode = useEditorState(appBridge);
    const asset = blockAssets?.[ASSET_ID]?.[0];
    const ref = useRef<HTMLDivElement>(null);
    const [referenceUrl, setReferenceUrl] = useState('');
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
        borderColor = { red: 0, green: 0, blue: 0, name: 'black' } as Color,
        borderStyle = 'solid',
        borderWidth = '1px',
        backgroundColor = { red: 0, green: 0, blue: 0, name: 'black' } as Color,
        hasRadius,
        radiusValue,
        radiusChoice,
    } = blockSettings;

    useEffect(() => {
        setReferenceUrl(
            (
                document.querySelector(`[data-block="${appBridge.getBlockId()}"].referenced`) as
                    | HTMLDivElement
                    | undefined
            )?.dataset.referenceUrl || ''
        );
    }, []);

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        window.addEventListener('resize', resize);
        () => window.removeEventListener('resize', resize);
    }, []);

    useEffect(() => {
        setAssetExternalUrl(extractUrlParameterFromUriQueries(asset?.externalUrl ?? undefined));
        setIsLivePreview(figmaPreviewId === BlockPreview.Live);
    }, [asset, figmaPreviewId]);

    const onOpenAssetChooser = () => {
        openAssetChooser(
            (result: Asset[]) => {
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
                <a href={assetExternalUrl} target="_blank" rel="noreferrer" className="tw-text-[#4a90e2]">
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
                    borderStyle={borderStyle}
                    borderColor={borderColor}
                    borderWidth={borderWidth}
                    isMobile={isMobile}
                    hasBackground={!hasLimitedOptions && hasBackground}
                    backgroundColor={backgroundColor}
                    hasRadius={hasRadius}
                    radiusValue={radiusValue}
                    radiusChoice={radiusChoice}
                />
                {showFigmaLink && <ShowFigmaLink title={asset?.title} assetExternalUrl={assetExternalUrl} />}
            </div>
        ),
        [
            ShowFigmaLink,
            asset?.previewUrl,
            asset?.title,
            assetExternalUrl,
            hasLimitedOptions,
            isMobile,
            borderColor,
            borderStyle,
            borderWidth,
            backgroundColor,
            hasRadius,
            radiusChoice,
            radiusValue,
        ]
    );

    const ShowFigmaLive = useCallback(
        () => (
            <div
                data-test-id="figma-live-preview"
                style={{
                    border: getBorderOfBlock(hasBorder, borderStyle, borderWidth, borderColor),
                    height: getHeightOfBlock(isCustomHeight ? heightValue : heights[heightChoice], isMobile),
                }}
                className={joinClassNames(['tw-relative tw-flex tw-justify-center tw-group'])}
            >
                <div className="tw-absolute tw-top-4 tw-right-4 tw-opacity-0 tw-transition-opacity group-hover:tw-opacity-100">
                    <Button
                        icon={<IconArrowExpand />}
                        onClick={() => toggleFigmaLiveModal(true)}
                        emphasis={ButtonEmphasis.Default}
                    />
                </div>
                <iframe src={asset?.externalUrl ?? undefined} className="tw-h-full tw-w-full tw-border-none" />
            </div>
        ),
        [asset, hasBorder, isMobile, isCustomHeight, heightValue, heightChoice, borderWidth, borderColor, borderStyle]
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
                        emphasis={ButtonEmphasis.Default}
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
        <div ref={ref} data-test-id="figma-block">
            {referenceUrl ? (
                <ReferenceErrorMessage originalUrl={referenceUrl} />
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};
