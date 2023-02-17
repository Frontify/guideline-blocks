/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { CSSProperties, FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
    Asset,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import {
    BlockInjectButton,
    BorderStyle,
    Padding,
    borderStyleMap,
    hasRichTextValue,
    paddingStyleMap,
    radiusStyleMap,
    toRgbaString,
    useGuidelineDesignTokens,
} from '@frontify/guideline-blocks-shared';
import {
    Button,
    ButtonEmphasis,
    ButtonRounding,
    ButtonSize,
    Color,
    IconCross16,
    IconPlus24,
    LoadingCircle,
    RichTextEditor,
} from '@frontify/fondue';
import { ASSET_SETTINGS_ID, BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from './settings';
import { GenerateBulkDownloadTokenRequest, Settings } from './types';
import { generateBulkDownloadRequest } from './repository/BulkDownloadRepository';

const getBorderStyles = (
    style = BorderStyle.Solid,
    width = '1px',
    color = BORDER_COLOR_DEFAULT_VALUE
): CSSProperties => ({
    borderStyle: borderStyleMap[style],
    borderWidth: width,
    borderColor: toRgbaString(color),
});

const DEFAULT_CONTENT_VALUE = '[{"type":"heading3","children":[{"text":""}]}]';

const getBackgroundStyles = (backgroundColor: Color): CSSProperties =>
    backgroundColor ? { backgroundColor: toRgbaString(backgroundColor) } : {};

export const AssetKitBlock: FC<BlockProps> = ({ appBridge }) => {
    const { designTokens } = useGuidelineDesignTokens();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ multiple: true });
    const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
    const [isUploadingAssets, setIsUploadingAssets] = useState<boolean>(false);
    const [isDownloadingAssets, setIsDownloadingAssets] = useState<boolean>(false);

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isUploadingAssets && setIsUploadingAssets(true),
    });

    const currentAssets: Asset[] = blockAssets[ASSET_SETTINGS_ID] ?? [];

    const {
        hasBackground_blocks,
        backgroundColor_blocks = BACKGROUND_COLOR_DEFAULT_VALUE,
        hasBorder_blocks,
        borderStyle_blocks,
        borderWidth_blocks,
        borderColor_blocks = BORDER_COLOR_DEFAULT_VALUE,
        hasRadius_blocks,
        radiusChoice_blocks,
        radiusValue_blocks,
        hasBackground_thumbnails,
        backgroundColor_thumbnails = BACKGROUND_COLOR_DEFAULT_VALUE,
        hasBorder_thumbnails,
        borderStyle_thumbnails,
        borderWidth_thumbnails,
        borderColor_thumbnails = BORDER_COLOR_DEFAULT_VALUE,
        hasRadius_thumbnails,
        radiusChoice_thumbnails,
        radiusValue_thumbnails,
    } = blockSettings;

    appBridge.getProjectId(); // project id
    // to get the asset ids refeer to the documentation
    const data: GenerateBulkDownloadTokenRequest = {
        asset_ids: [],
        set_ids: [],
        language: 'en',
    };

    const generateBulkDownload = (downloadAssets: Asset[]) => {
        if (downloadAssets.length === undefined || downloadAssets.length <= 0) {
            return;
        }
        setIsDownloadingAssets(true);
        data.asset_ids = downloadAssets.map((asset) => asset.id);
        generateBulkDownloadRequest(appBridge.getProjectId(), data).then(() => setIsDownloadingAssets(false));
    };

    const saveText = (text: string) => {
        text !== blockSettings.text && setBlockSettings({ text });
    };
    const saveTitle = (title: string) => {
        console.log(title);
        title !== blockSettings.title && setBlockSettings({ title });
    };

    const onOpenAssetChooser = () => {
        appBridge.openAssetChooser(
            (assetsObject) => {
                setIsUploadingAssets(true);
                const assetsIds = Array.from(assetsObject).map((asset) => asset.id);
                addAssetIdsToKey(ASSET_SETTINGS_ID, assetsIds).then(() => setIsUploadingAssets(false));
                appBridge.closeAssetChooser();
            },
            {
                multiSelection: true,
                selectedValueIds: currentAssets.map((asset) => asset.id),
            }
        );
    };

    const onRemoveAsset = (assetId: number) => {
        deleteAssetIdsFromKey(ASSET_SETTINGS_ID, [assetId]);
    };

    useEffect(() => {
        if (droppedFiles) {
            setIsUploadingAssets(true);
            uploadFile(droppedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [droppedFiles]);

    useEffect(() => {
        if (selectedFiles) {
            setIsUploadingAssets(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults) {
            (async (assetsObject) => {
                const assetsIds = Array.from(assetsObject).map((asset) => asset.id);
                addAssetIdsToKey(ASSET_SETTINGS_ID, assetsIds).then(() => setIsUploadingAssets(false));
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <div
            data-test-id="asset-kit-block"
            style={{
                ...(hasBackground_blocks && getBackgroundStyles(backgroundColor_blocks)),
                ...(hasBorder_blocks && getBorderStyles(borderStyle_blocks, borderWidth_blocks, borderColor_blocks)),
                borderRadius: hasRadius_blocks ? radiusValue_blocks : radiusStyleMap[radiusChoice_blocks],
                padding: paddingStyleMap[Padding.Medium],
            }}
        >
            <div className="tw-mb-8 tw-flex tw-gap-8">
                <div className="tw-flex-1 tw-space-y-2">
                    {(hasRichTextValue(blockSettings.title) || isEditing) && (
                        <RichTextEditor
                            designTokens={designTokens ?? undefined}
                            value={blockSettings.title ?? DEFAULT_CONTENT_VALUE}
                            readonly={!isEditing}
                            onTextChange={saveTitle}
                            onBlur={saveTitle}
                            placeholder={isEditing ? 'Add a title here ...' : ''}
                            border={false}
                        />
                    )}

                    {(hasRichTextValue(blockSettings.text) || isEditing) && (
                        <RichTextEditor
                            designTokens={designTokens ?? undefined}
                            readonly={!isEditing}
                            onTextChange={saveText}
                            onBlur={saveText}
                            placeholder={isEditing ? 'Add a description here ...' : ''}
                            value={blockSettings.text}
                            border={false}
                        />
                    )}
                </div>
                <div className="tw-flex-none">
                    <button
                        disabled={
                            isDownloadingAssets ||
                            isUploadingAssets ||
                            currentAssets.length === undefined ||
                            currentAssets.length <= 0
                        }
                        onClick={() => generateBulkDownload(currentAssets)}
                        style={designTokens?.buttonPrimary}
                    >
                        Download package
                    </button>
                </div>
            </div>

            {isDownloadingAssets && (
                <div
                    style={{
                        ...(hasBackground_blocks && getBackgroundStyles(backgroundColor_blocks)),
                        ...(hasBorder_blocks &&
                            getBorderStyles(borderStyle_blocks, borderWidth_blocks, borderColor_blocks)),
                        borderRadius: hasRadius_blocks ? radiusValue_blocks : radiusStyleMap[radiusChoice_blocks],
                        padding: paddingStyleMap[Padding.Small],
                    }}
                    className="tw-flex tw-gap-8 tw-items-center tw-mb-8"
                >
                    <div className="tw-flew-0">
                        <LoadingCircle />
                    </div>
                    <div className="tw-flex-1">
                        <span>
                            This may take a little while. Your package will download automatically when it&apos;s ready.
                        </span>
                    </div>
                </div>
            )}

            {currentAssets?.length > 0 ? (
                <span>{currentAssets.length} assets</span>
            ) : (
                <span>Add assets to make them available</span>
            )}
            <div className="tw-mt-2.5 tw-grid tw-grid-cols-6 tw-gap-4">
                {currentAssets
                    ? currentAssets.map((asset: Asset) => (
                          <div key={asset.id} className="tw-aspect-square tw-group tw-relative">
                              <img
                                  className="tw-object-scale-down tw-w-full tw-h-full"
                                  src={asset.previewUrl}
                                  style={{
                                      ...(hasBackground_thumbnails && getBackgroundStyles(backgroundColor_thumbnails)),
                                      ...(hasBorder_thumbnails &&
                                          getBorderStyles(
                                              borderStyle_thumbnails,
                                              borderWidth_thumbnails,
                                              borderColor_thumbnails
                                          )),
                                      borderRadius: hasRadius_thumbnails
                                          ? radiusValue_thumbnails
                                          : radiusStyleMap[radiusChoice_thumbnails],
                                  }}
                                  alt={asset.title}
                              />
                              {isEditing && (
                                  <div className="tw-hidden group-hover:tw-block tw-absolute tw-top-0.5 tw-right-0.5">
                                      <Button
                                          size={ButtonSize.Small}
                                          rounding={ButtonRounding.Medium}
                                          emphasis={ButtonEmphasis.Default}
                                          icon={<IconCross16 />}
                                          onClick={() => onRemoveAsset(asset.id)}
                                      />
                                  </div>
                              )}
                          </div>
                      ))
                    : undefined}
            </div>
            {isEditing && (
                <div className="tw-h-[4.5rem] tw-mt-7">
                    <BlockInjectButton
                        onAssetChooseClick={onOpenAssetChooser}
                        onUploadClick={openFileDialog}
                        onDrop={setDroppedFiles}
                        isLoading={isUploadingAssets}
                        label="Add or drop your assets here"
                        icon={<IconPlus24 />}
                        fillParentContainer={true}
                    />
                </div>
            )}
        </div>
    );
};
