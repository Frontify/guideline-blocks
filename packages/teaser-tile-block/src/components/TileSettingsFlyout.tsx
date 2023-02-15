/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import {
    AssetInput,
    AssetInputSize,
    Button,
    ButtonEmphasis,
    Checkbox,
    CheckboxState,
    Color,
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
import { Nullable, TileDisplay, TileType } from '../types';

export type Link = { href?: string; target?: string };

type BaseFlyoutProps = {
    children: FlyoutProps['trigger'];
    link: Nullable<Link>;
    onLinkChange: (link: Link) => void;
    backgroundVisibility: Nullable<boolean>;
    onBackgroundVisibilityChange: (visibility: boolean) => void;
    backgroundColor: Nullable<Color>;
    onBackgroundColorChange: (color: Color) => void;
};

type ImageFlyoutProps = {
    variant: TileType.Image | TileType.ImageText;
    onReplaceAssetFromUpload: () => void;
    onReplaceAssetFromWorkspace: () => void;
    isAssetLoading: boolean;
    asset: Nullable<Asset>;
    display: Nullable<TileDisplay>;
    onDisplayChange: (display: TileDisplay) => void;
};

type TextFlyoutProps = {
    variant: TileType.Text;
    onReplaceAssetFromUpload: never;
    onReplaceAssetFromWorkspace: never;
    isAssetLoading: never;
    asset: never;
    display: never;
    onDisplayChange: never;
};

type TileSettingsFlyoutProps = (BaseFlyoutProps & TextFlyoutProps) | (BaseFlyoutProps & ImageFlyoutProps);

export const TileSettingsFlyout = ({
    variant,
    children,
    isAssetLoading,
    onReplaceAssetFromUpload,
    onReplaceAssetFromWorkspace,
    asset,
    link,
    onLinkChange,
    backgroundVisibility,
    onBackgroundVisibilityChange,
    backgroundColor,
    onBackgroundColorChange,
    display,
    onDisplayChange,
}: TileSettingsFlyoutProps) => {
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
                    {variant !== TileType.Text && (
                        <>
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
                        </>
                    )}
                    <InputLabel htmlFor="asset-replace">Link</InputLabel>
                    <TextInput
                        placeholder="https://www.example.com"
                        decorator={<IconLink />}
                        onChange={(value) => onLinkChange({ ...link, href: value })}
                    />
                    <Checkbox
                        label="Open link in new tab"
                        state={link?.target === '_blank' ? CheckboxState.Checked : CheckboxState.Unchecked}
                        onChange={(isChecked) => onLinkChange({ ...link, target: isChecked ? '_blank' : '_self' })}
                    />
                </div>
                <div className="tw-w-full tw-border-b-line tw-border-b tw-border-b-solid" />
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <Switch
                        label="Background"
                        size={SwitchSize.Small}
                        on={backgroundVisibility ?? false}
                        onChange={() => onBackgroundVisibilityChange(!backgroundVisibility)}
                    />
                    {backgroundVisibility && (
                        <ColorPickerFlyout
                            id="image-background"
                            onSelect={onBackgroundColorChange}
                            currentColor={backgroundColor}
                        />
                    )}
                    {variant !== TileType.Text && (
                        <>
                            <InputLabel htmlFor="display">Display</InputLabel>
                            <div className="tw-flex">
                                <Slider
                                    onChange={(id) => onDisplayChange(id as TileDisplay)}
                                    activeItemId={display ?? TileDisplay.Fill}
                                    items={[
                                        { value: TileDisplay.Fill, id: TileDisplay.Fill },
                                        { value: TileDisplay.Fit, id: TileDisplay.Fit },
                                    ]}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Flyout>
    );
};
