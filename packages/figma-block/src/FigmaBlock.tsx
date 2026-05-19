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
import { type BlockProps } from '@frontify/guideline-blocks-settings';
import { StyleProvider } from '@frontify/guideline-blocks-shared';
import { type ReactElement, useEffect, useRef, useState } from 'react';

import { FigmaEmptyBlock } from './FigmaEmptyBlock';
import ReferenceErrorMessage from './ReferenceErrorMessage';
import { FigmaImagePreview } from './components/FigmaImagePreview';
import { FigmaLiveModal } from './components/FigmaLiveModal';
import { FigmaLivePreview } from './components/FigmaLivePreview';
import { ASSET_ID, heights } from './settings';
import { BlockPreview, HeightChoices, type Settings } from './types';
import { extractUrlParameterFromUriQueries } from './utilities';

export const FigmaBlock = ({ appBridge }: BlockProps): ReactElement => {
    // eslint-disable-next-line @eslint-react/use-state
    const [showFigmaLiveModal, toggleFigmaLiveModal] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(false);

    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);

    const isInEditMode = useEditorState(appBridge);
    const asset = blockAssets?.[ASSET_ID]?.[0];

    const ref = useRef<HTMLDivElement>(null);
    const [referenceUrl, setReferenceUrl] = useState('');
    // externalURL is types as Nullable<string>, but in the case of figma files it always exists

    const safeExternalUrl = typeof asset?.externalUrl === 'string' ? asset.externalUrl : undefined;

    const safeAssetExternalUrl = extractUrlParameterFromUriQueries(safeExternalUrl);

    const {
        figmaPreviewId = BlockPreview.Image,
        hasBorder = true,
        isCustomHeight = false,
        heightValue = heights[HeightChoices.Small],
        heightChoice = HeightChoices.Small,
        showFigmaLink = true,
        hasBackground = false,
        hasLimitedOptions = true,
        borderColor = { red: 0, green: 0, blue: 0, name: 'black' },
        borderStyle = 'solid',
        borderWidth = '1px',
        backgroundColor = { red: 0, green: 0, blue: 0, name: 'black' },
        hasRadius,
        radiusValue,
        radiusChoice,
        allowFullScreen,
        allowZooming,
    } = blockSettings;

    const isLivePreview = figmaPreviewId === BlockPreview.Live;

    useEffect(() => {
        // eslint-disable-next-line @eslint-react/set-state-in-effect
        setReferenceUrl(
            (
                document.querySelector(`[data-block="${String(appBridge.context('blockId').get())}"].referenced`) as
                    | HTMLDivElement
                    | undefined
            )?.dataset.referenceUrl || ''
        );
        // eslint-disable-next-line @eslint-react/exhaustive-deps
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

    return (
        <div ref={ref} data-test-id="figma-block" className="figma-block">
            <StyleProvider>
                {referenceUrl ? (
                    <ReferenceErrorMessage originalUrl={referenceUrl} />
                ) : (
                    <>
                        {isInEditMode && !asset && <FigmaEmptyBlock onOpenAssetChooser={onOpenAssetChooser} />}

                        {asset && isLivePreview ? (
                            <FigmaLivePreview
                                assetExternalUrl={safeExternalUrl}
                                allowFullScreen={allowFullScreen}
                                isMobile={isMobile}
                                onOpenFullScreen={() => toggleFigmaLiveModal(true)}
                                hasBorder={hasBorder}
                                borderStyle={borderStyle}
                                borderWidth={borderWidth}
                                borderColor={borderColor}
                                height={isCustomHeight ? heightValue : heights[heightChoice]}
                            />
                        ) : (
                            <FigmaImagePreview
                                title={asset.title}
                                url={asset.previewUrl}
                                assetExternalUrl={safeAssetExternalUrl}
                                assetId={asset.id}
                                assetStatus={asset.status}
                                appBridge={appBridge}
                                hasLimitedOptions={hasLimitedOptions}
                                height={isCustomHeight ? heightValue : heights[heightChoice]}
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
                                showFigmaLink={showFigmaLink}
                            />
                        )}

                        {showFigmaLiveModal && asset && (
                            <FigmaLiveModal
                                assetExternalUrl={safeExternalUrl}
                                title={asset.title}
                                onClose={() => toggleFigmaLiveModal(false)}
                            />
                        )}
                    </>
                )}
            </StyleProvider>
        </div>
    );
};
