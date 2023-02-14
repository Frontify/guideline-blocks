/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import {
    AssetInput,
    AssetInputSize,
    Button,
    ButtonEmphasis,
    Checkbox,
    ColorPickerFlyout,
    Flyout,
    FlyoutProps,
    IconArrowCircleUp,
    IconCross,
    IconImageStack,
    IconLink,
    InputLabel,
    Slider,
    Switch,
    SwitchSize,
    TextInput,
} from '@frontify/fondue';
import { useState } from 'react';
import { Nullable, TileDisplay } from '../types';

type ImageFlyoutProps = {
    onReplaceAssetFromUpload: () => void;
    onReplaceAssetFromWorkspace: () => void;
    isAssetLoading: boolean;
    asset: Nullable<Asset>;
    children: FlyoutProps['trigger'];
};

export const ImageFlyout = ({
    children,
    isAssetLoading,
    onReplaceAssetFromUpload,
    onReplaceAssetFromWorkspace,
    asset,
}: ImageFlyoutProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Flyout
            isOpen={isOpen}
            legacyFooter={false}
            trigger={children}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
            fixedHeader={
                <div className="tw-flex tw-justify-between tw-w-full tw-bg-base tw-pl-6 tw-pr-3 tw-py-1.5 tw-items-center tw-border-b tw-border-b-line tw-border-b-solid">
                    <h1 className="tw-text-s tw-font-bold">Configure Tile</h1>
                    <Button icon={<IconCross />} emphasis={ButtonEmphasis.Weak} onClick={() => setIsOpen(false)} />
                </div>
            }
        >
            <div className="tw-p-6 tw-gap-6 tw-flex tw-flex-col">
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <InputLabel htmlFor="asset-replace">Asset</InputLabel>
                    <AssetInput
                        isLoading={isAssetLoading}
                        assets={
                            asset
                                ? [
                                      {
                                          name: asset.title ?? asset.fileName,
                                          type: 'image',
                                          src: asset.previewUrl ?? asset.genericUrl,
                                          alt: asset.title ?? asset.fileName,
                                          extension: asset.extension,
                                          // Type must be corrected in Fondue
                                          size: asset.fileSizeHumanReadable as unknown as number,
                                          source: 'upload',
                                      },
                                  ]
                                : undefined
                        }
                        actions={[
                            {
                                id: 'asset-input-options',
                                ariaLabel: 'Asset Input Options',
                                menuItems: [
                                    {
                                        id: 'replace-upload',
                                        title: 'Replace with upload',
                                        decorator: <IconArrowCircleUp />,
                                        onClick: onReplaceAssetFromUpload,
                                    },
                                    {
                                        id: 'replace-asset',
                                        title: 'Replace with asset',
                                        decorator: <IconImageStack />,
                                        onClick: onReplaceAssetFromWorkspace,
                                    },
                                ],
                            },
                        ]}
                        size={AssetInputSize.Small}
                        onLibraryClick={onReplaceAssetFromWorkspace}
                        onUploadClick={onReplaceAssetFromUpload}
                    />
                    <InputLabel htmlFor="asset-replace">Link</InputLabel>
                    <TextInput placeholder="https://www.example.com" decorator={<IconLink />} />
                    <Checkbox label="Open link in new tab" />
                </div>
                <div className="tw-w-full tw-border-b-line tw-border-b tw-border-b-solid" />
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <Switch label="Background" size={SwitchSize.Small} />
                    <ColorPickerFlyout id="image-background" onSelect={console.log} currentColor={null} />
                    <InputLabel htmlFor="display">Display</InputLabel>
                    <div className="tw-flex">
                        <Slider
                            onChange={console.log}
                            items={[
                                { value: TileDisplay.Fill, id: TileDisplay.Fill },
                                { value: TileDisplay.Fit, id: TileDisplay.Fit },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </Flyout>
    );
};
