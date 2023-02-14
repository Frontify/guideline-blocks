/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetInput,
    AssetInputSize,
    Button,
    ButtonEmphasis,
    Checkbox,
    ColorPickerFlyout,
    Flyout,
    IconCheckMark,
    IconCross,
    InputLabel,
    Slider,
    Switch,
    SwitchSize,
    TextInput,
} from '@frontify/fondue';
import { ReactNode, useState } from 'react';
import { TileDisplay } from '../types';

type ImageFlyoutProps = { children: ReactNode };

export const ImageFlyout = ({}: ImageFlyoutProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Flyout
            trigger={<button>Trigger</button>}
            isOpen={isOpen}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
            legacyFooter={false}
            fixedHeader={
                <div className="tw-flex tw-justify-between tw-w-full tw-bg-base tw-pl-6 tw-pr-3 tw-py-1.5 tw-items-center tw-border-b tw-border-b-line tw-border-b-solid">
                    <h1 className="tw-text-s tw-font-bold">Configure Tile</h1>
                    <Button icon={<IconCross />} emphasis={ButtonEmphasis.Weak} onClick={() => setIsOpen(false)} />
                </div>
            }
            fixedFooter={
                <div className="tw-flex tw-items-center tw-justify-end tw-gap-3 tw-p-4 tw-bg-base tw-border-t tw-border-t-line tw-border-t-solid">
                    <Button emphasis={ButtonEmphasis.Default}>Cancel</Button>
                    <Button icon={<IconCheckMark />} emphasis={ButtonEmphasis.Strong}>
                        Save
                    </Button>
                </div>
            }
        >
            <div className="tw-p-6 tw-gap-6 tw-flex tw-flex-col">
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <InputLabel htmlFor="asset-replace">Asset</InputLabel>
                    <AssetInput size={AssetInputSize.Small} />
                    <InputLabel htmlFor="asset-replace">Link</InputLabel>
                    <TextInput placeholder="https://www.example.com" />
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
