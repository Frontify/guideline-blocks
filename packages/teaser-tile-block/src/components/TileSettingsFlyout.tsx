/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetInput,
    AssetInputSize,
    Button,
    ButtonEmphasis,
    Checkbox,
    CheckboxState,
    ColorPickerFlyout,
    Flyout,
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
import { TileDisplay, TileSettingsFlyoutProps, TileType } from '../types';

export const TileSettingsFlyout = ({
    type,
    children,
    isAssetLoading,
    onReplaceAssetFromUpload,
    onUploadFile,
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
    isOpen,
    setIsOpen,
    placement,
    height,
    palettes,
    disabled,
}: TileSettingsFlyoutProps) => (
    <Flyout
        isOpen={isOpen}
        legacyFooter={false}
        trigger={children}
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        placement={placement}
        isTriggerDisabled={disabled}
        fixedHeader={
            <div className="tw-flex tw-justify-between tw-w-full tw-bg-base tw-pl-6 tw-pr-3 tw-py-1.5 tw-items-center tw-border-b tw-border-b-line tw-border-b-solid">
                <h1 className="tw-text-s tw-font-bold">Configure Tile</h1>
                <Button icon={<IconCross />} emphasis={ButtonEmphasis.Weak} onClick={() => setIsOpen(false)} />
            </div>
        }
    >
        <div className="tw-p-6 tw-gap-6 tw-flex tw-flex-col">
            <div className="tw-flex tw-flex-col tw-gap-4">
                {type !== TileType.Text && (
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
                            onUploadClick={onUploadFile}
                        />
                    </>
                )}
                <InputLabel htmlFor="asset-replace">Link</InputLabel>
                <TextInput
                    placeholder="https://www.example.com"
                    decorator={<IconLink />}
                    value={link?.href}
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
                        palettes={palettes}
                    />
                )}
                {type !== TileType.Text && height !== 'auto' && (
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