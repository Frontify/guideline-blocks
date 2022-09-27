/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import { TextInput } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import 'tailwindcss/tailwind.css';
import { EntryPoint } from './EntryPoint';

import { Props, Settings } from './types';

type ImageBlockProps = {
    logo?: string;
    title?: string;
    description?: string;
};
export const ImageBlock = ({ logo, title, description }: ImageBlockProps) => {
    return <div>I'm the image block</div>;
};

export const ColorMatchingBlock = ({ appBridge }: Props) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);

    return (
        <div>
            {blockAssets.imageId ? (
                <div className="tw-w-full tw-mb-3 tw-text-l tw-font-bold tw-text-black">
                    <TextInput placeholder="Block Title" />
                    <TextInput placeholder="Block Description" />
                    <div>Toggel, image View samples</div>
                    <ImageBlock />
                    <div className="tw-grid tw-grid-cols-3">
                        {blockSettings.accentColor && (
                            <div className="tw-row">
                                Accent
                                <div style={{ backgroundColor: toRgbaString(blockSettings.accentColor) }}>
                                    {blockSettings.accentColor}
                                </div>
                            </div>
                        )}
                        <div>{blockSettings.prominentColor}</div>
                        <div>{blockSettings.prominentColor}</div>
                    </div>
                </div>
            ) : (
                <EntryPoint appBridge={appBridge} />
            )}
        </div>
    );
};
