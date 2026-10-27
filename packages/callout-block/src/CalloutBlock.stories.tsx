/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetFixture, type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { ICON_ASSET_ID } from './settings';
import { Alignment, Appearance, Icon, Type, Width } from './types';

import definition from './index';

export default { title: 'Blocks/Callout', ...blockMeta(definition) };

const textValue = JSON.stringify([
    {
        type: 'p',
        children: [
            { text: 'Always use the full-colour logo on white or light backgrounds. ' },
            { text: 'Never stretch it.', bold: true },
        ],
    },
]);

export const Empty: BlockStory = {};

export const Info: BlockStory = {
    args: { textValue, type: Type.Info, iconType: Icon.Info },
};

export const WarningStrong: BlockStory = {
    args: { textValue, type: Type.Warning, appearance: Appearance.Strong, iconType: Icon.Megaphone },
};

export const TipHugContentsCentered: BlockStory = {
    args: {
        textValue,
        type: Type.Tip,
        iconType: Icon.Lightbulb,
        width: Width.HugContents,
        alignment: Alignment.Center,
    },
};

export const CustomIcon: BlockStory = {
    args: { textValue, type: Type.Note, iconSwitch: true },
    parameters: { appBridge: { blockAssets: { [ICON_ASSET_ID]: [AssetFixture.svgIcon()] } } },
};
