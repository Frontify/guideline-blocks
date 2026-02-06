/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Asset,
    AssetChooserObjectType,
    AssetChooserProjectType,
    useAssetChooser,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
} from '@frontify/app-bridge';
import { Button } from '@frontify/fondue/components';
import { IconArrowExpand, IconCross } from '@frontify/fondue/icons';
import { type BlockProps, type Color, joinClassNames } from '@frontify/guideline-blocks-settings';
import { StyleProvider } from '@frontify/guideline-blocks-shared';
import { type ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { FigmaEmptyBlock } from './FigmaEmptyBlock';
import { ImageStage } from './ImageStage';
import ReferenceErrorMessage from './ReferenceErrorMessage';
import { getBorderOfBlock, getHeightOfBlock } from './helpers';
import { ASSET_ID, heights } from './settings';
import { BlockPreview, HeightChoices, type Settings } from './types';
import { extractUrlParameterFromUriQueries } from './utilities';

const FIGMA_BLOCK_MODAL_CLASSES = 'tw-overflow-y-hidden';

export const FigmaBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [showFigmaLiveModal, setShowFigmaLiveModal] = useState<boolean>(false);
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
        allowFullScreen,
        allowZooming,
    } = blockSettings;

    useEffect(() => {
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect, react-hooks/set-state-in-effect
        setReferenceUrl(
            (
                document.querySelector(`[data-block="${String(appBridge.context('blockId').get())}"].referenced`) as
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
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    useEffect(() => {
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect, react-hooks/set-state-in-effect, @typescript-eslint/no-unsafe-argument
        setAssetExternalUrl(extractUrlParameterFromUriQueries(asset?.externalUrl ?? undefined));
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect, @typescript-eslint/no-unsafe-enum-comparison
        setIsLivePreview(figmaPreviewId === BlockPreview.Live);
    }, [asset, figmaPreviewId]);

    const onOpenAssetChooser = () => {
        openAssetChooser(
            (result: Asset[]) => {
                const resultId = result[0].id;
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
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

    // eslint-disable-next-line @eslint-react/no-unnecessary-use-callback
    const ShowFigmaLink = useCallback(
        // eslint-disable-next-line @eslint-react/no-nested-component-definitions
        ({ title, assetExternalUrl }: { title: string; assetExternalUrl: string }) => (
            <div className="tw-p-2 tw-text-sm">
                <a href={assetExternalUrl} target="_blank" rel="noreferrer" className="tw-text-[#4a90e2]">
                    {title}
                </a>
            </div>
        ),
        []
    );

    const ShowImagePreview = useCallback(
        // eslint-disable-next-line react-hooks/preserve-manual-memoization, @eslint-react/no-nested-component-definitions
        ({
            hasBorder,
            height,
            showFigmaLink,
            hasBackground,
        }: {
            hasBorder: boolean;
            height: string;
            showFigmaLink: boolean;
            hasBackground: boolean;
        }) => (
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
                    hasBackground={hasBackground}
                    backgroundColor={backgroundColor}
                    hasRadius={hasRadius}
                    radiusValue={radiusValue}
                    radiusChoice={radiusChoice}
                    allowFullScreen={allowFullScreen}
                    allowZooming={allowZooming}
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
            allowFullScreen,
            allowZooming,
            backgroundColor,
            hasRadius,
            radiusChoice,
            radiusValue,
        ]
    );

    const ShowFigmaLive = useCallback(
        // eslint-disable-next-line @eslint-react/no-nested-component-definitions
        () => (
            <div
                data-test-id="figma-live-preview"
                style={{
                    border: getBorderOfBlock(hasBorder, borderStyle, borderWidth, borderColor),
                    height: getHeightOfBlock(isCustomHeight ? heightValue : heights[heightChoice], isMobile),
                }}
                className={joinClassNames(['tw-relative tw-flex tw-justify-center tw-group'])}
            >
                {allowFullScreen && (
                    <div className="tw-absolute tw-top-4 tw-right-4 tw-opacity-0 tw-transition-opacity group-hover:tw-opacity-100">
                        <Button
                            onPress={() => setShowFigmaLiveModal(true)}
                            emphasis="default"
                            aria-label="allow fullscreen"
                            aspect="square"
                        >
                            <IconArrowExpand size={16} />
                        </Button>
                    </div>
                )}
                {}
                <iframe
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    src={asset?.externalUrl ?? undefined}
                    className="tw-h-full tw-w-full tw-border-none"
                    title="figma-iframe"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
            </div>
        ),
        [
            asset,
            hasBorder,
            isMobile,
            isCustomHeight,
            heightValue,
            heightChoice,
            borderWidth,
            borderColor,
            borderStyle,
            allowFullScreen,
        ]
    );

    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const FigmaLivePortal = useCallback(() => {
        const modalRoot = document.body;
        modalRoot.classList.add(FIGMA_BLOCK_MODAL_CLASSES);

        const modal = (
            <div
                data-test-id="figma-full-screen"
                className="tw-animate-fade-in-forwards tw-fixed tw-flex tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-50"
            >
                <div className="tw-fixed tw-flex tw-top-4 tw-right-4 tw-z-50">
                    <Button
                        onPress={() => {
                            setShowFigmaLiveModal(false);
                            modalRoot?.classList.remove(FIGMA_BLOCK_MODAL_CLASSES);
                        }}
                        emphasis="default"
                        aspect="square"
                        aria-label="close"
                    >
                        <IconCross size={16} />
                    </Button>
                </div>

                <div className="tw-relative tw-w-full tw-h-full">
                    {/* eslint-disable-next-line @eslint-react/dom/no-missing-iframe-sandbox */}
                    <iframe
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        src={asset?.externalUrl ?? undefined}
                        className="tw-h-full tw-w-full tw-border-none"
                        loading="lazy"
                        title={asset.title}
                    />
                </div>
            </div>
        );

        return createPortal(modal, modalRoot);
    }, [asset?.externalUrl]);

    return (
        <div ref={ref} data-test-id="figma-block" className="figma-block">
            <StyleProvider>
                {referenceUrl ? (
                    <ReferenceErrorMessage originalUrl={referenceUrl} />
                ) : (
                    <>
                        {isInEditMode && !isAssetAvailable && (
                            <FigmaEmptyBlock onOpenAssetChooser={onOpenAssetChooser} />
                        )}
                        {isAssetAvailable && !isLivePreview && (
                            // eslint-disable-next-line react-hooks/static-components
                            <ShowImagePreview
                                hasBorder={hasBorder}
                                hasBackground={hasBackground}
                                height={isCustomHeight ? heightValue : heights[heightChoice]}
                                showFigmaLink={showFigmaLink}
                            />
                        )}
                        {/* eslint-disable-next-line react-hooks/static-components */}
                        {isAssetAvailable && isLivePreview && <ShowFigmaLive />}
                        {/* eslint-disable-next-line react-hooks/static-components */}
                        {showFigmaLiveModal && <FigmaLivePortal />}
                    </>
                )}
            </StyleProvider>
        </div>
    );
};
